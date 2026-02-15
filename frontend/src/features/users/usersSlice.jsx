import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            return action.payload
        },
        removeUser: (state) => {
            return null
        }
    }
})

export const { addUser, removeUser } = usersSlice.actions

export const getUser = state => state.users

export default usersSlice.reducer