import React, { Component } from "react"
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native"
import { white, orange, green, black, gray, blue, lightgray, lightBlue } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getGame } from "../utils/api";
import { connect } from "react-redux";
import { Base64 } from 'js-base64';
import Moment from 'moment';

const rows = [
	{ id: 0, text: 'View' },
	{ id: 1, text: 'Text' },
	{ id: 2, text: 'Image' },
	{ id: 3, text: 'ScrollView' },
	{ id: 4, text: 'ListView' },
]

const extractKey = ({ id }) => id

function Item({ player }) {
	return (
		<View style={styles.list}>
			<Text style={styles.listItem}>{player}</Text>
		</View>
	);
}

class ViewPlayer extends Component {

	state = {
		players: []
	}

	componentDidMount() {
		const { login } = this.props;
		getGame().then(user => this.setState({ players: user[login.id].players }));
	}

	render() {
		Moment.locale('en');
		const { players } = this.state;
		return (
			<ScrollView style={styles.container}>
				{
					players.map((item, i) => (
						<View key={i} style={styles.list}>
							<Text>{item.fullname}</Text>
						</View>
					))
				}
			</ScrollView>
		)
	}
}

function mapStateToProps({ login }) {
	return {
		login
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
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
	list: {
		padding: 8,
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

export default connect(mapStateToProps)(ViewPlayer);