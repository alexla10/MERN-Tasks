import { Router } from "express";
import { login, logout, register,verifyToken } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { loginSchema, registerSchema } from "../schemas/authSchema.js";

const router = Router()

router.post('/register',validateSchema(registerSchema), register)

router.post('/login', validateSchema(loginSchema) ,login)

router.post('/logout', logout)

router.get('/auth/verify',verifyToken)

export default router