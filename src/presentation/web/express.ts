import express, { Request, Response } from "express"
import cors from "cors"
import { router } from "../router/router"
import helmet from "helmet"
import { limiter } from "../middlewares/rate-limit"
import dotenv from "dotenv"
const app = express()
dotenv.config()

app.set('trust proxy', 1)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors({ origin: "*" }))
app.use(router)

const PORT = 4578
app.get("/", (req: Request, res: Response) => res.json("Servidor funcionando normalmente") )
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
});