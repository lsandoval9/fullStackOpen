import React from 'react'

function Notification(props) {

    const {notification} = props;

    /* const styles = {
        back
    } */

    return (
        <div style={{backgroundColor: "whitesmoke", color: "green", 
        paddingLeft: "15px", border: "3px solid green"}}>
            <h3>{notification}</h3>
        </div>
    )
}

export default Notification
