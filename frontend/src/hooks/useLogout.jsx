
import { removeUser } from "../features/users/usersSlice"
import { useDispatch } from "react-redux"
import { removeWorkouts } from "../features/workouts/workoutSlice"

export const useLogout = () => {

    const dispatch = useDispatch()

    const logout = () => {
        localStorage.removeItem("user")

        dispatch(removeUser())
        dispatch(removeWorkouts())
    }

    return { logout }
}