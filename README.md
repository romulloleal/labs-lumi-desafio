# Desafio Labs Lumi

## Online preview

**[labs-lumi.netlify.app](https://labs-lumi.netlify.app)**

## Setup Backend

entre no diretorio backend e instale as dependências do projeto

```
cd ./backend
yarn
```

Crie uma copia do arquivo '.env.example' para '.env', edite a variavel 'DATABASE_URL' com os dados do banco postgre.<br />
Após isso, execute o comando a baixo para rodar as migrations

```
npx prisma migrate deploy
```

Crie uma pasta na raiz chamada 'invoices', adicione as faturas a pasta 'invoices' e em seguida execute o seguinte comando para fazer o parse das faturas para o banco

```
yarn parse:invoices
```

Inicie a aplicação

```
yarn start:dev
```

## Setup Frontend

entre no diretorio frontend e instale as dependências do projeto

```
cd ./frontend
yarn
```

Crie uma copia do arquivo '.env.example' para '.env', edite a variavel 'VITE_API_BASE_URL' com o endereço da aplicação backend

```
yarn dev
```

abra http://localhost:3000

## Technologies

- React.js (Vite.js)
- Tailwind CSS
- React Query
- Prisma

⌨️ with ❤️ by [Romullo Leal](https://github.com/romulloleal) 😊
