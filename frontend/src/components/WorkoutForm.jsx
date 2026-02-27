import { useState } from "react"
import { useSelector } from "react-redux"
import { getUser } from "../features/users/usersSlice"

import { useDispatch } from "react-redux"
import { addWorkout } from "../features/workouts/workoutSlice"

const WorkoutForm = () => {

    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const user = useSelector(getUser)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError("You must be logged in")
            return
        }

        const workout = { title, load, reps }

        const res = await fetch("http://localhost:4000/api/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(workout),
        })

        const json = await res.json()

        if(!res.ok){
            setError(json.error)
        } else {
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            dispatch(addWorkout(json))
        }
    }

  return (
    <form className="create" onSubmit={(handleSubmit)}>
        <h3>Add a New Workout</h3>

        <label>Excersize Title</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
        <label>{"Load (in kg)"}</label>
        <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} />
        <label>Reps</label>
        <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} />

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm