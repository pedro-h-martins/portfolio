const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

const headerData = {
    menuItems: [
        { title: "Introdução", href: "#" },
        { title: "Principais Projetos", href: "#projetos" },
        { title: "Certificados", href: "#certificados" }
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

app.get('/', (req, res) => {
    res.render('index', {
        header: headerData,
        footer: footerData,  
        data: portfolioData
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor na porta: ${port}`);
});