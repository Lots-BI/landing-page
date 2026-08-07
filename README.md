# Landing Page - Lots-BI

Site em produção: **https://leandromajr.com**

## Pré-requisitos

- Node.js e npm
- Acesso ao repositório GitHub (`Lots-BI/landing-page`)
- Chave SSH cadastrada na Hostinger (obrigatória para o `scp` de deploy)

## Configuração local

```bash
git clone https://github.com/Lots-BI/landing-page.git
cd landing-page
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Edite os arquivos em `apps/web`. A app sobe em http://localhost:3000.

> No Git Bash (MINGW), use caminhos Unix: `cd /d/projetos-lots-bi/landing-page` — não use `d:\...`.

## Fluxo correto para colocar alterações no ar

O Git **não** publica o site. Produção só muda depois do **build + scp**.

### 1. Branch a partir de `development`

```bash
git checkout development
git pull origin development
git checkout -b feature/nome-da-mudanca
```

### 2. Alterar, commit e push

```bash
git add apps/web
git commit -m "Descrição clara da mudança"
git push -u origin HEAD
```

Não commite `node_modules` nem cache do Vite.

### 3. Integrar em `development` e depois em `main`

Opção A — Pull Request (preferencial):

```bash
gh pr create --base development --title "Titulo" --body "Descricao"
# após merge em development:
git checkout main
git pull origin main
git merge origin/development
git push origin main
```

Opção B — merge direto (quando não houver `gh` autenticado):

```bash
git checkout development
git merge feature/nome-da-mudanca
git push origin development

git checkout main
git merge development
git push origin main
```

**Só faça deploy a partir de `main` atualizado.**

### 4. Build de produção

Na raiz do repositório:

```bash
npm run build
```

Isso gera (ou atualiza) `dist/apps/web/` — esses são os arquivos que vão para a Hostinger.

Confirme que o build rodou de verdade (deve aparecer o log do Vite, ~10s+):

```bash
# deve existir e ter data/hora recentes
ls dist/apps/web/index.html
ls dist/apps/web/assets/PrivacyPolicy*.js
```

### 5. Deploy Hostinger (passo que sobe o site)

**Git Bash / terminal com SSH da Hostinger:**

```bash
cd /d/projetos-lots-bi/landing-page
scp -P 65002 -r dist/apps/web/* u643820755@195.35.41.167:~/domains/leandromajr.com/public_html/
```

**PowerShell:**

```powershell
cd d:\projetos-lots-bi\landing-page
scp -P 65002 -r dist/apps/web/* u643820755@195.35.41.167:~/domains/leandromajr.com/public_html/
```

Se aparecer `Permission denied (publickey,password)`, a chave SSH da Hostinger não está disponível nesse terminal — use outro ambiente com a chave ou o File Manager da Hostinger (enviar o conteúdo de `dist/apps/web` para `public_html`).

### 6. Validar no ar

1. Abra https://leandromajr.com e force refresh (`Ctrl+Shift+R`).
2. Confira a página afetada (ex.: https://leandromajr.com/privacy-policy).
3. No código-fonte / Network, o JS principal deve ser o hash **novo** gerado no build local (ex.: `index-xxxxx.js` em `dist/apps/web/index.html`), não o hash antigo.

Se o hash no ar for diferente do `dist` local, o `scp` não concluiu.

## Checklist rápido de publicação

- [ ] Código mergeado em `main`
- [ ] `npm run build` concluiu com log do Vite e `dist/apps/web` atualizado
- [ ] `scp` enviou `dist/apps/web/*` para `public_html`
- [ ] Página no ar conferida com hard refresh

## Branches

| Branch | Uso |
|--------|-----|
| `development` | Integração do que está em andamento |
| `main` | Código estável = base do que deve ir para produção |
| `feature/*` | Trabalho do dia; nasce de `development` |

## Rotas importantes (SPA)

| URL canônica | Aliases |
|--------------|---------|
| `/privacy-policy` | `/privacy`, `/privacypolicy` |
| `/terms-of-service` | `/terms`, `/termsofservice` |
| `/contato` | `/contact` |

O `.htaccess` em `apps/web/public` (copiado no build) redireciona rotas da SPA para `index.html`.

## Estrutura

```
apps/web/
├── public/          # estáticos + .htaccess
├── src/
│   ├── components/
│   ├── pages/       # PrivacyPolicy, TermsOfService, etc.
│   ├── App.jsx
│   └── main.jsx
└── tools/
    ├── build.mjs    # build cross-platform
    └── generate-llms.js
dist/apps/web/       # saída do build → conteúdo do deploy
```
