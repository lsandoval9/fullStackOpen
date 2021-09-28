import React from 'react'

const error =  {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
}

const info =  {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
}


function Notification(props) {

    const {message, isError} = props;

    return (
        <div style={isError? error: info}>
            {message}
        </div>
    )
}

export default Notification
