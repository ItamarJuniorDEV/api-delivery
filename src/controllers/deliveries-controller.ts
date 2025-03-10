import { Request, Response } from 'express';
import { prisma } from '@/database/prisma';
import { z } from 'zod';
import { describe } from 'node:test';

class DeliveriesController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      description: z.string(),
    })

    const { user_id, description } = bodySchema.parse(req.body);

    await prisma.delivery.create({
      data: {
        userId: user_id,
        description,
      }
    })  

    return res.status(201).json();
  }

  async index(req: Request, res: Response) {
    const deliveries = await prisma.delivery.findMany();
    
    return res.json(deliveries);
  }
}

export { DeliveriesController }