# 📝 Portfólio - Pedro Henrique Martins

Bem-vindo ao meu portfólio! Este projeto é um site estático de portfólio pessoal, desenvolvido com templates **EJS** e estilização **Tailwind CSS**. Os dados são gerenciados via arquivos JavaScript e o site é exportado para HTML estático, hospedado no **GitHub Pages**. Foi realizado para demonstrar minhas habilidades e projetos realizados.

---

## 📋 Requisitos

Antes de começar, certifique-se de ter os seguintes componentes:

- [📦 Node.js](https://nodejs.org/en) (versão recomendada: 18+)
- [🔧 Git](https://git-scm.com/)
- [@tailwindcss/cli](https://tailwindcss.com/docs/installation) (instalado via npm)

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

### 3️⃣ Compile o CSS e exporte o site

Para compilar os arquivos CSS do Tailwind e gerar os arquivos estáticos:

```bash
npm run build      # Compila o CSS do Tailwind
npm run export     # Gera os arquivos HTML estáticos na pasta docs/
```

Ou, em um único comando:

```bash
npm run predeploy  # Executa build + export automaticamente
```

### 4️⃣ Visualize o site

Abra o arquivo `docs/index.html` no seu navegador ou utilize uma extensão de live server.

---

## 🛠️ Tecnologias Utilizadas
- **Runtime:** Node.js
- **Templates:** EJS
- **Estilo:** Tailwind CSS
- **Exportação:** HTML estático
- **Deploy:** GitHub Pages