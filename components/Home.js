import React, { Component, Fragment } from "react"
import { View, Text, KeyboardAvoidingView, StyleSheet, Button } from "react-native"
import { connect } from "react-redux";
import { white, orange, lightgray, green, black, gray, blue, red, lightBlue } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { home } from "../actions/login";
import AddPlayer from "./AddPlayer";
import ViewPlayer from "./ViewPlayer";
import HomeScreen from "./HomeScreen";
import DeletePlayer from "./DeletePlayer";
import MainStatusBar from "./StatusBar";

function addPlayer({ navigation }) {
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<MainStatusBar navigation={navigation} />
			<AddPlayer />
		</KeyboardAvoidingView>
	)
}

function viewPlayer({ navigation }) {
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<MainStatusBar navigation={navigation} />
			<ViewPlayer />
		</KeyboardAvoidingView>
	)
}

function deletePlayer({ navigation }) {
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<MainStatusBar navigation={navigation} />
			<DeletePlayer />
		</KeyboardAvoidingView>
	)
}

function logOut({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Are you sure you want to Log Out 😢</Text>
			<Button onPress={() => navigation.navigate('Home')} title="Cancel" />
			<Button onPress={() => navigation.navigate('Login')} title="Log Out" />
		</View>
	)
}

const Drawer = createDrawerNavigator();
const image = '../assets/pitch.png';

function MyDrawer(props) {
	return (
		<Drawer.Navigator initialRouteName="Home" drawerType={'slide'} drawerStyle={{ backgroundColor: lightgray }}>
			<Drawer.Screen name="Home" component={HomeScreen} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'home' : 'home'} size={20} color={orange} /> }} />
			<Drawer.Screen name="Add Player" component={addPlayer} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'user-plus' : 'user-plus'} size={20} color={green} /> }} />
			<Drawer.Screen name="View Player" component={viewPlayer} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'address-book' : 'address-book'} size={20} color={blue} /> }} />
			<Drawer.Screen name="Delete Player" component={deletePlayer} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'user-times' : 'user-times'} size={20} color={black} /> }} />
			<Drawer.Screen name="Log Out" component={logOut} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'power-off' : 'power-off'} size={20} color={red} /> }} />
		</Drawer.Navigator>
	);
}


class Home extends Component {
	state = {
		username: '',
		password: '',
	}

	componentDidMount() {
		const { login, dispatch } = this.props;
		dispatch(home(login.id));
	}

	render() {
		const { login } = this.props;

		if (login.matches) {
			return (
				<MyDrawer homematches={login.matches} />
			)
		}
		return <View />
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

export default connect(mapStateToProps)(Home);