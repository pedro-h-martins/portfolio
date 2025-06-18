# 📝 Portfólio - Pedro Henrique Martins

Bem-vindo ao meu portfólio! Este projeto foi desenvolvido utilizando **Node.js** e **Express**. Inclui uma API REST com CRUD completo ligado ao banco de dados **MySQL** para gerenciamento dos dados do portfólio. Esta em uma instancia do **Vercel** + **Railway** para o deploy do site online. Foi realizado para demonstrar minhas habilidades e projetos realizados.

---

## 📋 Requisitos

Antes de começar, certifique-se de ter os seguintes componentes:

- [📦 Node.js](https://nodejs.org/en) (versão recomendada: 18+)
- [🔧 Git](https://git-scm.com/)
- [🐬 MySQL](https://dev.mysql.com/downloads/mysql/) (a versão deve ser 8+)

---

## 🛠️ Passo a passo para rodar o projeto localmente
### 1️⃣ Clone o repositório

```bash
git clone https://github.com/pedro-h-martins/portfolio
```

### 2️⃣ Instale as dependências

```bash
cd portfolio
npm install
```

### 3️⃣ Configure o banco de dados

1. Crie um banco de dados MySQL

2. Importe o esquema do banco usando o arquivo `database/portfolioDB.sql`
3. Utilize o comando abaixo (opcional) para usar os valores pré-definidos no seed:
   
```
npm run seed
```

### 4️⃣ Configure o arquivo .env

```bash
DB_HOST='localhost' --> endereço do host
DB_USER='seu_usuario' --> nome do usuário
DB_PASSWORD='sua_senha' --> senha do usuário
DB_NAME='seu_banco' --> nome do banco
```

### 5️⃣ Rode o projeto

### Modo Desenvolvimento
Para executar a aplicação em modo de desenvolvimento (compila o CSS do Tailwind e inicia o servidor):
```
npm run dev
```

### Compilar Apenas o CSS
Para compilar os arquivos CSS do Tailwind sem iniciar o servidor:
```
npm run build
```

### Modo Produção
Para executar a aplicação em modo de produção:
```
npm start
```

---

## 🗂️ Estrutura do repositório

```plaintext
├── config/             # Configurações do projeto
│   ├── db.js           # Configuração do banco de dados
├── controllers/        # Controladores da aplicação
├── database/           # Arquivos relacionados ao banco de dados
│   ├── portfolioDB.sql # Esquema do banco de dados
│   ├── seed.js         # Script para popular o banco
├── public/             # Arquivos estáticos
│   ├── css/            # Folhas de estilo
│   ├── documents/      # Arquivos de documentos
│   ├── images/         # Imagens do projeto
├── routes/             # Rotas da aplicação
├── views/              # Templates EJS
│   ├── curriculo.ejs   # Página do currículo
│   ├── index.ejs       # Página principal
│   ├── partials/       # Componentes reutilizáveis
├── app.js              # Arquivo principal da aplicação
├── data.js             # Dados para o banco de dados
├── package.json        # Configurações e dependências do projeto
├── vercel.json         # Configuração para deploy
```

---

## 🛠️ Tecnologias Utilizadas
- **Backend:** Node.js, Express
- **Banco de Dados:** MySQL
- **Templates:** EJS
- **Estilo:** Tailwind CSS
- **Deploy:** Vercel + Railway