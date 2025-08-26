import { Router } from "express";
import { createTodo, deleteTodo, getAllTodo, updateTodo } from "../controllers/todo.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/")
    .all(verifyJWT)
    .post(createTodo)
    .get(getAllTodo)

router.route("/:todoId")
    .all(verifyJWT)
    .put(updateTodo)
    .delete(deleteTodo)

export default router