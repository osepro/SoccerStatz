import React, { Component, Fragment } from "react"
import { View, Text, KeyboardAvoidingView, StyleSheet, Button, TouchableOpacity, StatusBar } from "react-native"
import { connect } from "react-redux";
import { white, orange, lightgray, green, black, gray, blue, red, lightBlue } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Agenda } from 'react-native-calendars';
import { logout } from "../actions/login";
import { getGame } from "../utils/api";
import UserName from "./UserName";
import AddPlayer from "./AddPlayer";
import ViewPlayer from "./ViewPlayer";
import DeletePlayer from "./DeletePlayer";
import Moment from 'moment';

function HomeScreen({ navigation, route }) {
	Moment.locale('en');

	const gameDetails = route.params.initmatches.map(details => {
		const dateData = Moment(details.gamedate).format('YYYY-MM-DD')
		const team = details.team;
		const opponent = details.opponent;
		const venue = details.venue;
		const gameData = { [dateData]: [{ name: `${opponent} - ${team}`, venue: venue }] }
		return gameData;
	})

	let itemDetails = {};

	for (let i = 0; i < gameDetails.length; i++) {
		itemDetails = { ...itemDetails, ...gameDetails[i] }
	}

	console.log(itemDetails);

	return (
		<View behavior="padding" style={styles.container}>
			<View style={styles.statusBar}>
				<StatusBar barStyle="light-content" />
				<View style={styles.homeContainer}>
					<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
						<FontAwesome name='navicon' size={30} color={gray} />
					</TouchableOpacity>
				</View>
				<Text style={styles.homeTitle}>SoccerStaz <FontAwesome name='soccer-ball-o' size={15} color={gray} /></Text>
				<Text style={styles.initTxt}><UserName /></Text>
			</View>
			<View style={styles.row}>
				<Agenda
					items={itemDetails}
					onDayPress={(day) => { console.log('day pressed', day) }}
					selected={new Date()}
					markedDates={{
						'2020-06-01': { marked: true },
						'2020-06-14': { marked: true },
						'2020-06-15': { marked: true }
					}}
					renderItem={(item, firstItemInDay) => { return (<View style={styles.item}>{Object.values(item).map((items, i) => <Text key={i} style={styles.noGame}>⚽️ {items}</Text>)}</View>); }}
					renderDay={(day, item) => { return (<View />); }}
					renderKnob={() => { return (<View />); }}
					renderEmptyData={() => { return (<View style={styles.item}><Text style={styles.noGame}>⚽️ No game today</Text></View>); }}
				/>
			</View>
		</View>
	);
}



function NotificationsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button onPress={() => navigation.goBack()} title="Go back home" />
		</View>
	);
}

function addPlayer({ navigation }) {
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
				<Text style={styles.initTxt}><UserName /></Text>
			</View>
			<AddPlayer />
		</KeyboardAvoidingView>
	)
}

function viewPlayer({ navigation }) {
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
				<Text style={styles.initTxt}><UserName /></Text>
			</View>
			<ViewPlayer />
		</KeyboardAvoidingView>
	)
}

function deletePlayer({ navigation }) {
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
				<Text style={styles.initTxt}><UserName /></Text>
			</View>
			<DeletePlayer />
		</KeyboardAvoidingView>
	)
}

function logOut({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Are you sure you want to Log Out</Text>
			<Button onPress={() => navigation.navigate('Login')} title="Log Out" />
		</View>
	)
}

const Drawer = createDrawerNavigator();

function MyDrawer(props) {
	return (
		<Drawer.Navigator initialRouteName="Home" drawerType={'slide'}>
			<Drawer.Screen name="Home" component={HomeScreen} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'home' : 'home'} size={20} color={orange} /> }} initialParams={{ initmatches: props.homematches }} />
			<Drawer.Screen name="Add Player" component={addPlayer} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'user-plus' : 'user-plus'} size={20} color={green} /> }} />
			<Drawer.Screen name="View Player" component={viewPlayer} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'address-book' : 'address-book'} size={20} color={blue} /> }} />
			<Drawer.Screen name="Delete Player" component={deletePlayer} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'user-times' : 'user-times'} size={20} color={black} /> }} />
			<Drawer.Screen name="Log Out" component={logOut} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'power-off' : 'power-off'} size={20} color={red} /> }} />
			<Drawer.Screen name="Welcome" component={''} options={{ drawerIcon: config => <FontAwesome name={Platform.OS === 'android' ? 'user-o' : 'user-o'} size={20} color={lightBlue} /> }} />
		</Drawer.Navigator>
	);
}


class Home extends Component {
	state = {
		username: '',
		password: '',
		matches: [],
	}

	componentDidMount() {
		const { login } = this.props;
		getGame().then(user => this.setState({ matches: user[login.id].matches }));
	}

	render() {
		if (this.state.matches.length > 0) {
			return (
				<MyDrawer homematches={this.state.matches} />
			)
		}
		return <View />
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