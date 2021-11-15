import React from "react";
import { connect, useSelector } from "react-redux";

const Notification = (props) => {

    const notification = props.notification;

    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
    };
    return <div style={style}>{notification.message}</div>;
};


const mapStateToProps = (state) => ({
    
    notification: state.notification

})



export default connect(mapStateToProps, null)(Notification);
