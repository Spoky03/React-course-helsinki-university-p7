import { Link, useNavigate, Navigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { likeBlog,deleteBlog } from "../reducers/blogReducer";
export const BlogCard = ({ user, blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = async () => {
    dispatch(likeBlog(blog._id));
  }
  const handleDelete = async (id) => {
    dispatch(deleteBlog(id))
    navigate('/blogs')
  }

  if (!user || !blog ) return null
  return (
    <div className="blogCard bg-gray-900 p-3 rounded-md relative min-h-32 flex flex-col justify-between">
      <Link to={`/blogs/${blog._id}`}><h3 className="font-bold">{blog.title}</h3></Link>
        <>
          <span>{blog.author}</span>
          <div className="mt-3">{blog.url}</div>
          {user && 
          <div className="flex flex-row-reverse w-full place-self-end">
            <button
              className={`` +((blog.likedBy.includes(user.id)) ? " border-green-500 border-2 rounded-full " : "")}
              onClick={handleLike}
            > 
              <div data-testid="likeButton" className="rounded-full bg-gray-950 p-1 w-8 text-center">
                {blog.likes}
              </div>
            </button>
            </div>
          }
        </>
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
