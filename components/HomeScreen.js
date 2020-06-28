import React, { Component, Fragment } from "react"
import { View, Text, KeyboardAvoidingView, StyleSheet, Button, TouchableOpacity, StatusBar } from "react-native"
import { connect } from "react-redux";
import { white, orange, lightgray, green, black, gray, blue, red, lightBlue } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Agenda } from 'react-native-calendars';
import { logout, home } from "../actions/login";
import UserName from "./UserName";
import Moment from 'moment';

class HomeScreen extends Component {
	render() {
		Moment.locale('en');
		const { navigation, login } = this.props;

		console.log(login.matches);

		const gameDetails = login.matches.map(details => {
			const dateData = Moment(details.gamedate).format('YYYY-MM-DD')
			const team = details.team;
			const opponent = details.opponent;
			const venue = details.venue;
			const gameData = { [dateData]: [{ name: `${opponent} - ${team}`, venue: venue, gamedate: dateData }] }
			return gameData;
		})



		let itemDetails = {};

		for (let i = 0; i < gameDetails.length; i++) {
			itemDetails = { ...itemDetails, ...gameDetails[i] }
		}

		console.log(itemDetails);

		return (
			<View behavior="padding" style={styles.container}>
				<View style={styles.statusBar}>
					<StatusBar barStyle="light-content" />
					<View style={styles.homeContainer}>
						<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
							<FontAwesome name='navicon' size={30} color={gray} />
						</TouchableOpacity>
					</View>
					<Text style={styles.homeTitle}>SoccerStaz <FontAwesome name='soccer-ball-o' size={15} color={gray} /></Text>
					<Text style={styles.initTxt}><UserName /></Text>
				</View>
				<View style={styles.row}>
					<Agenda
						items={itemDetails}
						onDayPress={(day) => { console.log('day pressed', day) }}
						selected={new Date()}
						markedDates={{
							'2020-06-01': { marked: true },
							'2020-06-14': { marked: true },
							'2020-06-15': { marked: true }
						}}
						renderItem={(item, firstItemInDay) => { return (<View style={styles.item}>{Object.values(item).map((items, i) => <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: "center" }} key={i}><Ionicons name='ios-football' size={20} color={lightBlue} style={styles.soccerball} /><Text style={styles.gameavailable}>{items}</Text><Ionicons name='ios-football' size={20} color={lightBlue} style={styles.soccerball} /></View>)}</View>); }}
						renderDay={(day, item) => { return (<View />) }}
						renderKnob={() => { return (<View />); }}
						renderEmptyData={() => { return (<View style={styles.item}><Text style={styles.noGame}><Ionicons name='ios-football' size={20} color={lightBlue} style={styles.soccerball} /> No game today</Text></View>); }}
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
		color: orange,
	},
	homeContainer: {
		flexWrap: "wrap",
		justifyContent: "flex-start",
		width: '10%'
	},
	homeTitle: {
		fontSize: 25,
		color: orange,
		textAlign: "center",
		width: '70%'
	},
	initTxt: {
		backgroundColor: lightBlue,
		color: white,
		fontWeight: "bold",
		borderRadius: 15,
		padding: 10,
	},
	item: {
		backgroundColor: white,
		borderRadius: Platform.OS === "ios" ? 5 : 2,
		padding: 20,
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
		}
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