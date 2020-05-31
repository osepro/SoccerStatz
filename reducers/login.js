import { LOGIN, LOGOUT } from "../constants";

function login(state = {}, action) {
	switch (action.type) {
		case LOGIN:
			return Object.assign({}, state, {
				id: action.id,
				username: action.username,
			})
		case LOGOUT:
			return {
				id: action.id,
				username: action.username,
			}
		default:
			return state
	}
}
export default login;