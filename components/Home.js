import React, { Component, Fragment } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, Button, TouchableOpacity, StatusBar, ImageBackground } from "react-native"
import { connect } from "react-redux";
import { white, orange, lightgray, green, black, gray, blue, red } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Agenda } from 'react-native-calendars';

const image = '../assets/soccerstazbg.png'

function HomeScreen({ navigation }) {
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<View style={styles.statusBar}>
				<StatusBar barStyle="light-content" />
				<View style={styles.homeContainer}>
					<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
						<FontAwesome name='navicon' size={30} color={gray} />
					</TouchableOpacity>
				</View>
				<Text style={styles.homeTitle}>SoccerStaz <FontAwesome name='soccer-ball-o' size={15} color={gray} /></Text>
			</View>
			<View style={styles.row}>
				<Agenda
					selected={'20120-05-29'}
					renderItem={(item, firstItemInDay) => { return (<View />); }}
					renderDay={(day, item) => { return (<View />); }}
					renderEmptyDate={() => { return (<View />); }}
					renderKnob={() => { return (<View />); }}
					renderEmptyData={() => { return (<View style={styles.item}><Text style={styles.noGame}>⚽️ No game today</Text></View>); }}
				/>
			</View>
		</KeyboardAvoidingView>
	);
}

function NotificationsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button onPress={() => navigation.goBack()} title="Go back home" />
		</View>
	);
}

function addPlayer() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<FontAwesome name='plus-square' size={30} color={blue} />
			<Button onPress={() => navigation.goBack()} title="Add Player" />
		</View>
	)
}

function viewPlayer() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button onPress={() => navigation.goBack()} title="viewPlayer" />
		</View>
	)
}

function deletePlayer() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button onPress={() => navigation.goBack()} title="Delete Player" />
		</View>
	)
}

function logOut() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button onPress={() => navigation.goBack()} title="Sign Out" />
		</View>
	)
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
	return (
		<Drawer.Navigator initialRouteName="Home">
			<Drawer.Screen name="Home" component={HomeScreen} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'home' : 'home'} size={20} color={orange} /> }} />
			<Drawer.Screen name="Add Player" component={addPlayer} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'user-plus' : 'user-plus'} size={20} color={green} /> }} />
			<Drawer.Screen name="View Player" component={viewPlayer} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'address-book' : 'address-book'} size={20} color={blue} /> }} />
			<Drawer.Screen name="Delete Player" component={deletePlayer} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'user-times' : 'user-times'} size={20} color={black} /> }} />
			<Drawer.Screen name="LogOut" component={logOut} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'sign-out' : 'sign-out'} size={20} color={red} /> }} />
		</Drawer.Navigator>
	);
}


class Home extends Component {
	state = {
		username: '',
		password: '',
	}

	renderItem = ({ today, ...metrics }, formattedDate, key) => (
		<View style={styles.item}>
			{today ? (
				<View>
					<DateHeader date={formattedDate} />
					<Text style={styles.noDataText}>{today}</Text>
				</View>
			) : (
					<TouchableOpacity
						onPress={() =>
							this.props.navigation.navigate("EntryDetail", { entryId: key })
						}
					>
						<Text> Details </Text>
					</TouchableOpacity>
				)}
		</View>
	);


	render() {
		const { login } = this.props;
		return (
			<MyDrawer />
		)
	}
}

const mapStateToProps = ({ login }) => {
	return {
		login
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

export default connect(mapStateToProps)(Home);