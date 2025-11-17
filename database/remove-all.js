import db from '../config/db.js';

const queryPromise = (sql, params = []) => db.promise().query(sql, params);

async function tableExists(tableName) {
    try {
        const [rows] = await queryPromise('SHOW TABLES LIKE ?', [tableName]);
        return rows.length > 0;
    } catch (err) {
        console.error(`Erro ao verificar existência da tabela ${tableName}:`, err.message);
        return false;
    }
}

async function safeQuery(sql, params = []) {
    try {
        await queryPromise(sql, params);
        return true;
    } catch (err) {
        // Ignore errors about missing tables, surface others
        const msg = String(err.message || '');
        if (msg.includes("doesn't exist") || msg.includes('Unknown table')) {
            console.warn(`Ignorando erro (tabela inexistente): ${msg}`);
            return false;
        }
        throw err;
    }
}

async function closePool() {
    return new Promise((resolve) => {
        db.end((err) => {
            if (err) console.error('Erro ao encerrar o pool de conexões:', err.message);
            resolve();
        });
    });
}

async function removeAllData() {
    let exitCode = 0;
    try {
        console.log('=== REMOVENDO TODOS OS DADOS DO BANCO DE DADOS ===');

        const tables = [
            { name: 'resumeData', label: 'dados de currículo' },
            { name: 'userData', label: 'dados de usuário' },
            { name: 'skillsData', label: 'dados de habilidades' },
            { name: 'headerData', label: 'dados de menu' }
        ];

        for (const t of tables) {
            console.log(`Removendo ${t.label}...`);
            const exists = await tableExists(t.name);
            if (!exists) {
                console.log(`- Tabela ${t.name} não existe. Pulando.`);
                continue;
            }
            await safeQuery(`DELETE FROM ${t.name}`);
        }

        console.log('\nResetando contadores de auto-incremento...');
        for (const t of tables) {
            const exists = await tableExists(t.name);
            if (!exists) continue;
            await safeQuery(`ALTER TABLE ${t.name} AUTO_INCREMENT = 1`);
        }

        console.log('\n✓ Todos os dados foram removidos (quando possível) e contadores foram resetados!');
        console.log('Para recriar os dados, utilize o comando: npm run seed');
    } catch (error) {
        console.error('Erro ao remover todos os dados:', error.message);
        console.error(error.stack);
        exitCode = 1;
    } finally {
        await closePool();
        process.exit(exitCode);
    }
}

removeAllData();
