import React, { Component } from "react"
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, Dimensions } from "react-native"
import { white, orange, green, lightPurp, black, gray, blue, lightgray, lightBlue, red, purple } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getGame } from "../utils/api";
import { connect } from "react-redux";
import { PieChart, StackedBarChart } from 'react-native-chart-kit';
import PlayerInfo from "./PlayerInfo";

class PlayerProfile extends Component {

	state = {
		players: []
	}

	setMainHeader = () => {
		const { playername } = this.props.route.params;
		const { navigation } = this.props;
		navigation.setOptions({
			title: playername
		});
	}

	componentDidMount() {
		const { login } = this.props;
		getGame().then(user => this.setState({ players: user[login.id].players }));
	}

	render() {
		this.setMainHeader();
		const { playername, playerid } = this.props.route.params;
		return (<PlayerInfo fullname={playername} playerid={playerid} />);

	}
}

function mapStateToProps({ login }) {
	return {
		login
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: white,
		flex: 1
	},
	row: {
		flex: 1,
		justifyContent: "center"
	},
	listItem: {
		padding: 10
	},
	touchview: {
		padding: 1,
	},
	list: {
		padding: 8,
	},
	profilepix: {
		flex: 0.5,
		flexDirection: "row",
		justifyContent: "center",
		padding: 12,
	},
	gamestats: {
		flex: 1,
		justifyContent: "center",
		padding: 12,
	},
	name: {
		flex: 1,
		justifyContent: "center",
		paddingLeft: 8
	},
	nameText: {
		fontSize: 24,
		fontWeight: "bold",
		color: black,
	},
	details: {
		color: gray,
		marginTop: 5,
	},
	statsdetails: {
		color: black,
		marginTop: 5,
		fontWeight: "bold",
	},
	jersey: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center"
	},
	jerseyText: {
		fontSize: 20,
		fontWeight: "bold",
		color: blue,
	},
	item: {
		flex: 1,
		backgroundColor: white,
		flexDirection: 'row',
		borderRadius: Platform.OS === "ios" ? 8 : 2,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 8,
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: "rgba(0, 0, 0, 0.24)",
		shadowOffset: {
			width: 0,
			height: 3
		}
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
})

export default connect(mapStateToProps)(PlayerProfile);