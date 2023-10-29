import { VerifyUrlUseCase } from "../../core/usecases/verify-url-usecase";
import { VerifyUrlAdapter } from "../../infrastructure/adapters/verify-url-adapter";
import { Request, Response } from "express";

export class VerifyUrlController {
    private verifyUseCase: VerifyUrlUseCase;

    constructor(urlAdapter = new VerifyUrlAdapter()) {
        this.verifyUseCase = new VerifyUrlUseCase(urlAdapter);
    }

    async getUrl(req: Request, res: Response) {
        try {
            const inputDTO = {
                url: req.body.url
            }

            const urlData = await this.verifyUseCase.perform(inputDTO);
            return res.status(200).json({ message: "ok", data: [urlData] });
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(400).json({ message: "erro ao obter dados da api", error: error.message });
            }

            return res.status(500).json({ message: "erro interno do servidor" });
        }
    }
}