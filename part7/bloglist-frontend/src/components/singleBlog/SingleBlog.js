import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import blogsService from '../../services/blogsService';
import blogsActions from '../../store/blogs/actions/blogActions';
import {Button} from "react-bootstrap"

function SingleBlog() {

    const blogs = useSelector(state => state.blogs);

    const dispatch = useDispatch();

    const blogId = (useParams()).id

    const blog = blogs.find(blog => blog.id == blogId);

    const [showCreateComment, setShowCreateComment] = useState(false);

    const [blogComments, setBlogComments] = useState([]);

    useEffect(() => {
        
        getComments()
        
    }, [])


    const getComments = async () => {

        const token = window.localStorage.getItem("token");

        try {
            const data = await blogsService.getBlogComments(blogId, token);

            console.log(data)

            setBlogComments(data.data)

        } catch (error) {
            console.dir(error)
        }

    }

    const likeBlog = () => {

        dispatch(blogsActions.updateBlog(blog, {...blog, likes: blog.likes + 1}))

    }


    const toggleCreateComment = () => {

        setShowCreateComment(prev => !prev)

    }


    const submitComment = async (e) => {

        e.preventDefault();

        const comment = e.target.comment.value;

        console.log(comment)

        const token = window.localStorage.getItem("token");

        await blogsService.postBlogComment(blogId, comment, token);

        await getComments();

        setShowCreateComment(false)
    }


    if (!blog) {
        return (<div>
            Cannot found blog with ID {blogId}
        </div>)
    } else {

        console.log(blog)

        return (
            <div className="border p-4">
               <h3>{blog.title}</h3> 
               <a href={blog.url} target="_blank">{blog.url} 🔗</a>

                <div>
                    {blog.likes} {blog.likes === 1? "like": "likes"}
                    <Button className="m-2" onClick={likeBlog}>Like ❤️</Button>
                </div>

                <h5>Added by {blog.author}</h5>

                <div className="border p-2">

                    <h3>Comments</h3>

                    <Button className="mb-3" 
                    variant={showCreateComment? "outline-danger":"outline-primary"} 
                    onClick={toggleCreateComment}>
                        {showCreateComment? "Cancel": "Add comment"}
                    </Button>

                   {showCreateComment?
                    
                        (<form onSubmit={submitComment}>
                            <input type="text" name="comment" id="comment"/>
                            <input type="submit" value="post comment" />
                        </form>)
                        :
                        (<ul className="list-group list-group-numbered">
                            {blogComments
                            .map((comment, index) => 
                            (<li className="list-group-item" key={index}>{comment}</li>))}
                        </ul>)
                   }

                </div>

            </div>
        )
    }

    
}

export default SingleBlog
