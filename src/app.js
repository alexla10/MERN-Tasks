import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes/auth.js'
import cookieParser from 'cookie-parser'
import tasksRoutes from './routes/tasksRoutes.js'
import { FRONT_END_URL } from './config.js'


const app = express()

app.use(cors({
    origin:FRONT_END_URL,
    credentials: true,
}))

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api',router)
app.use('/api',tasksRoutes)

export default app;