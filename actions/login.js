import { LOGIN } from "../constants";
import { retrieveDecks } from "../utils/api";

export function login() {
	return (dispatch) => {
		return retrieveDecks()
			.then((decks) => {
				dispatch(
					{
						type: LOGIN,
						login
					}
				)
			})
	}
};
