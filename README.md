# api-delivery

API REST para gestão de entregas com autenticação por JWT, controle de acesso por papel (cliente e vendedor) e rastreamento de status com histórico em log.

## Funcionalidades

- Cadastro e autenticação de usuários
- Controle de acesso baseado em papel — clientes consultam apenas suas próprias entregas; vendedores gerenciam todas
- CRUD de entregas com status `processing`, `shipped` e `delivered`
- Log automático na mudança de status, mais a possibilidade de registrar eventos manuais
- Rate limiting no login (5 tentativas / 15 min) para mitigar brute-force
- Validação de input com Zod em todos os endpoints
- Documentação interativa via Swagger UI

## Stack

- Node.js + TypeScript
- Express
- Prisma ORM + PostgreSQL
- Zod
- JWT + bcrypt
- Jest + Supertest
- express-rate-limit
- Swagger UI

## Como rodar localmente

Pré-requisitos: Node 20+ e Docker.

```bash
git clone https://github.com/ItamarJuniorDEV/api-delivery
cd api-delivery

cp .env-example .env
# edite .env com as variáveis abaixo

npm install
docker-compose up -d
npx prisma migrate deploy

npm run dev
```

Variáveis em `.env`:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api-delivery?schema=public"
JWT_SECRET="uma-string-secreta-de-pelo-menos-32-caracteres"
```

API sobe em `http://localhost:3333`. Documentação interativa em `http://localhost:3333/api-docs`.

## Endpoints

| Método | Rota                                | Auth   | Descrição                          |
|--------|-------------------------------------|--------|------------------------------------|
| POST   | `/users`                            | —      | Cadastra usuário                   |
| POST   | `/sessions`                         | —      | Login, retorna JWT (rate-limited)  |
| POST   | `/deliveries`                       | sale   | Cria entrega                       |
| GET    | `/deliveries`                       | sale   | Lista entregas                     |
| PATCH  | `/deliveries/:id/status`            | sale   | Atualiza status da entrega         |
| POST   | `/delivery-logs`                    | sale   | Registra evento manual no log      |
| GET    | `/delivery-logs/:delivery_id/show`  | both   | Detalhes da entrega + histórico    |

Papéis: `customer` (cliente) e `sale` (vendedor).

## Modelos

**User** — `id`, `name`, `email` (único), `password` (hash bcrypt), `role`, `createdAt`, `updatedAt`

**Delivery** — `id`, `userId`, `description`, `status`, `createdAt`, `updatedAt`

**DeliveryLog** — `id`, `deliveryId`, `description`, `createdAt`, `updatedAt`

## Testes

```bash
npm run test:dev
```

Testes de integração com Supertest cobrindo cadastro de usuário e login.

## Autor

Itamar Junior — [github.com/ItamarJuniorDEV](https://github.com/ItamarJuniorDEV)
