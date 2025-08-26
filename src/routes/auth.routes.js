import { Router } from "express";
import { getCurrentUser, login, register } from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/me").get(verifyJWT, getCurrentUser)

export default router