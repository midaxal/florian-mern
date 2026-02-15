import express from "express"
import { createWorkout, getAllWorkouts, getOneWorkout, updateWorkout, deleteWorkout } from "../controllers/workoutController.js"
import requireAuth from "../middleware/requereAuth.js"

const router = express.Router()

router.use(requireAuth)

router.get("/", getAllWorkouts)

router.get("/:id", getOneWorkout)

router.post("/", createWorkout)

router.delete("/:id", deleteWorkout)

router.patch("/:id", updateWorkout)

export default router