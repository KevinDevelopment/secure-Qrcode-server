import express from "express"
import { VerifyUrlController } from "../controllers/verify-url-controller"
import { AuthenticationMiddleware } from "../middlewares/authentication-middleware"
import { limiter } from "../middlewares/rate-limit"
const router = express.Router()

const urlController = new VerifyUrlController()

router.post("/url", limiter,AuthenticationMiddleware.perform, urlController.getUrl.bind(urlController))

export {
    router
}
