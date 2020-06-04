import React, { Component } from "react"
import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native"
import { white, orange, green, black, gray, blue, lightgray, lightBlue } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getGame } from "../utils/api";
import { connect } from "react-redux";
import { Base64 } from 'js-base64';
import Moment from 'moment';

const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'James Dune',
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Avil Larry',
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Steven Cov',
	},

];

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
		console.log(login.id)
	}

	render() {
		Moment.locale('en');
		const { players } = this.state;
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					data={players}
					renderItem={({ player }) => <Item title={player.fullname} />}
					keyExtractor={player => player.fullname}
				/>
			</SafeAreaView>
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
		padding: 40,
		borderBottomColor: black,
		borderWidth: 3
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