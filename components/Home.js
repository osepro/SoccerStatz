import React, { Component, Fragment } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, Button, TouchableOpacity, StatusBar, ImageBackground } from "react-native"
import { connect } from "react-redux";
import { white, orange, lightgray, green, black, gray, blue, red } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

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
		justifyContent: "center",
		alignItems: "center",
	},
	titletext: {
		fontSize: 35,
		justifyContent: "center",
		textAlign: "center",
		color: orange
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