import axios from "axios"



const getUsers = () => {

    return async dispatch => {

        try {
        
            const data = (await axios.get("/api/users")).data;


            dispatch({
                type: "LOAD_USERS",
                payload: data
            })
    
        } catch (error) {
            console.dir(error)
        }

    }

}

const usersActions = {
    getUsers,
}


export default usersActions;