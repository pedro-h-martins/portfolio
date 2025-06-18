import db from '../config/db.js';
import { headerData, userData, resumeData } from '../data.js';

const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

async function seedDatabase() {
    try {
        const [existingUsers] = await db.promise().query('SELECT COUNT(*) as count FROM userData');
        if (existingUsers[0].count > 0) {
            console.log('Database already has data. Skipping seed operation.');
            return;
        }

        console.log('Inserindo dados do header...');
        const headerPromises = headerData.menuItems.map(item => {
            return executeQuery(
                'INSERT INTO headerData (href, titulo) VALUES (?, ?)',
                [item.href, item.title]
            );
        });
        await Promise.all(headerPromises);

        console.log('Inserindo dados do usuário...');
        const userResult = await executeQuery(
            'INSERT INTO userData (nome, papel, email, interesses, `info`) VALUES (?, ?, ?, ?, ?)',
            [userData.name, userData.role, userData.email, userData.interests, userData.description]
        );
        const portId = userResult.insertId;

        console.log('Inserindo dados de habilidades...');
        const skillsResult = await executeQuery(
            'INSERT INTO skillsData (lang, lang2, fworks, tools) VALUES (?, ?, ?, ?)',
            [resumeData.lang, resumeData.lang2, resumeData.fWorks, resumeData.tools]
        );
        const skillsId = skillsResult.insertId;

        console.log('Inserindo dados do currículo...');
        await executeQuery(
            'INSERT INTO resumeData (port_id, skills_id, telefone, endereco, cert) VALUES (?, ?, ?, ?, ?)',
            [portId, skillsId, resumeData.phone, resumeData.address, resumeData.cert]
        );

        console.log('Database seeding completado com sucesso!');
    } catch (error) {
        console.error('Erro durante o seeding:', error);
    } finally {
        console.log('Seeding concluído.');
    }
}

seedDatabase();
