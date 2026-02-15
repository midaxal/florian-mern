import { useState } from "react";

import { useDispatch } from "react-redux"
import { addUser } from "../features/users/usersSlice";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const dispatch = useDispatch()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const res = await fetch("http://localhost:4000/api/user/login", {
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

    return { login, error, isLoading }
}