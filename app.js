const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

const headerData = {
    menuItems: [
        { title: "Introdução", href: "/#" },
        { title: "Principais Projetos", href: "/#projetos" },
        { title: "Certificados", href: "/#certificados" },
        { title: "Curriculo", href: "/curriculo" }
    ]
};

const footerData = {
    rights: "@Pedro Henrique Martins. Todos os direitos reservados."
};

const portfolioData = {
    name: "Pedro Henrique Martins",
    role: "Estudante",
    email: "pedrohenrimartinss@gmail.com",
    interests: "Aprendizado de Máquina e Back-end de sites.",
    description: "Sou estudante do curso de Desenvolvimento de Software Multiplataforma, no qual tenho muito interrese em desenvolvimento de software. Busco aprimorar minhas habilidades para ingressar projetos que contenham Aprendizado de Máquina e Back-end de sites."
};

const resumeData = {
    phone: "(12) 98829-5823",
    address: "Rua Josué de Oliveira, 213. Residencial União - São José dos Campos",
    lang: "Python, Type/Javascript,",
    lang2: "SQL",
    fWorks: "Flask, ExpressJS",
    tools: "Git e MySQL",
    cert: "AWS Academy Cloud Foundations"
};

app.get('/', (req, res) => {
    res.render('index', {
        header: headerData,
        footer: footerData,
        data: portfolioData
    });
});

app.get('/curriculo', (req, res) => {
    res.render('curriculo', {
        header: headerData,
        footer: footerData,
        data: portfolioData,
        resume: resumeData
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor na porta: ${port}`);
});