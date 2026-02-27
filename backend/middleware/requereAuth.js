
import jwt from "jsonwebtoken"
import UserModel from "../models/userModel.js"

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({ error: "Authorizotion token required" })
    }

    const token = authorization.split(" ")[1]

    try {
        const { _id } = jwt.verify(token, "secret")

        req.user = await UserModel.findOne({ _id }).select("_id")
        next()
    } catch (error) {
        return res.status(401).json({ error: "Request is not authorized" })
    }
}

export default requireAuth