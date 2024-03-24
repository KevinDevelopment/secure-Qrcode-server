"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
exports.limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: { message: "Houve muitas solicitações de registro vindos deste ip, por favor aguarde um minuto e tente novamente" },
    standardHeaders: true,
    legacyHeaders: false
});
