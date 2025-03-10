import { Request, Response } from 'express';
import { AppError } from '@/utils/AppError';
import { prisma } from '@/database/prisma';
import { z } from 'zod';

class DeliveryLogsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string()
    })

    const { delivery_id, description } = bodySchema.parse(req.body);
    
    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id }
    })

    if(!delivery){
      throw new AppError("Entrega não encontrada", 404)
    }

    if(delivery.status === "processing"){
      throw new AppError("Entrega em processamento", 404)
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description
      }
    })
    
    return res.status(201).json()
  }

  async show(req: Request, res: Response) {
    const paramsSchema = z.object({
      delivery_id: z.string().uuid(),
    })

    const { delivery_id } = paramsSchema.parse(req.params)

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
    })

    if(!delivery) {
      throw new AppError("Entrega não encontrada", 404)
    }

    if (req.user?.role === "customer" && req.user?.id !== delivery.userId) {
      throw new AppError("Não autorizado", 401)
    }

    return res.json(delivery)
  }
}

export { DeliveryLogsController }