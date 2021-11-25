import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogsService from '../../services/blogsService'
import blogsActions from '../../store/blogs/actions/blogActions';
import notificationActions from '../../store/notification/actions/notificationActions';

function AddNewBlog(props) {

    const {setIsCreateBlogVisible} = props;

  const notification = useSelector(state => state.notification);

  const dispatch = useDispatch();

  const [title, setTitle] = useState('')

  const [author, setAuthor] = useState('')

  const [url, setUrl] = useState('')

  const [token,] = useState(() => {

    return window.localStorage.getItem('token')

  })

  const createNewBlog = async (e) => {

    e.preventDefault()


    try {

        await dispatch(blogsActions.createBlog(title, author, url))
        
        await dispatch(notificationActions.notificate(
            `successfully created ${title} by ${author}`, false, 5));

        setIsCreateBlogVisible(false)

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
    <div className="border p-2 my-2">
      <h3>Create new blog</h3>
      <form onSubmit={createNewBlog} id="add-new-blog-form">

        <div className="input-group my-3">
          <label className="input-group-text" htmlFor="title">title: </label>
          <input className="form-control" type="text" name="title" id="title" value={title}
            onChange={onTitleChange}/>
        </div>

        <div className="input-group my-3">
          <label className="input-group-text" htmlFor="author">author: </label>
          <input className="form-control" type="text" name="author" id="author" value={author}
            onChange={onAuthorChange}/>
        </div>

        <div className="input-group my-3">
          <label htmlFor="url" className="input-group-text">URL: </label>
          <input className="form-control" type="text" name="url" id="url" value={url}
            onChange={onUrlChange}/>
        </div>

        <input className="btn btn-primary mt-2" type="submit" value="Create" id="submit-blog"/>

      </form>
      <br />
    </div>
  )
}

export default AddNewBlog
