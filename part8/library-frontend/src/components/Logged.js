import React from 'react'

function Logged(props) {

    const {username, logout} = props;

    return (
        <span>
            <span>{username} logged in!</span>
            <button onClick={logout}>logout</button>
        </span>
    )
}

export default Logged
