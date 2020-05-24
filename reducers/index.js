import { LOGIN } from "../constants";

function statzactivities(state = {}, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				...action.decks
			}
		default:
			return state
	}
}
export default statzactivities;