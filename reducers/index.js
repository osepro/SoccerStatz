import { combineReducers } from "redux";
import members from "./members";
import login from "./login";


export default combineReducers({
	members,
	login,
});