import { ADD_GAME } from "../constants";

function addgame(state = {}, action) {
	switch (action.type) {
		case ADD_GAME:
		//console.log(state);
		//console.log(action.gamedetails);
		/*return {
			...state,
			matches: [...state.matches, action.gamedetails]
		}*/
		default:
			return state
	}
}
export default addgame;