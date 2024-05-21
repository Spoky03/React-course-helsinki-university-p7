import { useState, useEffect, useRef } from "react"
import { Blogs } from "./components/Blogs"
import { UsersList } from "./components/UsersList"
import { FlashMessage } from "./components/FlashMessage"
import { LoginForm } from "./components/LoginForm"
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, setBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser, autoLogin} from './reducers/userReducer'
import userService from "./services/userService"
import { Link, Route, Routes, Navigate, useParams, useNavigate, useMatch} from 'react-router-dom'
import { UserCard } from "./components/UsersList"
import { BlogCardFull } from "./components/BlogCardFull"

const Navbar = () => { 
  return(
    <div className="w-screen justify-center flex bg-slate-900">
      <h1 className="text-xl absolute flex left-4 p-2 font-bold">Blog App</h1>
      <ul className="flex flex-row gap-5 align-center justify-around w-1/2 font-semibold text-xl p-2  ">
        <li><Link to="/">home</Link></li>
        <li><Link to="/users">users</Link></li>
        <li><Link to="/blogs">blogs</Link></li>
      </ul>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user) 
  //if user is already logged in when the app is loaded
  useEffect(() => {
    dispatch(autoLogin())
    dispatch(initializeBlogs())
  }, [])
  
  const [users, setUsers] = useState(null)
    useEffect(()=>{
        userService.getAll()
        .then(res => setUsers(res))
    },[])

  const matchUser = useMatch('/users/:id')
  const userToMatch = matchUser
    ? (users && users.find(usr => usr.id === matchUser.params.id))
    : null
 
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="m-10 w-4/5 flex flex-col justify-center align-center place-self-center">
      <FlashMessage/>
        <div className="w-1/2 place-self-center flex flex-col justify-center">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/users" element={ <UsersList users={users}/>} />
            <Route path="/users/:id" element={<UserCard user={userToMatch}/>} />
            <Route path="/blogs/:id" element={<BlogCardFull user={user}/>} />
        </Routes>
      </div>
      </div>
    </div>
  )
}

export default App
