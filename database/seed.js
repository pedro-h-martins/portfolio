import db from '../config/db.js';
import { headerData, userData, resumeData } from '../data.js';

headerData.menuItems.forEach(item => {
    const query = 'INSERT INTO headerData (href, titulo) VALUES (?, ?)';
    db.query(query, [item.href, item.title], (err) => {
        if (err) console.error('Error seeding headerData:', err);
    });
});

//ID Padrão de inicialização
const portId = 1;
const skillsId = 1;

const resumeQuery = 'INSERT INTO resumeData (port_id, skills_id, telefone, endereco, cert) VALUES (?, ?, ?, ?, ?)';
db.query(resumeQuery, [portId, skillsId, resumeData.phone, resumeData.address, resumeData.cert], (err) => {
    if (err) {
        console.error('Error seeding resumeData:', err);
        db.end();
        return;
    }
    const userQuery = 'INSERT INTO userData (port_id, nome, papel, email, interesses, `info`) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(userQuery, [portId, userData.name, userData.role, userData.email, userData.interests, userData.description], (err) => {
        if (err) console.error('Error seeding userData:', err);
    });
    const skillsQuery = 'INSERT INTO skillsData (skills_id, lang, lang2, fworks, tools) VALUES (?, ?, ?, ?, ?)';
    db.query(skillsQuery, [skillsId, resumeData.lang, resumeData.lang2, resumeData.fWorks, resumeData.tools], (err) => {
        if (err) console.error('Error seeding skillsData:', err);
    });
    console.log('Database seeding completed.');
    db.end();
});
