import { combineReducers } from "redux";
import UserReducer from "./UserReducer";

const RootReducer=combineReducers({
    userred:UserReducer,
})

export default RootReducer;