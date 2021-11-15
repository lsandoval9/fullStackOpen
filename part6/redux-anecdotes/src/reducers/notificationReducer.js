const initialState = {
    message: null,
    timeout: null
}

const notificate = (message, time) => {
    

    return async dispatch => {

        dispatch({
            type: "NOTIFICATE",
            payload: {
                message
            }
        })

        dispatch({type: "CLEAR"})

        const timeout = setTimeout(() => {
            
            dispatch({
                type: "NOTIFICATE",
                payload: {
                    message: null,
                    timeout: null
                }
            })

        }, time * 1000);


        dispatch({type: "TIMEOUT", payload: {timeout: timeout}})

    }
}

export const notificationActions = {
    notificate
}


export default (state = initialState, { type, payload }) => {

    switch (type) {

    case "NOTIFICATE":
        return { ...state, ...payload }


    case "TIMEOUT": 
        
        return {...state, timeout: payload.timeout}

    case "CLEAR":

        if (state.timeout) {
            clearTimeout(state.timeout)
        }

        return {...state, timeout: null}

    default:
        return state
    }
}
