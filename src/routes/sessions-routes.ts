import { Router } from 'express';

import { SessionsController } from '@/controllers/sessions-controller';
import { loginRateLimiter } from '@/middlewares/rate-limiter';

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post('/', loginRateLimiter, sessionsController.create);

export { sessionsRoutes }