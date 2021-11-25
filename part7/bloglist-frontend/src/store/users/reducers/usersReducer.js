const initialState = []

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "LOAD_USERS":
        return [...payload]

    default:
        return state
    }
}
