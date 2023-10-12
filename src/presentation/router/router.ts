import express from "express";
import { VerifyUrlController } from "../controllers/verify-url-controller";
import { AuthenticationMiddleware } from "../middlewares/authentication-middleware";
const router = express.Router();

const urlController = new VerifyUrlController();

router.post("/url", AuthenticationMiddleware.perform, urlController.getUrl.bind(urlController));

export {
    router
}
