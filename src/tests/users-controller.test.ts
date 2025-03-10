import request from "supertest";
import { prisma } from "@/database/prisma";

import { app } from "@/app";

describe("UsersController", () => {
  let user_id: string

  afterAll(async() => {
    await prisma.user.delete({ where: { id: user_id } })
  })

  it("Deverá criar um novo usuário com sucesso", async () => {
    const res = await request(app).post("/users").send({
      name: "Test Itamar",
      email: "itamarteste@test.com",
      password: "password123"
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test Itamar");

    user_id = res.body.id
  })

  it("Deverá falhar ao criar um novo usuário com email duplicado", async () => {
    const res = await request(app).post("/users").send({
      name: "Usuário duplicado",
      email: "itamarteste@test.com",
      password: "password123"
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Email já existente!");
  })

  it("Deverá falhar ao criar um novo usuário com email inválido", async () => {
    const res = await request(app).post("/users").send({
      name: "Test Itamar",
      email: "email-invalido",
      password: "password123"
    })

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("validation Error");
  })
})