import { useState } from "react"
import loginService from "../services/loginService"
import noteService from "../services/noteService"
import PropTypes from "prop-types"
import { setNotification } from "../reducers/flashmessageReducer"
import { useDispatch, useSelector} from "react-redux"
import { loginUser } from "../reducers/userReducer"

export const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [displayForm, setDisplayForm] = useState(false)


  const submitLogin = async (event) => {
      event.preventDefault()
      dispatch(loginUser({ username, password }))
      setPassword("")
      setUsername("")
  }
  // const submitLogin = async (event) => {
  //   event.preventDefault()  
  //   try {
  //     const user = await loginService.login({
  //       username: username,
  //       password: password,
  //     })
  //     window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
  //     setUser(user)
  //     noteService.setToken(user.token)
  //     setPassword("")
  //     setUsername("")
  //     dispatch(setNotification("Login successful", 'success'))
  //   } catch (exception) {
  //     dispatch(setNotification("Wrong username or password", 'error'))
  //   }
  // }

  const handleUserChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      {displayForm ? (
        <>
          <h2 className="font-bold">Login</h2>
          <form className="max-w-36 justify-center flex flex-col">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <input
                className="text-gray-950"
                type="text"
                id="username"
                name="username"
                onChange={handleUserChange}
              />
              <label htmlFor="password">Password</label>
              <input
                className="text-gray-950"
                type="password"
                id="password"
                name="password"
                onChange={handlePasswordChange}
              />
              <button
                className="bg-gray-900 text-white p-2 rounded-md"
                type="submit"
                onClick={submitLogin}
              >
                Login
              </button>
              <button
                className="bg-gray-900 text-white p-2 rounded-md"
                onClick={() => setDisplayForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <button
          className="bg-gray-900 text-white p-2 rounded-md"
          onClick={() => setDisplayForm(true)}
        >
          Login
        </button>
      )}
    </div>
  )
}

// LoginForm.propTypes = {
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
//   setUsername: PropTypes.func.isRequired,
//   setPassword: PropTypes.func.isRequired,
//   setUser: PropTypes.func.isRequired,
// }
