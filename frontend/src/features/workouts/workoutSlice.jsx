import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "idle",
    error: null,
    workouts: []
}

const workoutsSlice = createSlice({
    name: "workouts",
    initialState,
    reducers: {
        addWorkout: (state, action) => {
            return {
                ...state,
                workouts: [...state.workouts, action.payload]
            }
        },
        deleteWorkout: (state, action) => {
            return {
                ...state,
                workouts: state.workouts.filter(oneWorkout => oneWorkout._id !== action.payload)
            }
        },
        removeWorkouts: (state) => {
            return {
                ...state,
                workouts: []
            }
        },
        setWorkouts: (state, action) => {
            return {
                ...state,
                workouts: action.payload
            }
        }
    }
})

export const { addWorkout, deleteWorkout, removeWorkouts, setWorkouts } = workoutsSlice.actions

export const getWorkouts = state => state.workouts.workouts
export const getError = state => state.error
export const getStatus = state => state.status


export default workoutsSlice.reducer