import React, { useEffect, useState, useRef } from "react"
import { BlogCard } from "./BlogCard"
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs, deleteBlog } from '../reducers/blogReducer'


export const Blogs = () => {

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  return (
    <div>
      <h2 className="pb-5 mt-5">Blogs</h2>
      <ul className="flex flex-col gap-5 justify-center place-self-center">
        {blogs.map((blog, index) => (
          <li
            key={index}
            className="bg-gray-900 p-3 rounded-md relative"
          >
            <BlogCard
              user={user}
              blog={blog}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
