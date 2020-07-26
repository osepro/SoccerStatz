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
				"gameid": 1233,
				"notes": [],
			},
		],
		"name": "Elise",
		"password": "ZWxpc2U=",
		"players": [
			{
				"id": 12345678,
				"fullname": "James",
				"height": "5’11",
				"jersey": 10,
				"position": "Midfielder",
				"weight": 190,
				"dateofbirth": "2020-06-28",
				"matchesplayes": 0,
				"goals": 0,
				"assists": 0,
				"passes": 0,
				"shots": 0,
				"freekicks": 0,
				"shortpasses": 0,
				"shortpassescompleted": 0,
				"longpasses": 0,
				"longpassescompleted": 0,
			},
		],
	},
	"67ks97l198pvh2n0srpwl119": {
		"id": "67ks97l198pvh2n0srpwl119",
		"matches": [
			{
				"gamedate": "2020-07-23T04:15:40.611Z",
				"opponent": "Team B",
				"team": "Team A",
				"venue": "Team A groud",
				"matchfield": "Home",
				"gameid": 1235,
				"notes": [],
			},
		],
		"name": "Ose",
		"password": "ZWxpc2U=",
		"players": [
			{
				"id": 12345658,
				"fullname": "Ose Agbadu",
				"height": "5’11",
				"jersey": 9,
				"position": "Forward",
				"weight": 190,
				"dateofbirth": "2020-06-26",
				"matchesplayes": 0,
				"goals": 0,
				"assists": 0,
				"passes": 0,
				"passcompleted": 0,
				"shots": 0,
				"shotontarget": 0,
				"dribbles": 0,
				"dribblescompleted": 0,
			},
		],
	},
	"67ks97l198pvh2n0srpwl129": {
		"id": "67ks97l198pvh2n0srpwl129",
		"matches": [
			{
				"gamedate": "2020-07-22T04:15:40.611Z",
				"opponent": "Team B",
				"team": "Team A",
				"venue": "Team A groud",
				"matchfield": "Home",
				"gameid": 1238,
				"notes": [],
			},
		],
		"name": "Lanre",
		"password": "ZWxpc2U=",
		"players": [
			{
				"id": 12345654,
				"fullname": "Victor",
				"height": "5’11",
				"jersey": 9,
				"position": "Winger",
				"weight": 190,
				"dateofbirth": "2020-06-26",
				"matchesplayes": 0,
				"goals": 0,
				"assists": 0,
				"passes": 0,
				"passcompleted": 0,
				"shots": 0,
				"shotontarget": 0,
				"dribbles": 0,
				"dribblescompleted": 0,
			},
		],
	},
	"67ks97l198pvh2n0srpwl125": {
		"id": "67ks97l198pvh2n0srpwl125",
		"matches": [
			{
				"gamedate": "2020-07-25T04:15:40.611Z",
				"opponent": "Team B",
				"team": "Team A",
				"venue": "Team A groud",
				"matchfield": "Home",
				"gameid": 1231,
				"notes": [],
			},
		],
		"name": "Veronica",
		"password": "ZWxpc2U=",
		"players": [
			{
				"id": 12345653,
				"fullname": "Sergio Ramos",
				"height": "6’3",
				"jersey": 9,
				"position": "Defender",
				"weight": 190,
				"dateofbirth": "2020-06-26",
				"matchesplayes": 0,
				"goals": 0,
				"assists": 0,
				"tackles": 0,
				"tackleswon": 0,
				"pressure": 0,
				"blocks": 0,
				"cleareance": 0,
			},
		],
	},
	"67ks97l198pvh2n0srpwl124": {
		"id": "67ks97l198pvh2n0srpwl124",
		"matches": [
			{
				"gamedate": "2020-07-26T04:15:40.611Z",
				"opponent": "Team B",
				"team": "Team A",
				"venue": "Team A groud",
				"matchfield": "Home",
				"gameid": 1230,
				"notes": [],
			},
		],
		"name": "Jide",
		"password": "ZWxpc2U=",
		"players": [
			{
				"id": 12345653,
				"fullname": "Degea",
				"height": "6’5",
				"jersey": 10,
				"position": "Keeper",
				"weight": 190,
				"dateofbirth": "2020-06-26",
				"matchesplayes": 0,
				"goals": 0,
				"goalagainst": 0,
				"shotagainst": 0,
				"savesmade": 0,
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