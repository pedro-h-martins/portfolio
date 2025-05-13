import express from 'express';
import * as dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { headerData, footerData, userData, resumeData } from './data.js';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

app.get('/', (req, res) => {
    res.render('index', {
        header: headerData,
        footer: footerData,
        data: userData
    });
});

app.get('/curriculo', (req, res) => {
    res.render('curriculo', {
        header: headerData,
        footer: footerData,
        data: userData,
        resume: resumeData
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor na porta: ${port}`);
});