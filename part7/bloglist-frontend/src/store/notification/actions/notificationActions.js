


const notificate = (message, isError, timeInSeconds = 5) => {


    return async dispatch => {

        await dispatch({
            type: "CLEAR"
        })

        dispatch({
            type: "NOTIFICATE",
            payload: {
                show: true, message, isError
            }
        })


        const timer = setTimeout(() => {
            dispatch({
                type: "NOTIFICATE",
                payload: {
                    show: false, message, isError
                }
            })
        }, timeInSeconds * 1000);

        dispatch({
            type: "NOTIFICATE",
            payload: {
                timer: timer
            }
        })

    }

}


const clearTimer = () => {

    return dispatch => {

        dispatch({
            type: "CLEAR"
        })

    }

}

const notificationActions = {
    notificate,
    clearTimer
}

export default notificationActions;