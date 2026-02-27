import { useState } from "react";
import { addUser } from "../features/users/usersSlice";
import { useDispatch } from "react-redux"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const dispatch = useDispatch()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const res = await fetch("http://localhost:4000/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        const json = await res.json()

        setIsLoading(false)

        if(!res.ok){
            setError(json.error)
        } else {
            setError(null)
            localStorage.setItem("user", JSON.stringify(json))
            dispatch(addUser(json))
        }
    }

    return { signup, error, isLoading }
}