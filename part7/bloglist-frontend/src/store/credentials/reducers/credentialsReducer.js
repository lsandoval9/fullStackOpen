const initialState = {
    username: null,
    token: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "LOGIN":

        console.log(payload)

        return { ...state, ...payload };

    case "LOGOUT": 

        return {username: null, token: null};

    default:
        return state
    }
}
