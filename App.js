import React from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';
import store from "./store";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

const image = '../SoccerStatz/assets/soccerstazbg.png';

const StackNavigatorConfig = {
	headerMode: "screen"
};

const StackConfig = {
	Home: {
		name: "Home",
		component: Home,
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
		<Stack.Screen {...StackConfig["Home"]} />
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
