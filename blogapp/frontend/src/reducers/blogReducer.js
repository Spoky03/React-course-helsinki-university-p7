import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/noteService'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like(state, action) {
      const blogToChange = state.find(blog => blog._id === action.payload.id)
      // const changedBlog = { ...blogToChange, likes: action.payload.updatedBlog.likes, likedBy: action.payload.updatedBlog.likedBy }
      // return state.map(blog =>
      //   blog._id !== action.payload.id ? blog : changedBlog
      // )
      blogToChange.likes = action.payload.updatedBlog.likes
      blogToChange.likedBy = action.payload.updatedBlog.likedBy
    },
    create(state, action) {
      state.push(action.payload)  
    },
    append(state, action) {
      return state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlogCallback(state, action) {
      const id = action.payload
      console.log(id)
      return state.filter(blog => blog._id !== id)
    },
    comment(state, action) {
      const blogToChange = state.find(blog => blog._id === action.payload.id)
      blogToChange.comments = action.payload.updatedBlog.comments
    },
  }
})

export const { like, create, append, setBlogs, deleteBlogCallback, comment } = blogSlice.actions


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(create(newBlog.data))
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    const updatedBlog=await blogService.likeBlog(id)
    dispatch(like({id:id, updatedBlog: updatedBlog}))
  }
}
export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch(deleteBlogCallback(id))
    }
}
export const commentBlog = (id, commentContent) => {
    return async dispatch => {
        const updatedBlog = await blogService.commentBlog(id, commentContent)
        dispatch(comment({id:id, updatedBlog: updatedBlog}))
    }
}
export default blogSlice.reducer