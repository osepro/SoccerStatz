import { LOGIN, LOGOUT, ADD_GAME, DEL_PLAYER, HOME, ADD_PLAYER } from "../constants";

function login(state = {}, action) {
	switch (action.type) {
		case LOGIN:
			return Object.assign({}, state, {
				id: action.id,
			})
		case HOME:
			return Object.assign({}, state, {
				id: action.id,
				username: action.username,
				matches: action.matches,
				players: action.players,
			})
		case ADD_GAME:
			return {
				...state,
				matches: [...state.matches, action.gamedetails]
			}
		case ADD_PLAYER:
			const newPlayers = [...state.players, action.playersdetails];
			return {
				...state,
				players: newPlayers
			}
		case DEL_PLAYER: {
			const updatedPlayers = state.players.filter(player => player.id !== action.playerid)
			return {
				...state,
				players: updatedPlayers
			}
		}
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