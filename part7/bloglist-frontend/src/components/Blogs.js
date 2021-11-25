import {Button} from 'react-bootstrap';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddNewBlog from "./addNewBlog/AddNewBlog"
import BlogListItem from './blogItem/BlogListItem';

function Blogs(props) {

    const {setIsCreateBlogVisible, isCreateBlogVisible} = props;

    const blogs = useSelector(state => state.blogs)

    console.log(blogs)

    const hideWhenVisible = { display: isCreateBlogVisible ? "none" : "" };

    const showWhenVisible = { display: isCreateBlogVisible ? "" : "none" };

    

    const hideCreate = () => {
        setIsCreateBlogVisible(false);
    };

    const showCreate = () => {
        setIsCreateBlogVisible(true);
    };

    return (
        <div>
            <div style={showWhenVisible}>
                    <AddNewBlog
                        setIsCreateBlogVisible={setIsCreateBlogVisible}
                    />
                    <Button variant="danger" id="cancel-button" onClick={hideCreate}>
                        cancel 🚫
                    </Button>
                </div>
            <div style={hideWhenVisible}>
                <Button id="create-blog-button" onClick={showCreate}>
                    Create new Blog
                </Button>
                <br />
                {blogs
                    .sort(
                        (firstBlog, secondBlog) =>
                            secondBlog.likes - firstBlog.likes
                    )
                    .map((blog) => (
                        <BlogListItem
                            key={blog.id}
                            blog={blog}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Blogs
