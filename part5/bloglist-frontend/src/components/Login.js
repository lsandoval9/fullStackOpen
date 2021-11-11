import axios from 'axios'
import React, { useState } from 'react'

function Login(props) {
  const { setToken, toggleNotification } = props

  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')


  const onLogin = async (e) => {

    e.preventDefault()




    try {
      const result = await axios.post('/api/login', {

        username,
        password

      })

      if (result.status === 200) {

        window.localStorage.setItem('token', result.data.token)

        setToken(result.data.token)

        window.localStorage.setItem('username', result.data.username)

      }


    } catch (error) {
      if(error.response.status === 401) {

        toggleNotification('Wrong username or password', true)

      }
    }


  }

  const onPasswordChange = (e) => {

    setPassword(e.target.value)

  }

  const onUsernameChange = (e) => {

    setUsername(e.target.value)

  }

  return (
    <>
      <h3>Log in to application</h3>
      <form onSubmit={onLogin}>
        <div>
          <label htmlFor="username">username: </label>
          <input type="text" name="username" value={username}
            onChange={onUsernameChange} id="username-input"/>
        </div>
        <div>
          <label htmlFor="password">password: </label>
          <input type="password" name="password" value={password}
            onChange={onPasswordChange} id="password-input"/>
        </div>
        <input type="submit" value="login" id="login-button"/>
      </form>
    </>
  )
}

export default Login
