import { db } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token
    console.log(token)
    if (!token) {
        throw new ApiError(401, "invalid token")
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET)

    let user = await db.user.findUnique({
        where: { id: decoded.id },
        select: {
            id: true,
            username: true,
            email: true
        }
    })

    console.log("user is ", user)

    if (!user) {
        throw new ApiError(401, "invalid token")
    }
    req.user = user
    next()
})