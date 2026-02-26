
import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useSelector, useDispatch } from "react-redux"
import { getUser, removeUser } from "../features/users/usersSlice"
import { getWorkouts, setWorkouts } from "../features/workouts/workoutSlice"

const Home = () => {

  const user = useSelector(getUser)

  const workouts = useSelector(getWorkouts)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("http://localhost:4000/api/workouts", {
        headers: { "Authorization": `Bearer ${user.token}` }
      })
      if(res.ok){
        const json = await res.json()
        dispatch(setWorkouts(json))
      } else {
        dispatch(removeUser())
      }
    }

    if(user){
      fetchWorkouts()
    }
  }, [user, dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(oneWorkout => (
          <WorkoutDetails key={oneWorkout._id} workout={oneWorkout}></WorkoutDetails>
        ))}
      </div>
      <WorkoutForm></WorkoutForm>
    </div>
  )
}

export default Home