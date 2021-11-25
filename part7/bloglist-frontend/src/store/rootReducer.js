import { combineReducers } from "redux";
import blogsReducer from "./blogs/reducers/blogsReducer";
import notificationReducer from "./notification/reducers/notificationReducer";
import credentialsReducer from "./credentials/reducers/credentialsReducer";
import usersReducer from "./users/reducers/usersReducer";

const rootReducer = combineReducers({
    blogs: blogsReducer,
    notification: notificationReducer,
    credentials: credentialsReducer,
    users: usersReducer
});

export default rootReducer;
