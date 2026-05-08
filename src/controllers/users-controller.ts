import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { hash } from 'bcrypt';
import { z } from 'zod';

class UsersController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = bodySchema.parse(req.body);

    const hashedPassword = await hash(password, 8)

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        },
      })

      const { password: _, ...userWithoutPassword } = user;

      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError("Email já existente!")
      }
      throw error;
    }
  }
}

export { UsersController };