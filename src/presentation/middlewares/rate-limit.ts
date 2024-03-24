import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { message: "Houve muitas solicitações de registro vindos deste ip, por favor aguarde um minuto e tente novamente" },
  standardHeaders: true,
  legacyHeaders: false
});