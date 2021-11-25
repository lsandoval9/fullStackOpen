

const initialState = []



export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "GET_BLOGS":

        console.log("GET")

        return [ ...payload ]

    default:
        return state
    }
}
