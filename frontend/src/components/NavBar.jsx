
import { NavLink } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useSelector } from "react-redux"
import { getUser } from "../features/users/usersSlice"

const NavBar = () => {

  const { logout } = useLogout()
  const user = useSelector(getUser)

  return (
    <header>
        <div className="container">
            <NavLink to="/">
                <h1>Workout Buddy</h1>
            </NavLink>
            <nav>
              {user && (
                <div>
                  <span>{user.email}</span>
                  <button onClick={logout}>Log out</button>
                </div>)}
              {!user && (
                <div>
                  <NavLink to={"/login"}>Login</NavLink>
                  <NavLink to={"/signup"}>Sign up</NavLink>
                </div>)}
            </nav>
        </div>
    </header>
  )
}

export default NavBar