import { AppError } from "@/utils/AppError";
import { Request , Response } from "express";
import { prisma } from "@/database/prisma";
import { compare } from "bcrypt";
import { z } from "zod";
class SessionsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findFirst({
       where: { email },
      });

    if (!user){
      throw new AppError("Email ou Senha inválido", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Email ou Senha inválido", 401);
    }

    return res.json({ message: "ok" });
  }
}

export { SessionsController };