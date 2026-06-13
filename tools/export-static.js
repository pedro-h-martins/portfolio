import fs from 'fs/promises';
import path from 'path';
import ejs from 'ejs';
import { headerData, footerData, userData, resumeData } from '../data.js';

const cwd = process.cwd();
const viewsDir = path.join(cwd, 'views');
const outDir = path.join(cwd, 'docs');
const publicDir = path.join(cwd, 'public');

async function ensureOut() {
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });
}

function buildPageData() {
  return {
    header: { menuItems: headerData.menuItems },
    footer: footerData,
    data: {
      nome: userData.name,
      papel: userData.role,
      email: userData.email,
      interesses: userData.interests,
      info: userData.description
    },
    resume: {
      telefone: resumeData.phone,
      endereco: resumeData.address,
      cert: resumeData.cert
    },
    skills: {
      lang: resumeData.lang,
      lang2: resumeData.lang2,
      fworks: resumeData.fWorks,
      tools: resumeData.tools
    }
  };
}

async function renderTemplate(templateFile, outFile, data) {
  const templatePath = path.join(viewsDir, templateFile);
  console.log(`Rendering ${templatePath} -> ${outFile}`);
  const html = await ejs.renderFile(templatePath, data);
  await fs.writeFile(path.join(outDir, outFile), html, 'utf8');
}

async function copyPublic() {
  let exists;
  try {
    await fs.access(publicDir);
    exists = true;
  } catch {
    exists = false;
  }

  if (!exists) {
    console.warn('No public directory found; skipping asset copy.');
    return;
  }

  console.log('Copying public assets into docs/');
  await fs.cp(publicDir, outDir, { recursive: true, force: true });
}

async function run() {
  try {
    await ensureOut();
    const pageData = buildPageData();

    await renderTemplate('index.ejs', 'index.html', pageData);
    await renderTemplate('curriculo.ejs', 'curriculo.html', pageData);

    await copyPublic();

    console.log('Static export complete. Files written to docs/');
  } catch (err) {
    console.error('Export failed:', err);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('export-static.js')) {
  run();
}
