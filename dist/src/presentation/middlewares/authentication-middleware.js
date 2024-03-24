"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
class AuthenticationMiddleware {
    static perform(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                status: 401,
                message: "Cabeçalho de autenticação não encontrado"
            });
        }
        const [bearer, token] = authHeader.split(" ");
        if (bearer !== "Bearer") {
            return res.status(401).json({
                status: 401,
                message: "Parâmetros faltando"
            });
        }
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "Token não esta presente"
            });
        }
        if (token !== process.env.INTERNAL_LOCAL_TOKEN) {
            return res.status(401).json({
                status: 401,
                message: "Token inválido"
            });
        }
        next();
    }
}
exports.AuthenticationMiddleware = AuthenticationMiddleware;
