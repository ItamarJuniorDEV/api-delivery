import { Request, Response } from 'express';
import { z } from 'zod';

class UsersController {
  create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password} = bodySchema.parse(req.body);

    return res.json({ message: "ok" });      
  }
}

export { UsersController };