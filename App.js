import React from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';
import store from "./store";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Login from "./components/Login";
import Register from "./components/Register";
import { white, orange, lightgray, green, black, gray, blue, red, lightBlue } from "./utils/colors";
import Home from "./components/Home";
import AddGame from "./components/AddGame";
import LineUp from "./components/LineUp";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RouteConfigs = {
	Home: {
		name: "Home",
		component: Home,
		options: { tabBarIcon: ({ color }) => <Ionicons name='ios-home' size={20} color={color} />, title: 'Home' }
	},
	AddGame: {
		name: "Add Game",
		component: AddGame,
		options: { tabBarIcon: ({ color }) => <Ionicons name='ios-football' size={20} color={color} />, title: 'Add Game' }
	},
	LineUp: {
		component: LineUp,
		name: "Line Up",
		options: { tabBarIcon: ({ color }) => <Ionicons name='ios-shirt' size={20} color={color} />, title: 'Line Up' }
	}
}

const TabNavigatorConfig = {
	navigationOptions: {
		header: null,
		swipeEnabled: false
	},
	tabBarOptions: {
		activeTintColor: lightBlue,
		style: {
			height: 86,
			backgroundColor: Platform.OS === "ios" ? white : lightgray,
			shadowColor: "rgba(0, 0, 0, 0.24)",
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
};

const Tab = Platform.OS === 'ios'
	? createBottomTabNavigator()
	: createMaterialTopTabNavigator()

const TabNav = () => (
	<Tab.Navigator {...TabNavigatorConfig}>
		<Tab.Screen {...RouteConfigs["Home"]} />
		<Tab.Screen {...RouteConfigs["AddGame"]} />
		<Tab.Screen {...RouteConfigs["LineUp"]} />
	</Tab.Navigator>
);

const StackNavigatorConfig = {
	headerMode: "screen"
};

const StackConfig = {
	TabNav: {
		name: "Home",
		component: TabNav,
		options: { headerShown: false }
	},
	Login: {
		name: "Login",
		component: Login,
		options: { headerShown: false }
	},
	Register: {
		name: "Register",
		component: Register,
		options: { headerShown: false }
	},
}

const Stack = createStackNavigator();
const MainNav = () => (
	<Stack.Navigator {...StackNavigatorConfig}>
		<Stack.Screen {...StackConfig["Login"]} />
		<Stack.Screen {...StackConfig["Register"]} />
		<Stack.Screen {...StackConfig["TabNav"]} />
	</Stack.Navigator>
);

export default function App() {
	return (
		<Provider store={store}>
			<View style={styles.container}>
				<NavigationContainer>
					<MainNav />
				</NavigationContainer>
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: '#fff',
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
});
