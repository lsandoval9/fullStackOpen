import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'

import blogService from './services/blogsService'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [loggedUsername, setLoggedUsername] = useState(() => {

    return window.localStorage.getItem('username')

  })

  const [token, setToken] = useState(() => {
    return window.localStorage.getItem('token')
  })

  const [isCreateBlogVisible, setIsCreateBlogVisible] = useState(false)

  const [notification, setNotification] = useState({
    show: false,
    message: 'no message',
    isError: false
  })

  const logout = () => {

    setToken(undefined)

    setLoggedUsername(undefined)

  }

  const toggleNotification = (message, isError) => {

    setNotification({
      show: true,
      message,
      isError
    })


    setTimeout(() => {
      setNotification({
        show: false,
        message: 'No message',
        isError: false
      })
    }, 6500)

  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = () => {

    blogService.getAll().then((blogs) => setBlogs(blogs))

  }

  return (
    <div>
      {notification.show &&
            <Notification message={notification.message} isError={notification.isError}/>}
      {token ? (
        <Blogs
          fetchBlogs={fetchBlogs}
          loggedUsername={loggedUsername}
          logout={logout} blogs={blogs}
          isCreateBlogVisible={isCreateBlogVisible}
          setIsCreateBlogVisible={setIsCreateBlogVisible}
          token={token}
          toggleNotification={toggleNotification}/>
      ) : (
        <Login
          toggleNotification={toggleNotification}
          setToken={setToken}
          setLoggedUsername={setLoggedUsername}
          loggedUsername={loggedUsername}
        />
      )}
    </div>
  )
}

export default App
