import { useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BlogCard } from './BlogCard';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { commentBlog } from '../reducers/blogReducer';

const CommentForm = ({ blog }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const handleComment = async (event) => {
        event.preventDefault()
        dispatch(commentBlog(blog._id, comment))
        setComment('')
    }

    return (
        <form onSubmit={handleComment} className='text-gray-950 flex flex-row gap-5'>
            <input
                className='h-8 place-self-center'
                type='text'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button className="bg-gray-900 text-white p-2 rounded-md" type="submit">Comment</button>
        </form>
    )
}
const CommentContainer = ({ blog }) => {
    return (
        <div className="flex flex-col gap-2 mt-5">
            <h3>Comments</h3>
            <CommentForm blog={blog} />
            {(!blog || !blog.comments || blog.comments.lenght == 0) ? <div>Be first one to comment</div> :
                <ul className='flex flex-col gap-5'>
                    {blog.comments.map((comment, index) => (
                        <li className='bg-gray-900 rounded-md p-3' key={index}>{comment}</li>
                    ))}
                </ul>
            }
        </div>
    )
}

export const BlogCardFull = ({ user }) => {
    const matchBlog = useMatch('/blogs/:id')
    const blogs = useSelector(state => state.blogs)
    const blogToMatch = matchBlog
        ? blogs.find(blog => blog._id === matchBlog.params.id)
        : null

    return (
        <div className="flex flex-col mt-5">
            <BlogCard user={user} blog={blogToMatch} />
            <CommentContainer blog={blogToMatch} />
        </div>
    )
}