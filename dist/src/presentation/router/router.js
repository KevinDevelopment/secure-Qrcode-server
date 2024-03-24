"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const verify_url_controller_1 = require("../controllers/verify-url-controller");
const authentication_middleware_1 = require("../middlewares/authentication-middleware");
const rate_limit_1 = require("../middlewares/rate-limit");
const router = express_1.default.Router();
exports.router = router;
const urlController = new verify_url_controller_1.VerifyUrlController();
router.post("/url", rate_limit_1.limiter, authentication_middleware_1.AuthenticationMiddleware.perform, urlController.getUrl.bind(urlController));
