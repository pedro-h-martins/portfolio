import db from '../config/db.js';

const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

async function removeAllData() {
    try {
        console.log('=== REMOVENDO TODOS OS DADOS DO BANCO DE DADOS ===');

        console.log('Removendo dados de currículo...');
        await executeQuery('DELETE FROM resumeData');

        console.log('Removendo dados de usuário...');
        await executeQuery('DELETE FROM userData');

        console.log('Removendo dados de habilidades...');
        await executeQuery('DELETE FROM skillsData');

        console.log('Removendo dados de menu...');
        await executeQuery('DELETE FROM headerData');

        console.log('\nResetando contadores de auto-incremento...');
        await executeQuery('ALTER TABLE resumeData AUTO_INCREMENT = 1');
        await executeQuery('ALTER TABLE userData AUTO_INCREMENT = 1');
        await executeQuery('ALTER TABLE skillsData AUTO_INCREMENT = 1');
        await executeQuery('ALTER TABLE headerData AUTO_INCREMENT = 1');

        console.log('\n✓ Todos os dados foram removidos com sucesso e contadores de ID foram resetados!');
        console.log('Para recriar os dados, utilize o comando: npm run seed');
    } catch (error) {
        console.error('Erro ao remover todos os dados:', error.message);
        console.error(error.stack);
        process.exit(1);
    } finally {
        db.end();
        process.exit(0);
    }
}

removeAllData();
