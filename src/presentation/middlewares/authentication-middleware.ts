import { Request, Response, NextFunction } from "express";

export class AuthenticationMiddleware {
    public static perform(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization as string;

        if (!authHeader) {
            return res.status(401).json({
                status: 401,
                message: "Cabeçalho de autenticação não encontrado"
            })
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
            })
        }

        next();
    }
}