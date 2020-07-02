import React, { Component } from "react"
import { View, Text, StyleSheet, StatusBar, ImageBackground, Modal, TouchableOpacity, Alert } from "react-native"
import { white, orange, green, black, gray, blue, lightgray, lightBlue } from "../utils/colors";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import DragPlayers from "./DragPlayers";


const image = '../assets/pitch.png';
const player = '../assets/jersey.png';

class LineUp extends Component {

	state = {
		players: [],
	}

	render() {
		let midfielders = [];
		let forwards = [];
		let keepers = [];
		let defenders = [];
		let wingers = [];
		const { login } = this.props;

		login.players.map(player => {
			switch (player.position) {
				case 'Midfielder':
					midfielders = [...midfielders, { name: player.fullname, no: player.jersey }];
					break;
				case 'Forward':
					forwards = [...forwards, { name: player.fullname, no: player.jersey }];
					break;
				case 'Defender':
					defenders = [...defenders, { name: player.fullname, no: player.jersey }];
					break;
				case 'Keeper':
					keepers = [...keepers, { name: player.fullname, no: player.jersey }];
				case 'Winger':
					wingers = [...wingers, { name: player.fullname, no: player.jersey }];
					break;
				default:
					console.log('No data found');
			}
		});
		return (
			<View style={styles.container}>
				<View style={styles.statusBar}>
					<StatusBar barStyle="light-content" />
					<Text style={styles.homeTitle}>SoccerStaz <FontAwesome name='soccer-ball-o' size={15} color={gray} /></Text>
				</View>

				<View style={styles.row}>
					<ImageBackground source={require(image)} style={styles.image}>
					</ImageBackground>
				</View>
				<View style={styles.lineup}>
					<View style={styles.lineupplayers}>
						<Text style={styles.playerHeader}>Keepers</Text>
						{
							keepers.map((goalkeeper, i) => (
								<DragPlayers key={i} no={goalkeeper.no} name={goalkeeper.name} />
							))
						}
					</View>
					<View style={styles.lineupplayers}>
						<Text style={styles.playerHeader}>Defenders</Text>
						{
							defenders.map((defender, i) => (
								<DragPlayers key={i} no={defender.no} name={defender.name} />
							))
						}
					</View>
					<View style={styles.lineupplayers}>
						<Text style={styles.playerHeader}>Midfielders</Text>
						{
							midfielders.map((midfielder, i) => (

								<DragPlayers key={i} no={midfielder.no} name={midfielder.name} />
							))
						}
					</View>
					<View style={styles.lineupplayers}>
						<Text style={styles.playerHeader}>Winger</Text>
						{
							wingers.map((winger, i) => (
								<DragPlayers key={i} no={winger.no} name={winger.name} />
							))
						}
					</View>
					<View style={styles.lineupplayers}>
						<Text style={styles.playerHeader}>Forward</Text>
						{
							forwards.map((forward, i) => (
								<DragPlayers key={i} no={forward.no} name={forward.name} />

							))
						}
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: white,
		flex: 1
	},
	animated: {
		width: "100%",
	},
	row: {
		flex: 1,
		marginTop: 10,
	},
	lineup: {
		flex: 0.5,
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 8,
	},
	image: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
		resizeMode: "cover",
		backgroundColor: green
	},
	lineupplayers: {

	},
	pitchItems: {
		justifyContent: "flex-end",
		width: 60,
		height: 60
	},
	player: {
		padding: 10,
		marginRight: 10,
	},
	playerHeader: {
		fontWeight: "bold",
	},
	statusBar: {
		flexDirection: "row",
		backgroundColor: white,
		paddingLeft: 20,
		borderBottomColor: lightgray,
		borderBottomWidth: 1,
		paddingTop: 40,
		paddingBottom: 20,
		justifyContent: "center"
	},
	homeTitle: {
		fontSize: 25,
		color: orange,
		textAlign: "center",
		width: '70%'
	},
	playernumber: {
		color: black,
		fontWeight: "bold",
		textAlign: "center"
	},
	formText: {
		fontSize: 20,
		color: gray,
		marginTop: 15
	},
	dateSeleted: {
		color: gray
	},
	btn: {
		backgroundColor: lightBlue,
		padding: 15,
		paddingLeft: 80,
		paddingRight: 80,
		borderRadius: 5,
		marginTop: 20,
		marginBottom: 30,
	},
	btnText: {
		color: "#FFFFFF",
		fontSize: 18,
		textAlign: "center"
	},
	homeContainer: {
		flexWrap: "wrap",
		justifyContent: "flex-start",
		width: '10%'
	},
	textLabel: {
		fontSize: 15,
		color: gray,
		marginTop: 20,
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
	input: {
		height: 44,
		padding: 8,
		borderWidth: 1,
		borderColor: "#757575",
		marginTop: 20,
		justifyContent: "center",
		borderRadius: 5
	},
	btnView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20
	},
})

function mapStateToProps({ login }) {
	return {
		login
	}
}
export default connect(mapStateToProps)(LineUp);