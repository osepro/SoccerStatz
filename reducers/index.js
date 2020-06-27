import { combineReducers } from "redux";
import members from "./members";
import login from "./login"
import addgame from "./addgame"


export default combineReducers({
	members,
	login,
	addgame,
});