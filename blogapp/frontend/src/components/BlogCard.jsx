import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";
export const BlogCard = ({ user, blog, blogRef, handleDelete }) => {
  const dispatch = useDispatch();

  const handleLike = async () => {
    dispatch(likeBlog(blog._id));
  }

  return (
    <div className="blogCard">
      <h3 className="font-bold">{blog.title}</h3>
      <Togglable buttonLabel="View" ref={blogRef}>
        <>
          <span>{blog.author}</span>
          <div className="mt-3">{blog.url}</div>
          {user && 
            <button
              className={
                `float-right ` +
                ((blog.likedBy.includes(user.id)) ? "border-green-500 border-2 rounded-full " : "")
              }
              onClick={handleLike}
            > 
              { user &&
              <div data-testid="likeButton" className="rounded-full bg-gray-950 p-1 w-8 text-center">
                {blog.likes}
              </div>
              }
            </button>
          }
        </>
      </Togglable>
      <div>
            <button data-testid="deleteButton"
            // disabled={user && (blog.user.id === user.id) ? false : true}
            className={`absolute top-0 right-0 m-1 w-4 rounded-full h-4 bg-red-700 ` + (user && (blog.user.id === user.id || blog.user === user.id) ? "" : "hidden") }
            onClick={() => handleDelete(blog._id)}
            >
            </button>
      </div>
    </div>
  );
};
