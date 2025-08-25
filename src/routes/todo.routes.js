import { Router } from "express";
import { createTodo, deleteTodo, getAllTodo, updateTodo } from "../controllers/todo.controllers.js";

const router = Router()

router.route("/")
    .post(createTodo)
    .get(getAllTodo)

router.route("/:todoId")
    .put(updateTodo)
    .delete(deleteTodo)

export default router