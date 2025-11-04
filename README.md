SalvioSilvaCriminal

Deploy (GitHub Pages)

- Este repositório já inclui um workflow de deploy em `.github/workflows/deploy.yml`.
- Ao fazer push na branch `main`, o GitHub Actions irá:
  - Instalar dependências (`npm ci`)
  - Gerar o CSS do Tailwind (`npm run build`)
  - Publicar somente os arquivos necessários (`index.html`, `script.js`, `dist/`, `public/` e `CNAME`) no GitHub Pages.

Passos para ativar o Pages:

1. Crie um repositório no GitHub e adicione este projeto.
2. Faça push da branch `main`.
3. Vá em Settings → Pages → Build and deployment e selecione “Source: GitHub Actions”.
4. Aguarde o workflow finalizar. A URL será exibida no summary do job (ou use seu domínio do `CNAME`).

Comandos úteis:

- `npm install` — instala as dependências locais
- `npm run build` — gera `dist/output.css`
- `npm run build-css` — watch do Tailwind durante desenvolvimento
