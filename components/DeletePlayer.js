import React, { Component } from "react"
import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native"
import { white, orange, green, black, gray, blue, lightgray, lightBlue } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { addGame, getGame } from "../utils/api";
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

function Item({ title }) {
	return (
		<View style={styles.item}>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
}

class DeletePlayer extends Component {
	state = {
		gamelocation: '',
		date: new Date(),
		mode: 'date',
		show: false,
		yourteam: '',
		opponent: '',
		venue: '',
	}

	render() {
		const { yourteam, opponent, venue, show, date } = this.state;
		Moment.locale('en');
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					data={DATA}
					renderItem={({ item }) => <Item title={item.title} style={styles.list} />}
					keyExtractor={item => item.id}
					style={styles.listItem}
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

export default connect(mapStateToProps)(DeletePlayer);