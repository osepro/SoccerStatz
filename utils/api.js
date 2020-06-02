import { AsyncStorage } from "react-native";
import { SOCCERSTAZ_STORAGE_KEY } from "./helpers"
import _ from 'lodash';

export function getGame() {
	return AsyncStorage.getItem(SOCCERSTAZ_STORAGE_KEY).then(results => {
		const data = JSON.parse(results);
		return data;
	});
};

export function saveUser(user) {
	return AsyncStorage.getItem(SOCCERSTAZ_STORAGE_KEY).then(users => {
		const usernames = Object.values(JSON.parse(users));
		const username = _.filter(usernames, { name: user.name })
		if (username.length > 0) {
			return false;
		}
		else {
			AsyncStorage.mergeItem(SOCCERSTAZ_STORAGE_KEY, JSON.stringify({ [user.id]: user }));
			return true;
		}

	});
};

export function savePlayer(userid, player) {
	return AsyncStorage.getItem(SOCCERSTAZ_STORAGE_KEY).then(users => {
		const user = JSON.parse(users);
		user[userid] = {
			...user[userid],
			players: [...user[userid].players,
			{
				fullname: player.fullname,
				position: player.position,
				jersey: player.jersey,
				height: player.height,
				weight: player.weight,
				dateofbirth: player.date,
			}
			]
		};
		if (AsyncStorage.setItem(SOCCERSTAZ_STORAGE_KEY, JSON.stringify(user))) return true;
		else return false
	});
};

export function addGame(userid, game) {
	return AsyncStorage.getItem(SOCCERSTAZ_STORAGE_KEY).then(users => {
		const user = JSON.parse(users);
		user[userid] = {
			...user[userid],
			matches: [...user[userid].matches,
			{
				gamedate: game.gamedate,
				team: game.team,
				opponent: game.opponent,
				venue: game.venue
			}
			]
		};
		if (AsyncStorage.setItem(SOCCERSTAZ_STORAGE_KEY, JSON.stringify(user))) return true;
		else return false
	});
}

export function getUser(username, password) {
	return AsyncStorage.getItem(SOCCERSTAZ_STORAGE_KEY).then(users => {
		const usernames = Object.values(JSON.parse(users));
		const userdetail = _.filter(usernames, { name: username, password });
		if (userdetail.length === 1) {
			return userdetail;
		}
		return false;
	});
}

export function deleteDeck(deckId) {
	return AsyncStorage.getItem(SOCCERSTAZ_STORAGE_KEY).then(results => {
		const mobileDecks_Json = JSON.parse(results);
		delete mobileDecks_Json[deckId];
		AsyncStorage.setItem(SOCCERSTAZ_STORAGE_KEY, JSON.stringify(mobileDecks_Json));
	});
}

export function saveCard(deckId, card) {
	return AsyncStorage.getItem(SOCCERSTAZ_STORAGE_KEY).then(results => {
		const data = JSON.parse(results);
		data[deckId] = {
			...data[deckId],
			cards: [
				...data[deckId].cards,
				{ question: card.question, answer: card.answer }
			]
		};
		AsyncStorage.setItem(SOCCERSTAZ_STORAGE_KEY, JSON.stringify(data));
	});
};
