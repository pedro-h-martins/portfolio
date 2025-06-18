import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

async function testConnection() {
    let connection;
    try {
        console.log('Tentando conectar ao banco de dados...');
        
        // Usa DATABASE_URL se existir (Railway) ou configurações locais
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
        
        // Teste simples para verificar a conexão
        const [rows] = await connection.execute('SELECT 1 as test');
        console.log('Teste de query SQL bem-sucedido:', rows);
        
        // Tenta obter informações sobre as tabelas
        try {
            const [tables] = await connection.execute('SHOW TABLES');
            console.log('Tabelas no banco de dados:');
            tables.forEach(table => {
                console.log(`- ${Object.values(table)[0]}`);
            });
        } catch (tableError) {
            console.error('Não foi possível listar as tabelas:', tableError.message);
        }
        
    } catch (error) {
        console.error('❌ Erro ao conectar com o banco de dados:', error.message);
        console.error('Detalhes completos do erro:', error);
    } finally {
        if (connection) await connection.end();
        console.log('Conexão fechada');
    }
}

testConnection();
