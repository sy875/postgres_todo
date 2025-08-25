import cookie from "cookie"
import jwt from "jsonwebtoken"

const initializeSocketio = (io) => {
    return io.on("connection", async (socket) => {
        try {
            const cookies = cookie.parse(socket.handshake.headers?.cookie || "")
            let token = cookies?.accessToken

            if (!token) {
                //if there is no token inside cookies.check inside handshake auth
                token = socket.handshake.auth?.token
            }

            if (!token) {
                throw new ApiError(401, "Un-authorized handshake.Token is missing")
            }

            const decodedToken = jwt.verify(token, process.env.token)

            const user = await db.user.findUnique()


        } catch (error) {

        }
    })
}