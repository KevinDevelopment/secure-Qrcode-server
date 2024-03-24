"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyUrlController = void 0;
const verify_url_usecase_1 = require("../../core/usecases/verify-url-usecase");
const verify_url_adapter_1 = require("../../infrastructure/adapters/verify-url-adapter");
class VerifyUrlController {
    verifyUseCase;
    constructor(urlAdapter = new verify_url_adapter_1.VerifyUrlAdapter()) {
        this.verifyUseCase = new verify_url_usecase_1.VerifyUrlUseCase(urlAdapter);
    }
    async getUrl(req, res) {
        try {
            const inputDTO = {
                url: req.body.url
            };
            const urlData = await this.verifyUseCase.perform(inputDTO);
            return res.status(200).json({ message: "ok", data: [urlData] });
        }
        catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(400).json({ message: "erro ao obter dados da api", error: error.message });
            }
            return res.status(500).json({ message: "erro interno do servidor" });
        }
    }
}
exports.VerifyUrlController = VerifyUrlController;
