import { LOGIN, LOGOUT, ADD_GAME, DEL_PLAYER, HOME, ADD_PLAYER, UPDATE_PLAYER_STATS } from "../constants";

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
		case UPDATE_PLAYER_STATS:
			const player = state.players.filter(player => player.id === action.playerid);
			const newPlayer = state.players.filter(player => player.id !== action.playerid);
			const updatePlayer = {
				"assists": action.updatedDetails.assists,
				"dateofbirth": player[0].dateofbirth,
				"freekicks": action.updatedDetails.freekicks,
				"fullname": player[0].fullname,
				"goals": action.updatedDetails.goals,
				"height": player[0].height,
				"id": player[0].id,
				"jersey": player[0].jersey,
				"matchesplayes": action.updatedDetails.matchesplayes,
				"passes": action.updatedDetails.passes,
				"position": player[0].position,
				"shots": action.updatedDetails.shots,
				"weight": player[0].weight,

			}
			const newPlayerUpdate = [...newPlayer, updatePlayer];
			return {
				...state,
				players: newPlayerUpdate
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