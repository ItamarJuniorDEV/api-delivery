import rateLimit from 'express-rate-limit';

const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;

export const loginRateLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES_IN_MS,
  limit: 5,
  skipSuccessfulRequests: true,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
  },
});
