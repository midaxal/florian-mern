import Workout from "../models/Workout.js";

export const getAllWorkouts = async (req, res) => {

    const userId = req.user._id

    const workouts = await Workout.find({ user_id: userId }).sort({createdAt: -1})

    res.status(200).json(workouts)
}

export const getOneWorkout = async (req, res) => {
    const { id } = req.params

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({ error: "No such workout" })
    } else {
        return res.status(200).json( workout )
    }
}

export const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    try {
        const userId = req.user._id
        const workout = await Workout.create({ title, load, reps, user_id: userId })
        return res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const deleteWorkout = async (req, res) => {
    const id = req.params.id

    const workout = await Workout.findByIdAndDelete(id)

    if(!workout){
        return res.status(404).json({ mssg: "Cannot find workout with this id!" })
    } else {
        return res.sendStatus(200)
    }
}

export const updateWorkout = async (req, res) => {
    try {
        const newWorkout = req.body

        const id = req.params.id

        const updatedWorkout = await Workout.findOneAndUpdate({ _id: id }, newWorkout, { new: true })

        if(!updatedWorkout){
            return res.status(404).json({ mssg: "While updating workout, something wend wrong"})
        } else {
            return res.status(200).json(updatedWorkout)
        }
    } catch (error) {
        return res.status(404).json({ mssg: "While updating workout, something wend wrong" })
    }
}