import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const db = process.env.DATABASE_URL
    ? mysql.createPool(process.env.DATABASE_URL)
    : mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

db.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
    connection.release();
});

export default db;
