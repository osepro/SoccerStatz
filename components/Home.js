import React, { Component, Fragment } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, StatusBar, ImageBackground } from "react-native"
import { connect } from "react-redux";
import { white, orange, green, black, gray } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Menu from "./Menu";

const image = '../assets/soccerstazbg.png'

class Home extends Component {
	state = {
		username: '',
		password: '',
	}

	render() {
		const { login } = this.props;

		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.row}>
					<View style={styles.imageHolder}>
						<ImageBackground source={require(image)} style={styles.image}></ImageBackground>
					</View>
				</View>
			</KeyboardAvoidingView>
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
		padding: 20,
		backgroundColor: white,
		flex: 1
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