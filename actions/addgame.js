import { ADD_GAME } from "../constants";

export function addgame(gamedetails) {
	return (dispatch) => {
		dispatch({ type: ADD_GAME, gamedetails })
	}
};