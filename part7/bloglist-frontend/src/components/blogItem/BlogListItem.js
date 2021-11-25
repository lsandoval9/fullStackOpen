import {Button, ButtonGroup} from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import blogsActions from "../../store/blogs/actions/blogActions";
import notificationActions from "../../store/notification/actions/notificationActions";

const BlogItemList = ({ blog, fetchBlogs = () => {} }) => {

    const [areDetailsShown, setAreDetailsShown] = useState(false);

    const dispatch = useDispatch();
    console.log(blog)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    const toggleDetails = () => {
        setAreDetailsShown((prev) => {
            return !prev;
        });
    };

    const likeBlog = async (blog) => {

        dispatch(blogsActions.updateBlog(blog, {...blog, likes: blog.likes + 1}))

    };

    const deleteBlog = async (blog) => {

        const response = await dispatch(blogsActions.deleteBlog(blog));

        if (response.status == 204) {
            dispatch(notificationActions
                .notificate(`Succesfully deleted ${blog.title} by ${blog.author}`, false))
        } else {
            dispatch(notificationActions
                .notificate(`Cannot delete blog. Error: ${response.statusText}`, true, 10))
        }

    };

    return (
        <>
            <br />
            <div className="blog" className="p-4 border rounded-1">
                <div className="d-flex flex-row">
                    <span>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
                    </span>
                    <div>
                        <Button variant="secondary" id="details-button" className="mx-2" onClick={toggleDetails}>
                            {areDetailsShown ? "hide" : "show"} details
                        </Button>
                        <Button
                            id="delete-button"
                            onClick={() => deleteBlog(blog)}
                            variant="danger"
                        >
                            X
                        </Button>
                    </div>
                </div>

                <div
                    id="details"
                    className="details"
                    style={{ display: areDetailsShown ? "" : "none" }}
                >
                    <a href={blog.url} id="url">
                        {blog.url}
                    </a>
                    <p className="likes" id="likes">
                        likes: {blog.likes} -{" "}
                        <Button id="like-Button" onClick={() => likeBlog(blog)}>
                            Like ❤️
                        </Button>
                    </p>
                </div>
            </div>
        </>
    );

    
};

export default BlogItemList;
