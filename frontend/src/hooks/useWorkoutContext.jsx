import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkoutContext = () => {
    const { workouts, dispatch } = useContext(WorkoutContext)

    return { workouts, dispatch }
}