import { REGISTER } from "../constants";

export function addUser(id, username, password) {
	return (dispatch) => {
		dispatch(
			{
				type: REGISTER,
				id,
				username,
				password
			}
		)
	}
}