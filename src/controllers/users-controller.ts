import { Request, Response } from 'express';

class UsersController {
  create(req: Request, res: Response) {
    return res.json({ message: "ok" });      
  }
}

export { UsersController };