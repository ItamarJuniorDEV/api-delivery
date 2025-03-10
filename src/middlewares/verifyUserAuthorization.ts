import {  Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';

function verifyUserAuthorization(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if(!req.user){
      throw new AppError('Não autorizado', 401);
    }

    if(!role.includes(req.user.role)){
      throw new AppError('Não autorizado', 401);
    }

    return next();
  }  
}

export { verifyUserAuthorization }