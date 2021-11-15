import { applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";


const combinedReducer = combineReducers({
    notification: notificationReducer,
    anecdotes: anecdoteReducer,
    filter: filterReducer
})

const store = createStore(combinedReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

export default store;
