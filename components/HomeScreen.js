import React, { Component, Fragment } from "react"
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, Alert } from "react-native"
import { connect } from "react-redux";
import { white, orange, lightgray, green, black, gray, blue, red, lightBlue, semilightgray } from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Agenda } from "react-native-calendars";
import { addGameNote } from "../utils/api";
import { addgamenote } from "../actions/login";
import MainStatusBar from "./StatusBar";
import Moment from "moment";

const colorrDay = [white, orange, lightgray, green, black, gray, blue, red, lightBlue];

class HomeScreen extends Component {
	state = {
		show: false,
		gamenote: '',
		opennote: '',
	}

	setGameNote = (input, note) => {
		this.setState({
			[note]: input
		})
	}


	handlAddNote(gameid, gamenote) {
		const { login, dispatch } = this.props;
		if (gamenote.length > 0) {
			addGameNote(login.id, gameid, gamenote).then(game => {
				if (game) {
					this.setState({ gamenote: '' })
				}
			});
			dispatch(addgamenote(login.id, gameid, gamenote));
		}
		else {
			alert('👎 notes cannot be empty');
		}

	}

	addNote(gameid, gamedate) {
		const { login } = this.props;
		const notes = login.matches.filter(note => note.gameid === gameid);
		const getDate = Moment(new Date()).format("YYYY-MM-DD");
		return (
			<View style={styles.itemAddView}>

				{getDate <= gamedate ? (
					<View>
						<Text style={styles.gameavailable}>Add Game Note(s)</Text>

						<TextInput style={styles.input} onChangeText={(text) => this.setGameNote(text, "gamenote")} value={this.state.gamenote} placeholder="Add Note" />
						<TouchableOpacity onPress={() => this.handlAddNote(gameid, this.state.gamenote)} style={styles.addnotebtn}><Text style={styles.addtxt}>Add</Text></TouchableOpacity>
					</View>) : (<View><Text style={styles.gameavailable}>Game Note(s)</Text></View>)}
				{notes[0].notes.length > 0 && notes[0].notes.map((note, i) => (<View key={i} style={styles.noteTaken}>
					<Text style={styles.gamenotetaken}>{note}</Text>
				</View>))}

				{notes[0].notes.length === 0 && getDate > gamedate ? (
					<View>
						<Text style={styles.gamenotetaken}>No Game Note</Text>
					</View>) : <View />}
			</View>
		)
	}
	showAddNote(gameid) {
		this.setState((prevState) => ({ show: !prevState.show, opennote: gameid }))
	}

	renderItem(item) {
		return (
			<View style={styles.item}>
				<TouchableOpacity onPress={() => this.showAddNote(item.gameid)}>
					<View style={styles.itemDay}><Text style={styles.itemMonthText}>{Moment(item.gamedate).format("MMM")}</Text><Text style={styles.itemDayText}>{Moment(item.gamedate).format("DD")}</Text></View>
					<View style={styles.itemDisplay}>
						<View style={{ flexDirection: "row" }}><Ionicons name="ios-football" size={20} color={lightBlue} style={styles.soccerball} /><Text style={styles.gameavailable}>{item.name}</Text><Ionicons name='ios-football' size={20} color={lightBlue} style={styles.soccerball} /></View>
						<Text style={styles.gamevenue}>{item.venue}</Text>
						<Text style={styles.gamevenue}>{item.gametime}</Text>
						<Text style={styles.gamevenue}>{item.matchfield}</Text>
					</View>
					{this.state.opennote === item.gameid && this.state.show && this.addNote(item.gameid, item.gamedate)}
				</TouchableOpacity>
			</View>
		);
	}

