import React, { Component } from "react"
import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList } from "react-native";
import { white, orange, green, black, gray, blue, lightgray, lightBlue, red } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";

class PlayerList extends Component {
	render() {
		const { navigation, login } = this.props;
		return (
			<View style={styles.container}>
				<FlatList
					data={login.players}
					renderItem={({ item }) => <TouchableOpacity style={styles.touchview} onPress={() => navigation.navigate('PlayerProfile', { playerid: item.id, playername: item.fullname })}>
						<View style={styles.item}>
							<View style={styles.profilepix}>
								<FontAwesome name='user-o' size={30} color={red} />
							</View>
							<View style={styles.name}>
								<Text style={styles.nameText}> {item.fullname}</Text>
								<Text style={styles.positionText}> {item.position}</Text>
							</View>
							<View style={styles.jersey}>
								<Text style={styles.jerseyText}>{item.jersey}</Text>
							</View>
						</View>
					</TouchableOpacity>}
					keyExtractor={item => "" + item.id}
				/>
			</View>

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
		marginTop: 15,
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

export default connect(mapStateToProps)(PlayerList);
