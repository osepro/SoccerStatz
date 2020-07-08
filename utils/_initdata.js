import { AsyncStorage } from 'react-native'
import { SOCCERSTAZ_STORAGE_KEY } from "./helpers"

let initData = {
	"67ks97l198pvh2n0srpwl109": {
		"id": "67ks97l198pvh2n0srpwl109",
		"matches": [
			{
				"gamedate": "2020-06-08T04:15:40.611Z",
				"opponent": "Team B",
				"team": "Team A",
				"venue": "Team A groud",
				"matchfield": "Home",
			},
		],
		"name": "Elise",
		"password": "ZWxpc2U=",
		"players": [
			{
				"id": 12345678,
				"fullname": "James",
				"height": "5’11",
				"jersey": "10",
				"position": "Midfielder",
				"weight": 190,
				"dateofbirth": "2020-06-28",
				"matchesplayes": 0,
				"goals": 0,
				"assists": 0,
				"passes": 0,
				"shots": 0,
				"freekicks": 0,
			},
		],
	},
}

function setInitData() {
	AsyncStorage.setItem(SOCCERSTAZ_STORAGE_KEY, JSON.stringify(initData))
	return initData;
}

export function initSetUp(data) {
	return data === null ? setInitData() : JSON.parse(data)
}