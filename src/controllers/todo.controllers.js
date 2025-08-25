import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { db } from "../db/index.js";


export const createTodo = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { title } = req.body
    
    const newTodo = await db.todo.create({
        data: { title }
    })

    if (!newTodo) {
        throw new ApiError(500, "Failed to create todo")
    }

    res.status(201).json(new ApiResponse(201, { todo: newTodo }, "successfully created todo"))
})
export const updateTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params

    const { title, complete } = req.body
    const todo = await db.todo.findUnique({
        where: {
            id: todoId
        }
    })

    if (!todo) {
        throw new ApiError(404, "Todo does not exist")
    }
    const updatedTodo = await db.todo.update({
        where: { id:todo.id },
        data: {
            title, complete
        }
    })

    res.status(200).json(new ApiResponse(200, { updatedTodo }, "successfully updated todo"))
})
export const getAllTodo = asyncHandler(async (req, res) => {
    const allTodos = await db.todo.findMany()
    res.status(200).json(new ApiResponse(200, { allTodos: allTodos }, "successfully fetched todo"))
})
export const deleteTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params

    const todo = await db.todo.findUnique({
        where: {
            id: todoId
        }
    })

    if (!todo) {
        throw new ApiError(404, "Todo does not exist")
    }

    const deletedTodo = await db.todo.delete({
        where: {
            id: todo.id
        }
    })
    res.status(200).json(new ApiResponse(200, { deletedTodo: deletedTodo }, "successfully deleted todo"))
})

