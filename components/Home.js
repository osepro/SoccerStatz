import React, { Component, Fragment } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, Button, TouchableOpacity, StatusBar, ImageBackground } from "react-native"
import { connect } from "react-redux";
import { white, orange, green, black, gray, blue } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const image = '../assets/soccerstazbg.png'

function HomeScreen({ navigation }) {
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<View style={styles.statusBar}>
				<StatusBar barStyle="light-content" />
				<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
					<FontAwesome name='navicon' size={30} color={black} />
				</TouchableOpacity>
			</View>
			<View style={styles.row}>
				<View style={styles.imageHolder}>
					<Button title="Open drawer" onPress={() => navigation.openDrawer()} />
					<Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
					<ImageBackground source={require(image)} style={styles.image}></ImageBackground>
				</View>
			</View>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Button
					onPress={() => navigation.navigate('Notifications')}
					title="Go to notifications"
				/>
			</View>
		</KeyboardAvoidingView>
	);
}

function NotificationsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<FontAwesome name='plus-square' size={30} color={gray} />
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
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen name="Add Player" component={addPlayer} />
			<Drawer.Screen name="View Player" component={viewPlayer} />
			<Drawer.Screen name="Delete Player" component={deletePlayer} />
			<Drawer.Screen name="LogOut" component={logOut} />
		</Drawer.Navigator>
	);
}


class Home extends Component {
	state = {
		username: '',
		password: '',
	}

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
		backgroundColor: green,
		height: 120,
		justifyContent: "center",
		paddingLeft: 10,
	},
	row: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	titletext: {
		fontSize: 35,
		justifyContent: "center",
		textAlign: "center",
		color: orange
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
	btn: {
		backgroundColor: gray,
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
	imageHolder: {
		width: 200,
		height: 200,
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