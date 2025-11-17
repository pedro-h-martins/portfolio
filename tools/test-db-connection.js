import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

async function runSeedScript() {
    return new Promise((resolve, reject) => {
        console.log('Executando script de seed...');
        const seedProcess = spawn('node', [path.join(__dirname, '../database/seed.js')]);
        
        seedProcess.stdout.on('data', (data) => {
            console.log(`Seed output: ${data}`);
        });
        
        seedProcess.stderr.on('data', (data) => {
            console.error(`Seed error: ${data}`);
        });
        
        seedProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Seed completado com sucesso.');
                resolve();
            } else {
                console.error(`Seed falhou com código de saída ${code}`);
                reject(new Error(`Seed failed with exit code ${code}`));
            }
        });
    });
}

async function testConnection() {
    let connection;
    try {
        console.log('Tentando conectar ao banco de dados...');
        
        if (process.env.DATABASE_URL) {
            console.log('Usando DATABASE_URL para conexão (Railway/produção)');
            connection = await mysql.createConnection(process.env.DATABASE_URL);
        } else {
            console.log('Usando configuração local para conexão');
            connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });
        }
        
        console.log('Conexão estabelecida com sucesso!');
        
        const [rows] = await connection.execute('SELECT 1 as test');
        console.log('Teste de query SQL bem-sucedido:', rows);
        
        try {
            const [tables] = await connection.execute('SHOW TABLES');
            console.log('Tabelas no banco de dados:');
            
            if (tables.length === 0) {
                console.log('Nenhuma tabela encontrada. Criando estrutura do banco...');
            
                const schemaPath = path.join(__dirname, '../database/portfolioDB.sql');
                const schemaSql = await import('fs').then(fs => fs.readFileSync(schemaPath, 'utf8'));
                
                const queries = schemaSql.split(';').filter(query => query.trim());
                
                for(const query of queries) {
                    if (query.trim()) {
                        await connection.execute(query);
                    }
                }
                
                console.log('Estrutura do banco criada com sucesso');
                
                await connection.end();
                await runSeedScript();
                return;
            }
            
            tables.forEach(table => {
                console.log(`- ${Object.values(table)[0]}`);
            });
            
            const [userData] = await connection.execute('SELECT COUNT(*) as count FROM userData');
            if (userData[0].count === 0) {
                console.log('Banco de dados vazio. Executando seed...');
                await connection.end();
                await runSeedScript();
                return;
            }
            
        } catch (tableError) {
            console.error('Não foi possível listar as tabelas:', tableError.message);
            if (tableError.message.includes("doesn't exist")) {
                console.log('Tabelas não existem. Criando estrutura do banco...');
                
                await runSeedScript();
            }
        }
        
    } catch (error) {
        console.error('❌ Erro ao conectar com o banco de dados:', error.message);
        console.error('Detalhes completos do erro:', error);
        process.exit(1);
    } finally {
        if (connection) await connection.end();
        console.log('Conexão fechada');
    }
}

testConnection();