import { useState } from "react"
import noteService from "../services/noteService"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/flashmessageReducer"
import { createBlog } from "../reducers/blogReducer"

export const AddBlog = () => {

  const dispatch = useDispatch()

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    const likes = 0
    const newBlog = { title, author, url, likes }
    dispatch(createBlog(newBlog))
    dispatch(setNotification(`Added new blog: ${title} by ${author}`, "success"))
    event.target.title.value = ""
    event.target.author.value = ""
    event.target.url.value = ""
  }


  return (
    <div>
      <form
        data-testid="addBlogForm"
        className="max-w-36 justify-center flex flex-col"
        onSubmit={handleAddBlog}
      >
        <h2 className="font-bold">Add new blog</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            data-testid="title"
            className="text-gray-950"
            type="text"
            id="title"
            name="title"
          />
          <label htmlFor="author">Author</label>
          <input
            data-testid="author"
            className="text-gray-950"
            type="text"
            id="author"
            name="author"
          />
          <label htmlFor="url">Url</label>
          <input 
            data-testid="url" 
            className="text-gray-950" 
            type="text" id="url" name="url" />
          <button
            className="bg-gray-900 text-white p-2 rounded-md"
            type="submit"
          >
            Add blog
          </button>
        </div>
      </form>
    </div>
  )
}
