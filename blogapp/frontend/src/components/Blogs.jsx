import React, { useEffect, useState, useRef } from "react"
import { BlogCard } from "./BlogCard"
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs, deleteBlog } from '../reducers/blogReducer'


export const Blogs = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogRef = useRef()

  const handleDelete = async (id) => {
    dispatch(deleteBlog(id))
  }

  return (
    <div>
      <h2 className="pb-5 mt-5">Blogs</h2>
      <ul className="flex flex-col gap-5">
        {blogs.map((blog, index) => (
          <li
            key={index}
            className="bg-gray-900 p-3 rounded-md max-w-48 relative"
          >
            <BlogCard
              user={user}
              blog={blog}
              blogRef={blogRef}
              handleDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
