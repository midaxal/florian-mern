import express from "express"
import "dotenv/config"
import workoutRoutes from "./routes/workouts.js"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/user.js"

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)

const mongoUri = process.env.IS_LOCAL === "true" ? process.env.MONGO_URI_LOCAL : process.env.MONGO_URI_CLUSTER

if(!mongoUri){
  throw new Error("Mongo URI is not defined")
}

mongoose.connect(mongoUri)
    .then(() => {
        app.listen(4000, () => {
            console.log("app is listening on port " + 4000 + " and connected to mongo db")
        })
    })
    .catch(error => {
        console.log(error)
    })