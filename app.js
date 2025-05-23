import express from 'express';
import * as dotenv from 'dotenv';
import { headerData, footerData, userData, resumeData } from './data.js';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import headerRoutes from './routes/headerRoutes.js';
import skillsRoutes from './routes/skillsRoutes.js';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', resumeRoutes);
app.use('/api', headerRoutes);
app.use('/api', skillsRoutes);

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