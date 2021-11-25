import React from 'react'

function Notification(props) {
  const { message, isError } = props

  const styles = {
    color: isError ? 'red' : 'green',
    border: `1px solid ${isError ? 'red' : 'green'}`,
    padding: '10px',
    backgroundColor: 'lightgrey'
  }

  return <div id="notification" style={styles}>{message}</div>
}

export default Notification
