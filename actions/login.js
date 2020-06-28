import { LOGIN, LOGOUT, ADD_GAME, DEL_PLAYER, HOME, ADD_PLAYER } from "../constants";
import { getGame, deletePlayer } from "../utils/api";
import { exp } from "react-native-reanimated";

export function login(id) {
	return (dispatch) => {
		dispatch({ type: LOGIN, id })
	}
}

export function home(id) {
	return (dispatch) => {
		return getGame()
			.then((gamedetails) => {
				dispatch(
					{
						type: HOME,
						id: id,
						username: gamedetails[id].name,
						matches: gamedetails[id].matches,
						players: gamedetails[id].players,
					})
			})
	}
};

export function addgame(gamedetails) {
	return (dispatch) => {
		dispatch({ type: ADD_GAME, gamedetails })
	}
};

export function addplayer(playersdetails) {
	return (dispatch) => {
		dispatch({ type: ADD_PLAYER, playersdetails })
	}
}

export function deleteuserplayer(playerid) {
	return (dispatch) => {
		dispatch(
			{
				type: DEL_PLAYER,
				playerid
			}
		)
	}
}

export function logout() {
	return (dispatch) => {
		dispatch(
			{
				type: LOGOUT,
				id: '',
			})
	}
};
