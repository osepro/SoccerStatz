import { LOGIN } from "../constants";

export function login(username) {
	return (dispatch) => {
		dispatch(
			{
				type: LOGIN,
				username
			})
	}
};
