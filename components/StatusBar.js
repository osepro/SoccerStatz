import React from "react"
import UserName from "./UserName";
import { View, Text, KeyboardAvoidingView, StyleSheet, Button, TouchableOpacity, StatusBar } from "react-native"
import { white, orange, lightgray, green, black, gray, blue, red, lightBlue, semilightgray } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const MainStatusBar = (props) => {
	return (
		<View style={styles.statusBar}>
			<StatusBar barStyle="light-content" />
			<View style={styles.homeContainer}>
				<TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
					<FontAwesome name='navicon' size={30} color={gray} />
				</TouchableOpacity>
			</View>
			<Text style={styles.homeTitle}>S<FontAwesome name='soccer-ball-o' size={25} color={orange} />ccerStaz</Text>
			<View style={styles.initTxt}><UserName /></View>
		</View>
	)
}

const styles = StyleSheet.create({
	statusBar: {
		flexDirection: "row",
		backgroundColor: white,
		paddingLeft: 20,
		borderBottomColor: lightgray,
		borderBottomWidth: 1,
		paddingTop: 40,
		paddingBottom: 20,
	},
	homeContainer: {
		flexWrap: "wrap",
		justifyContent: "flex-start",
		width: '10%'
	},
	titletext: {
		fontSize: 25,
		justifyContent: "center",
		textAlign: "center",
		color: gray,
		textTransform: "uppercase",
		fontWeight: "bold",
	},
	homeTitle: {
		fontSize: 25,
		color: gray,
		textAlign: "center",
		width: '70%',
		textTransform: "uppercase",
		fontWeight: "bold",
	},
	initTxt: {
		backgroundColor: lightBlue,
		borderRadius: 25,
		padding: 8,
	},
})

export default MainStatusBar;