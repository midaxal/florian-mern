
import UserModel from "../models/userModel.js"
import jwt from "jsonwebtoken"

const createToken = (_id) => {
    return jwt.sign({ _id }, "secret", { expiresIn: "3d" })
}

export const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password)

        const token = createToken(user._id)

        return res.status(200).json({ email, token })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

export const signupUser = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await UserModel.signup(email, password)

        const token = createToken(user._id)

        return res.status(200).json({ email, token })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}