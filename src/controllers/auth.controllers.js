import { db } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    const existingUser = await db.user.findFirst({
        where: {
            OR: [
                { username },
                { email }
            ]
        }
    });


    if (existingUser) {
        throw new ApiError(409, "User already registered")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await db.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    })

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    };

    return res
        .status(200)
        .cookie("token", token, options) // set the access token in the cookie
        .json(
            new ApiResponse(
                200,
                { user: newUser, token }, // send access and refresh token in response if client decides to save them by themselves
                "User registered  successfully"
            )
        );
})
export const login = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    const existingUser = await db.user.findFirst({
        where: {
            OR: [
                { username },
                { email }
            ]
        }
    })

    if (!existingUser) {
        throw new ApiError(409, "User does not exist")
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "invalid credentials")
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: "7d" })


    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    };

    return res
        .status(200)
        .cookie("token", token, options) // set the access token in the cookie
        .json(
            new ApiResponse(
                200,
                { user: existingUser, token }, // send access and refresh token in response if client decides to save them by themselves
                "User loggedIn  successfully"
            )
        );
})