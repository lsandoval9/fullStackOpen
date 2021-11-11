import React from 'react'
import Blog from './blog/Blog'
import AddNewBlog from './addNewBlog/AddNewBlog'
import PropTypes from 'prop-types'

function Blogs(props) {

  const { blogs, loggedUsername, logout, fetchBlogs, token,
    toggleNotification, isCreateBlogVisible, setIsCreateBlogVisible } = props

  const hideWhenVisible = { display: isCreateBlogVisible ? 'none' : '' }

  const showWhenVisible = { display: isCreateBlogVisible ? '' : 'none' }

  const onLogout = () => {

    window.localStorage.removeItem('username')

    window.localStorage.removeItem('token')

    logout()
  }

  const hideCreate = () => {

    setIsCreateBlogVisible(false)

  }

  const showCreate = () => {

    setIsCreateBlogVisible(true)

  }

  return (
    <>
      <h2>blogs</h2>
      <div>
        <p>User <b>{loggedUsername}</b> logged in {' '}
          <button onClick={onLogout}>Logout</button>
        </p>

        <div style={showWhenVisible}>
          <AddNewBlog toggleNotification={toggleNotification} fetchBlogs={fetchBlogs}/>
          <button id="cancel-button" onClick={hideCreate}>cancel</button>
        </div>


      </div>
      <div style={hideWhenVisible}>

        <button id="create-blog-button" onClick={showCreate}>Create new Blog</button>
        <br />
        {
          blogs.sort((firstBlog, secondBlog) => (

            secondBlog.likes - firstBlog.likes

          )).map(blog => (
            <Blog key={blog.id} blog={blog} token={token} fetchBlogs={fetchBlogs} />
          ))
        }

      </div>
    </>
  )
}

Blogs.propTypes = {
  toggleNotification: PropTypes.func.isRequired,
  isCreateBlogVisible: PropTypes.bool.isRequired,
  loggedUsername: PropTypes.string.isRequired,
  blogs: PropTypes.array.isRequired
}

export default Blogs


