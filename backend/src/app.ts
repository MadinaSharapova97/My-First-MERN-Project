import MongoStore from "connect-mongo"
import "dotenv/config"
import express, { NextFunction, Request, Response } from "express"
import session from "express-session"
import createHttpError, { isHttpError } from "http-errors"
import morgan from "morgan"
import { requiresAuth } from "./middleware/Auth"
import noteRoutes from "./routes/routes"
import UserRoutes from "./routes/users"
import env from "./util/validateEnv"

const app = express()
app.use(morgan("dev"))

app.use(express.json())


app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,

    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    })
}))
app.use("/api/users", UserRoutes)
app.use("/api/notes", requiresAuth, noteRoutes)



app.use((req, res, next) => {
    next(createHttpError(404, "Page is not found"))
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "Unknown error account";
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status
        errorMessage = error.message
    }
    res.status(statusCode).json({ error: errorMessage })
})

export default app;