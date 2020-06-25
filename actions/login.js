import { LOGIN, LOGOUT } from "../constants";
import { getGame } from "../utils/api";

export function login(id) {
	return (dispatch) => {
		return getGame()
			.then((gamedetails) => {
				dispatch(
					{
						type: LOGIN,
						id: id,
						username: gamedetails[id].name,
						matches: gamedetails[id].matches,
						players: gamedetails[id].players,
					})
			})
	}
};

export function logout() {
	return (dispatch) => {
		dispatch(
			{
				type: LOGOUT,
				id: '',
				username: '',
				matches: '',
				players: '',
			})
	}
};
