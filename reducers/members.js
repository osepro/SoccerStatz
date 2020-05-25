import { REGISTER } from "../constants";

function members(state = {}, action) {
	switch (action.type) {
		case REGISTER:
			return {
				...state,
				[action.username]: {
					id: action.id,
					username: action.username,
					password: action.password
				}
			}
		default:
			return state
	}
}
export default members;