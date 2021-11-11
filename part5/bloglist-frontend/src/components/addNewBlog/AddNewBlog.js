import React, { useState } from 'react'
import blogsService from '../../services/blogsService'

function AddNewBlog(props) {

  const { fetchBlogs, toggleNotification } = props

  const [title, setTitle] = useState('')

  const [author, setAuthor] = useState('')

  const [url, setUrl] = useState('')

  const [token,] = useState(() => {

    return window.localStorage.getItem('token')

  })

  const createNewBlog = async (e) => {

    e.preventDefault()


    try {

      const result = await blogsService.createBlog({
        title,
        author,
        url
      }, { headers: { Authorization: `Bearer ${token}` } })


      if (result.status === 201) {

        toggleNotification(`a new blog "${title}" by "${author}" added`)

        fetchBlogs()

      }

    } catch (error) {
      console.dir(error)
    }



  }

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const onAuthorChange = (e) => {
    setAuthor(e.target.value)


  }


  const onUrlChange = (e) => {

    setUrl(e.target.value)

  }

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={createNewBlog} id="add-new-blog-form">

        <div>
          <label htmlFor="title">title: </label>
          <input type="text" name="title" id="title" value={title}
            onChange={onTitleChange}/>
        </div>

        <div>
          <label htmlFor="author">author: </label>
          <input type="text" name="author" id="author" value={author}
            onChange={onAuthorChange}/>
        </div>

        <div>
          <label htmlFor="url">URL: </label>
          <input type="text" name="url" id="url" value={url}
            onChange={onUrlChange}/>
        </div>

        <input type="submit" value="Create" id="submit-blog"/>

      </form>
      <br />
    </div>
  )
}

export default AddNewBlog
