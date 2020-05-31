import { LOGIN, LOGOUT } from "../constants";

export function login(id, username) {
	return (dispatch) => {
		dispatch(
			{
				type: LOGIN,
				id: id,
				username: username,
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
			})
	}
};
