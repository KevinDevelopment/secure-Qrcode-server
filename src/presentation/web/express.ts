import express from "express";
import cors from "cors";
import { router } from "../router/router";
import helmet from "helmet";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(router);

const PORT = 8080;

app.use((req, res, next) => {
    // Verifique se o cabeçalho personalizado está presente
    if (req.headers['x-using-nginx'] === 'true') {
        console.log('Acesso via Nginx.');
    } else {
        console.log('Acesso direto ao servidor Node.js.');
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});