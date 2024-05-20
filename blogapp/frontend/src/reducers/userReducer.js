import { createSlice, current } from '@reduxjs/toolkit'
import loginService from '../services/loginService'
import userService from '../services/userService'
import noteService from '../services/noteService'
import { setNotification } from './flashmessageReducer'

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    create(state, action) {
      state.push(action.payload)  
    },
    login(state, action) {
      return action.payload
    },
    setUsers(state, action) {
      return action.payload
    },
    logout(state) {
      return null
    }
  }
})

export const { create, login, setUsers, logout} = userSlice.actions

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch(setUsers(users))
    }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    try{
      const user = await loginService.login({ username: credentials.username, password: credentials.password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      dispatch(login(user))
      dispatch(setNotification("Login successful", "success"))
    } catch (exception) {
      dispatch(setNotification("Wrong username or password", 'error'))
    }
    return user
  }
}
export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem("loggedBlogappUser")
    dispatch(logout())
  }
}

export default userSlice.reducer