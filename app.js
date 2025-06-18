import express from 'express';
import * as dotenv from 'dotenv';
import db from './config/db.js';
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

async function fetchPageData() {
    try {
        const [users] = await db.promise().query('SELECT * FROM userdata where port_id = 1');
        const [headers] = await db.promise().query('SELECT * FROM headerData');
        const [resumes] = await db.promise().query('SELECT * FROM resumeData');
        const [skills] = await db.promise().query('SELECT * FROM skillsData');

        const headerItems = headers.map(item => ({
            title: item.titulo,
            href: item.href
        }));

        return {
            header: { menuItems: headerItems },
            footer: { rights: "@Pedro Henrique Martins. Todos os direitos reservados." },
            data: users[0],
            resume: resumes[0],
            skills: skills[0]
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

app.get('/', async (req, res) => {
    const data = await fetchPageData();
    if (data) {
        res.render('index', data);
    } else {
        res.status(500).send('Error ao carregar dados da página principal');
    }
});

app.get('/curriculo', async (req, res) => {
    const data = await fetchPageData();
    if (data) {
        res.render('curriculo', data);
    } else {
        res.status(500).send('Erro ao carregar dados do currículo');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor na porta: ${port}`);
});