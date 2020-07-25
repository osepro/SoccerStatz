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

			let updatePlayer = {};

			if (player[0].position === 'Midfielder') {
				updatePlayer = {
					"assists": action.updatedDetails.assists,
					"dateofbirth": player[0].dateofbirth,
					"freekicks": action.updatedDetails.freekicks,
					"fullname": player[0].fullname,
					"goals": action.updatedDetails.goals,
					"height": player[0].height,
					"id": player[0].id,
					"jersey": player[0].jersey,
					"matchesplayes": action.updatedDetails.matchesplayes,
					"longpasses": action.updatedDetails.longpasses,
					"longpassescompleted": action.updatedDetails.longpassescompleted,
					"shortpasses": action.updatedDetails.shortpasses,
					"shortpassescompleted": action.updatedDetails.shortpassescompleted,
					"position": player[0].position,
					"shots": action.updatedDetails.shots,
					"weight": player[0].weight,
				}
			}

			if (player[0].position === 'Forward' || player[0].position === 'Winger') {
				updatePlayer = {
					"assists": action.updatedDetails.assists,
					"dateofbirth": player[0].dateofbirth,
					"fullname": player[0].fullname,
					"goals": action.updatedDetails.goals,
					"height": player[0].height,
					"id": player[0].id,
					"jersey": player[0].jersey,
					"matchesplayes": action.updatedDetails.matchesplayes,
					"position": player[0].position,
					"weight": player[0].weight,
					"passes": action.updatedDetails.passes,
					"passcompleted": action.updatedDetails.passcompleted,
					"shots": action.updatedDetails.shots,
					"shotontarget": action.updatedDetails.shotontarget,
					"dribbles": action.updatedDetails.dribbles,
					"dribblescompleted": action.updatedDetails.dribblescompleted,
				}
			}

			if (player[0].position === 'Defender') {
				updatePlayer = {
					"fullname": player[0].fullname,
					"height": player[0].height,
					"id": player[0].id,
					"jersey": player[0].jersey,
					"dateofbirth": player[0].dateofbirth,
					"position": player[0].position,
					"weight": player[0].weight,
					"matchesplayes": action.updatedDetails.matchesplayes,
					"goals": action.updatedDetails.goals,
					"assists": action.updatedDetails.assists,
					"tackles": action.updatedDetails.tackles,
					"tackleswon": action.updatedDetails.tackleswon,
					"pressure": action.updatedDetails.pressure,
					"blocks": action.updatedDetails.blocks,
					"cleareance": action.updatedDetails.cleareance,
				}
			}

			if (player[0].position === 'Keeper') {
				updatePlayer = {
					"fullname": player[0].fullname,
					"height": player[0].height,
					"id": player[0].id,
					"jersey": player[0].jersey,
					"dateofbirth": player[0].dateofbirth,
					"position": player[0].position,
					"weight": player[0].weight,
					"matchesplayes": action.updatedDetails.matchesplayes,
					"goalagainst": action.updatedDetails.goalagainst,
					"shotagainst": action.updatedDetails.shotagainst,
					"savesmade": action.updatedDetails.savesmade,
				}
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