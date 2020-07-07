import React, { Component } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ImageBackground } from "react-native"
import { white, orange, green, black, gray, blue, lightBlue } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { saveUser, getUser } from "../utils/api";
import { RandomGeneratedNumber } from "../utils/helpers";
import { addUser } from "../actions/register";
import { connect } from "react-redux";
import { Base64 } from 'js-base64';

const logo = '../assets/logo.png';

class Register extends Component {
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
					matches: [{ gamedate: "2020-06-08T04:15:40.611Z", opponent: "Team B", team: "Team A", venue: "Team A groud" }],
					name: this.state.username,
					password: Base64.encode(this.state.password.toLocaleLowerCase()),
					players: [],
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
				<View style={styles.row}>
					<ImageBackground source={require(logo)} style={styles.player} />
					<Text style={styles.titletext}>SoccerStatz</Text>
					<TextInput style={styles.input} placeholder="Enter username" value={username} onChangeText={(text) => this.setLoginData(text, "username")} />
					<TextInput style={styles.input} placeholder="Enter password" value={password} secureTextEntry={true} onChangeText={(text) => this.setLoginData(text, "password")} />
					<TextInput style={styles.input} placeholder="Confirm password" value={cpassword} secureTextEntry={true} onChangeText={(text) => this.setLoginData(text, "cpassword")} />
					<TouchableOpacity style={styles.btn} onPress={this.handleRegister}>
						<Text style={styles.btnText}>Register</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.register} onPress={() => this.loginPage()}>
						<Text style={styles.registerText}>Already have an account? Login</Text>
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
		justifyContent: "center",
	},
	titletext: {
		fontSize: 25,
		justifyContent: "center",
		textAlign: "center",
		color: gray,
		textTransform: "uppercase",
		fontWeight: "bold",
	},
	register: {
		alignItems: "center"
	},
	registerText: {
		color: gray,
		fontSize: 12,
	},
	player: {
		padding: 10,
		marginRight: 10,
		width: 100,
		height: 80,
		alignSelf: "center",
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
		backgroundColor: lightBlue,
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

export default connect()(Register);