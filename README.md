# Landing Page React para Hostinger

Este projeto é uma landing page criada com React que pode ser implantada no Hostinger usando SSH.

## Pré-requisitos

- Node.js e npm instalados localmente
- Conta Hostinger com plano Premium
- Acesso SSH ao servidor (porta 65002)
- Chave SSH configurada (opcional mas recomendado)

## Configuração do Ambiente

### 1. Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Build da Aplicação

```bash
npm run build
```

## Deploy para Hostinger

### Conexão SSH

Conecte-se ao servidor usando:

```bash
ssh -p 65002 u643820755@195.35.41.167
```

> Substitua a senha quando solicitado.

### Estrutura de Pastas

A aplicação será implantada em:
```
~/public_html/
```

### Passos de Deploy

1. **Conectar via SSH**
2. **Navegar até o diretório público:**
   ```bash
   cd ~/public_html
   ```
3. **Enviar arquivos construídos:**
   ```bash
   # Usando scp (recomendado)
   scp -P 65002 -r build/* u643820755@195.35.41.167:~/public_html/
   
   # Ou usando rsync
   rsync -avz --delete build/ u643820755@195.35.41.167:~/public_html/
   ```

## Branching Strategy

### Branches Principais

- **`development`**: Branch de desenvolvimento com alterações em andamento
- **`production`**: Branch de produção com código estável

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

5. Após testes, merge para `production` e faça deploy

## Scripts Disponíveis

- `npm install`: Instala as dependências do projeto
- `npm run dev`: Inicia o site local
- `npm run build`: Constrói a aplicação para produção

## Estrutura do Projeto

```
src/
├── components/     # Componentes React
├── pages/          # Páginas da aplicação
├── assets/         # Imagens, estilos, etc.
├── App.js          # Componente principal
└── index.js        # Ponto de entrada
```

## Considerações Finais

- Certifique-se de que o servidor tem Node.js instalado para rodar a aplicação
- Configure corretamente os arquivos de ambiente (`.env`)
- Faça backup antes de realizar deploy em produção

## Suporte

Para problemas com o deploy, verifique:
1. Permissões de arquivo no servidor
2. Conexão SSH
3. Estrutura de pastas do Hostinger
4. Configurações de proxy ou firewall
```