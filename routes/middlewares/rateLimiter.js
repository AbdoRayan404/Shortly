import rateLimit from 'express-rate-limit';

export const postLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 150,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'You need to slow down a little'
})