import { AsyncStorage } from "react-native";
import { FLASHCARD_STORAGE_KEY } from "./helpers"

export function retrieveDecks() {
	return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(results => {
		const data = JSON.parse(results);
		return data;
	});
};

export function saveDeck(deck) {
	return AsyncStorage.mergeItem(
		FLASHCARD_STORAGE_KEY,
		JSON.stringify({ [deck.id]: deck })
	);
};

export function deleteDeck(deckId) {
	return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(results => {
		const mobileDecks_Json = JSON.parse(results);
		delete mobileDecks_Json[deckId];
		AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(mobileDecks_Json));
	});
}

export function saveCard(deckId, card) {
	return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(results => {
		const data = JSON.parse(results);
		data[deckId] = {
			...data[deckId],
			cards: [
				...data[deckId].cards,
				{ question: card.question, answer: card.answer }
			]
		};
		AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
	});
};
