import { useRef } from "react"
import Togglable from "./Togglable"
import { AddBlog } from "./AddBlog"
import { useDispatch } from "react-redux"
import { logoutUser } from "../reducers/userReducer"

export const LoginFormCallback = ({user}) => {
    const dispatch = useDispatch()
    const blogFormRef = useRef()
    const handleLogout = () => {
        dispatch(logoutUser())
      }

      
    return(
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
    )
}