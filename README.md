# API de Entrega

API RESTful para sistema de entrega com autenticação e rastreamento de pedidos, construída com Express, TypeScript, Prisma e JWT.

![Swagger UI](docs/doc-swagger-api-delivery.png)

## 📋 Funcionalidades

* Autenticação JWT com controle de acesso baseado em funções (RBAC)
* Usuários com perfis diferentes: clientes e vendedores
* Criação e rastreamento de entregas em tempo real
* Sistema de logs para acompanhamento completo das etapas de entrega
* Documentação interativa com Swagger

## 🚀 Tecnologias

* **Node.js** - Ambiente de execução
* **TypeScript** - Superset JavaScript com tipagem estática
* **Express** - Framework web rápido e minimalista
* **Prisma** - ORM moderno para TypeScript
* **PostgreSQL** - Banco de dados relacional
* **JWT** - Autenticação baseada em tokens
* **Bcrypt** - Hash seguro para senhas
* **Zod** - Validação de esquemas
* **Jest** - Framework de testes
* **Swagger** - Documentação interativa
* **Docker** - Conteinerização

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/ItamarJuniorDEV/api-delivery
cd api-delivery

# Instale as dependências
npm install

# Configure as variáveis de ambiente (.env)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api-delivery?schema=public"
JWT_SECRET=seu_segredo_jwt

# Inicie o banco de dados via Docker
docker-compose up -d

# Execute as migrações do Prisma
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Para acessar rotas protegidas:

1. Faça login via endpoint `POST /sessions`
2. Use o token recebido no cabeçalho: `Authorization: Bearer {seu_token_jwt}`

**Níveis de Acesso:**
* **cliente**: Visualiza apenas suas próprias entregas
* **sale**: Acesso total - cria entregas, atualiza status e visualiza todas as entregas

## 🔄 Endpoints

| Recurso | Método | Endpoint | Descrição |
|---------|--------|----------|-----------|
| Usuários | `POST` | `/users` | Criar um usuário |
| Autenticação | `POST` | `/sessions` | Fazer login e obter token JWT |
| Entregas | `POST` | `/deliveries` | Criar uma nova entrega |
| Entregas | `GET` | `/deliveries` | Listar todas as entregas |
| Entregas | `PATCH` | `/deliveries/:id/status` | Atualizar o status de uma entrega |
| Logs | `POST` | `/delivery-logs` | Adicionar um registro a uma entrega |
| Logs | `GET` | `/delivery-logs/:delivery_id/show` | Obter detalhes completos com logs |

## 💾 Modelos de Dados

**Usuário**
* ID, nome, email, senha (hash), função (cliente/sale), data de criação

**Entrega**
* ID, descrição, ID do usuário, status (processando/enviado/entregue), data de criação

**Log de Entrega**
* ID, ID da entrega, descrição, data de criação

## 🧪 Testes

```bash
# Execute os testes
npm run test:dev
```

* Testes unitários para os controladores
* Testes de integração para endpoints usando SuperTest

## 📚 Documentação

A documentação completa está disponível via Swagger UI:
```
http://localhost:3333/api-docs
```

Inclui todos os endpoints, parâmetros, modelos e exemplos de uso.

## 📝 Licença

Este projeto está licenciado sob a licença MIT.

## 👨‍💻 Autor

Itamar Junior