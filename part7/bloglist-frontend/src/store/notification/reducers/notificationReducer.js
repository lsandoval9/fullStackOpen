const initialState = {
    show: false,
    message: "no message",
    isError: false,
    timer: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "NOTIFICATE":
        return { ...state, ...payload }

    case "CLEAR":

        if (state.timer) {
            clearTimeout(state.timer)
        }

        return state;

    default:
        return state
    }
}
