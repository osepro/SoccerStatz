import React, { Component } from "react"
import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList } from "react-native"
import { white, orange, green, black, gray, blue, lightgray, lightBlue, red } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getGame } from "../utils/api";
import { connect } from "react-redux";
import { Base64 } from 'js-base64';
import Moment from 'moment';
import { TouchableOpacity } from "react-native-gesture-handler";

function PlayerList(props) {
	return (
		<ScrollView style={styles.container}>
			{
				props.players.map((item, i) => (
					<TouchableOpacity key={i} style={styles.touchview}>
						<View style={styles.item}>
							<View style={styles.profilepix}>
								<FontAwesome name='user-secret' size={30} color={red} />
							</View>
							<View style={styles.name}>
								<Text style={styles.nameText}> {item.fullname}</Text>
								<Text style={styles.positionText}> {item.position}</Text>
							</View>
							<View style={styles.jersey}>
								<Text style={styles.jerseyText}>{item.jersey}</Text>
							</View>
						</View>
					</TouchableOpacity>
				)
				)
			}
		</ScrollView>
	)
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

		if (!players) {
			return (<View style={styles.container}><Text style={styles.nameText}> 👎 No players currently added. Please add players </Text></View>)
		}

		if (Object.keys(players).length > 0 && players !== undefined) {
			const newPlayersList = players.filter(Boolean);
			return <PlayerList players={newPlayersList} />;
		}

		return (<View />)

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
		flex: 0.4,
		flexDirection: "row",
		justifyContent: "center",
		padding: 12,
		borderRadius: 42,
		backgroundColor: lightgray,
	},
	name: {
		flex: 2,
		justifyContent: "center",
		paddingLeft: 8
	},
	nameText: {
		fontSize: 14,
		fontWeight: "bold",
		color: black,
	},
	positionText: {
		color: gray,
		marginTop: 5,
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

export default connect(mapStateToProps)(ViewPlayer);