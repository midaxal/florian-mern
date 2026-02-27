
import { getUser } from "../features/users/usersSlice"
import { useSelector, useDispatch } from "react-redux"

import { deleteWorkout } from "../features/workouts/workoutSlice"

const WorkoutDetails = ({ workout }) => {

    const user = useSelector(getUser)
    
    const dispatch = useDispatch()

    const handleClick = async () => {

        if(!user){
            return
        }

        const res = await fetch("http://localhost:4000/api/workouts/" + workout._id, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${user.token}` }
        })
        if(res.ok){
            dispatch(deleteWorkout(workout._id))
        }
    }

  return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <span onClick={handleClick}>🗑️</span>
    </div>
  )
}

export default WorkoutDetails