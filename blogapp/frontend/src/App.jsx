import { useState, useEffect, useRef } from "react"
import { Blogs } from "./components/Blogs"
import { AddBlog } from "./components/AddBlog"
import { FlashMessage } from "./components/FlashMessage"
import { LoginForm } from "./components/LoginForm"
import axios from "axios"
import loginService from "./services/loginService"
import noteService from "./services/noteService"
import Togglable from "./components/Togglable"
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/flashmessageReducer'
import { initializeBlogs, setBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser} from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  

  const blogFormRef = useRef()
  const user = useSelector(state => state.user) 
  //if user is already logged in when the app is loaded
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      console.log('loggedUserJSON', JSON.parse(loggedUserJSON))
      dispatch(loginUser(JSON.parse(loggedUserJSON)))
    }
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(setNotification('Logged out successfully', 'info'))
  }

  
  useEffect(() => {
    dispatch(initializeBlogs())
  }
  , [])
  return (
    <>
      <h1 className="text-xl p-2">Blog App</h1>
      <div className="m-10">
          <FlashMessage/>
        {!user ? (
          <LoginForm/>
        ) : (
          <div>
            <div className="flex mb-5">
              <p className="p-2">
                loged as{" "}
                <span className="rounded-md border px-1">{user.username}</span>
              </p>
              <button
                className="bg-gray-900 text-white p-2 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            <Togglable buttonLabel="Add blog" ref={blogFormRef}>
              <AddBlog
                blogFormRef={blogFormRef}
              />
            </Togglable>
          </div>
        )}
        <Blogs/>
      </div>
    </>
  )
}

export default App
