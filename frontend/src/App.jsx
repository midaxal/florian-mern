
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import { useEffect } from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import { useSelector, useDispatch } from "react-redux"
import { getUser, addUser } from "./features/users/usersSlice"

const App = () => {

  const user = useSelector(getUser)

  const reactDispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if(user){
      reactDispatch(addUser(user))
    }
  }, [reactDispatch])

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar></NavBar>
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to={"/login"} />}></Route>
            <Route path="/login" element={!user ? <Login /> : <Navigate to={"/"} />}></Route>
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to={"/"} />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App