import { db } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt
    if (!token) {
        throw new ApiError(401, "invalid token")
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET)

    let user = db.user.findUnique({
        where: { id: decoded.id },
        select:{
            id:true,
            
        }
    })

    if (!user) {
        throw new ApiError(401, "invalid token")
    }



})