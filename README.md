# Landing Page - Lots-BI

## Pré-requisitos

- Node.js e npm instalados
- Chave SSH do github

## Configuração do Ambiente

### 1. Clonar o Repositório

```bash
git clone https://<CHAVE_DO_REPO>@github.com/Lots-BI/landing-page.git
cd landing-page
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Rodar a aplicação local e fazer alterações

```bash
npm run dev
```
Edite os arquivos da pasta ```apps\web```> A aplicação irá rodar em http://localhost:3000

### 4. Build da Aplicação

```bash
npm run build
```
A pasta ```dist```vai ser criada, e é onde estão os arquivos finais que vão para o deploy.

## Deploy para Hostinger

**Enviar os arquivos da build:**
   ```bash
   scp -P 65002 -r dist/apps/web/* u643820755@195.35.41.167:~/domains/leandromajr.com/public_html/
   ```

## Branching Strategy

### Branches Principais

- **`development`**: Branch de desenvolvimento com alterações em andamento
- **`main`**: Branch de produção com código estável

### Fluxo de Trabalho

1. Crie uma nova branch a partir de `development`:
   ```bash
   git checkout -b feature/nova-funcionalidade development
   ```

2. Faça suas alterações e commite:
   ```bash
   git add .
   git commit -m "Adiciona nova funcionalidade"
   ```

3. Envie para o repositório remoto:
   ```bash
   git push origin feature/nova-funcionalidade
   ```

4. Crie um Pull Request para `development`

5. Após testes, merge para `main` e faça deploy

## Estrutura do Projeto

```
src/
├── components/     # Componentes React
├── pages/          # Páginas da aplicação
├── assets/         # Imagens, estilos, etc.
├── App.js          # Componente principal
└── index.js        # Ponto de entrada
```