import { AppError } from "@/utils/AppError";
import { Request , Response } from "express";
import { authConfig} from "@/configs/auth";
import { prisma } from "@/database/prisma";
import { sign } from "jsonwebtoken"
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

    const { secret, expiresIn } = authConfig.jwt;

    const token  = sign(
    { role: user.role ?? "customer"},
     secret, 
    {
      subject: user.id,
      expiresIn,
     })

    const  { password: hashedPassword, ...userWithoutPassword } = user;

    return res.json({ token, user: userWithoutPassword });
  }
}

export { SessionsController };