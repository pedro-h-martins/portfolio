import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const db = process.env.DATABASE_URL
    ? mysql.createConnection(process.env.DATABASE_URL)
    : mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

export default db;
