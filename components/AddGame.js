import React, { Component } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, StatusBar, Picker } from "react-native"
import { white, orange, green, black, gray, lightgray, } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { saveUser, getUser } from "../utils/api";
import { RandomGeneratedNumber } from "../utils/helpers";
import { addUser } from "../actions/register";
import { connect } from "react-redux";
import { Base64 } from 'js-base64';

class AddGame extends Component {
	state = {
		username: '',
		password: '',
		cpassword: '',
	}

	setLoginData = (input, name) => {
		this.setState({
			[name]: input
		})
	}

	setMainHeader = () => {
		const { deck } = this.props.route.params;
		const { navigation } = this.props;
		navigation.setOptions({
			title: deck
		});
	}

	loginPage = () => {
		this.props.navigation.navigate('Login');
	}

	handleRegister = () => {
		const { username, password, cpassword } = this.state;
		const { dispatch } = this.props;

		if (username.length > 0 && password.length > 0) {
			if (password !== cpassword) alert('👎 password does not match');
			else {
				const user = {
					id: RandomGeneratedNumber(),
					name: this.state.username,
					password: Base64.encode(this.state.password.toLocaleLowerCase()),
				}
				saveUser(user).then(data => {
					if (data) {
						dispatch(addUser(user.id, user.name, user.password));
						alert('👍account successfully created');
						this.props.navigation.navigate('Login');
					}
					else {
						alert('👎error!! username name already exist');
					}
				});
			}
		}
		else alert('😏 username and password are compulsory');
	}


	render() {
		const { username, password, cpassword } = this.state;
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
					<Text>Please fill form add a game....</Text>
					<TextInput style={styles.input} placeholder="Please enter your team" value={username} onChangeText={(text) => this.setLoginData(text, "username")} />
					<TextInput style={styles.input} placeholder="Please enter team playing" value={username} onChangeText={(text) => this.setLoginData(text, "username")} />
					<TextInput style={styles.input} placeholder="Team A" value={username} onChangeText={(text) => this.setLoginData(text, "username")} />

					<TouchableOpacity style={styles.btn} onPress={this.handleRegister}>
						<Text style={styles.btnText}>Add Game</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)
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
	homeTitle: {
		fontSize: 25,
		color: orange,
		textAlign: "center",
		width: '70%'
	},
	homeContainer: {
		flexWrap: "wrap",
		justifyContent: "flex-start",
		width: '10%'
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
	}
})

export default connect()(AddGame);