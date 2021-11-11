
import React, { useState } from 'react'
import  blogService from '../../services/blogsService'




const Blog = ({ blog, fetchBlogs=() => {} }) => {

  const [areDetailsShown, setAreDetailsShown] = useState(false)

  const [token,] = useState(() => {
    return window.localStorage.getItem('token')
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {

    setAreDetailsShown(prev => {
      return !prev
    })

  }


  const likeBlog = async (blog) => {

    try {

      await blogService.updateBlog({

        ...blog,
        likes: blog.likes + 1

      }, blog)

      await fetchBlogs()

    } catch (error) {

      console.dir(error)
    }

  }


  const deleteBlog = async () => {

    try {
      await blogService.deleteBlog(blog, { headers: { Authorization: `Bearer ${token}` } })

      await fetchBlogs()
    } catch(error) {
      console.dir(error)
    }

  }

  return (
    <>
      <br />
      <div className="blog" style={blogStyle}>
        <span>{blog.title} {blog.author}</span>
        <button id="details-button"
          onClick={toggleDetails}>{areDetailsShown? 'hide': 'show'} details</button>
        <button style={{ background: 'red', color: 'white' }} id="delete-button" onClick={deleteBlog}>X</button>

        <div id="details" className="details" style={{ display: areDetailsShown? '': 'none' }}>

          <a href={blog.url} id="url">{blog.url}</a>
          <p className="likes" id="likes">likes: {blog.likes} - <button id="like-button"  onClick={() => likeBlog(blog)}>Like</button></p>

        </div>

      </div>

    </>
  )
}

export default Blog