	render() {
		const { navigation, login } = this.props;

		const gameDetails = login.matches.map(details => {
			const dateData = Moment(details.gamedate).format("YYYY-MM-DD");
			const dateTimeData = Moment(details.gamedate).format("hh:mm:ss A");
			const team = details.team;
			const opponent = details.opponent;
			const venue = details.venue;
			const matchfield = details.matchfield;
			const gameid = details.gameid;
			const gameData = { [dateData]: [{ name: `${opponent} - ${team}`, venue: venue, gamedate: dateData, gametime: dateTimeData, matchfield: matchfield, gameid: gameid }] }
			return gameData;
		})



		let itemDetails = {};

		for (let i = 0; i < gameDetails.length; i++) {
			itemDetails = { ...itemDetails, ...gameDetails[i] }
		}

		return (
			<View behavior="padding" style={styles.container}>
				<MainStatusBar navigation={navigation} />
				<View style={styles.row}>
					<Agenda
						items={itemDetails}
						onDayPress={(day) => { return (<View />); }}
						selected={new Date()}
						renderItem={this.renderItem.bind(this)}
						renderDay={(day, item) => { return (<View />) }}
						renderKnob={() => { return (<View />); }}
						renderEmptyData={() => { return (<View style={styles.itemNoGame}><Text style={styles.noGame}><Ionicons name='ios-football' size={20} color={gray} style={styles.soccerball} /> No upcoming games</Text></View>); }}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({ login }) => {
	return {
		login,
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: white,
		flex: 1
	},
	statusBar: {
		flexDirection: "row",
		backgroundColor: white,
		paddingLeft: 20,
		borderBottomColor: lightgray,
		borderBottomWidth: 1,
		paddingTop: 40,
		paddingBottom: 20,
	},
	gameavailable: {
		fontWeight: "bold",
		color: gray,
		fontSize: 18,
		justifyContent: "center",
		alignSelf: "center"
	},
	gamevenue: {
		fontWeight: "bold",
		color: semilightgray,
		fontSize: 14,
		justifyContent: "center",
		alignSelf: "center"
	},
	soccerball: {
		fontSize: 25,
		padding: 10,
	},
	row: {
		flex: 1,
	},
	titletext: {
		fontSize: 35,
		justifyContent: "center",
		textAlign: "center",
		color: orange
	},
	noGame: {
		fontWeight: "bold",
		color: semilightgray,
		fontSize: 24,
		justifyContent: "center",
		alignSelf: "center"
	},
	homeContainer: {
		flexWrap: "wrap",
		justifyContent: "flex-start",
		width: '10%'
	},
	itemDisplay: {
		flexDirection: "column",
		flexWrap: "wrap",
		alignSelf: "center",
		justifyContent: "flex-end",
		paddingBottom: 40
	},
	itemDay: {
		alignSelf: "flex-end",
		justifyContent: "flex-end",
		alignItems: "center",
		backgroundColor: orange,
		padding: 5,
	},
	itemMonthText: {
		color: white,
		fontWeight: "bold",
		fontSize: 12,
	},
	itemDayText: {
		color: white,
		fontWeight: "bold",
		fontSize: 18,
	},
	item: {
		backgroundColor: white,
		borderRadius: Platform.OS === "ios" ? 5 : 2,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		justifyContent: "center",
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: "rgba(0, 0, 0, 0.24)",
		shadowOffset: {
			width: 0,
			height: 3
		},
	},
	itemAddView: {
		flex: 1,
		backgroundColor: white,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		justifyContent: "center",
		alignContent: "center",
	},
	noteTaken: {
		padding: 8,
		borderStyle: "dotted",
		borderWidth: 2,
		borderColor: lightgray,
		marginBottom: 10,
	},
	gamenotetaken: {
		color: gray,
		fontSize: 14,
	},
	addtxt: {
		color: white,
		textAlign: "center",
		fontWeight: "bold",
	},
	addnotebtn: {
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: lightBlue,
		marginTop: 10,
		marginBottom: 10,
		borderRadius: Platform.OS === "ios" ? 5 : 2,
	},
	itemNoGame: {
		backgroundColor: white,
		borderRadius: Platform.OS === "ios" ? 5 : 2,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		justifyContent: "center",
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: "rgba(0, 0, 0, 0.24)",
		shadowOffset: {
			width: 0,
			height: 3
		},
		padding: 20,
	},
	input: {
		height: 44,
		padding: 8,
		borderWidth: 1,
		borderColor: "#999999",
		marginTop: 20,
		justifyContent: "center",
		borderRadius: 5
	},
	register: {
		alignItems: "center"
	},
	registerText: {
		color: gray,
		fontSize: 12,
	},
	fillbelow: {
		color: "#FF0000",
		fontSize: 12
	},
	imageHolder: {
		flex: 1,
		borderRadius: 30,
		borderColor: "#FFFFFF",
		borderWidth: 20,

	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	},
})

export default connect(mapStateToProps)(HomeScreen)