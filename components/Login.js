import React, { Component } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ImageBackground } from "react-native"
import { white, orange, gray, blue } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Base64 } from 'js-base64';
import { getUser, getGame } from "../utils/api";
import { connect } from "react-redux";
import { login } from "../actions/login";

const logo = '../assets/logo.png';

class Login extends Component {
	state = {
		username: '',
		password: '',
	}

	setLoginData = (input, name) => {
		this.setState({
			[name]: input
		})
	}

	register = () => {
		this.props.navigation.navigate('Register')
	}

	componentDidMount() {
		getGame().then(data => console.log('Data loaded successfully'))
	}

	handleLogin = () => {
		const { username, password } = this.state;
		const { dispatch } = this.props;
		const encryptPassword = Base64.encode(password);
		if (username.length > 0 && password.length > 0) {
			getUser(username, encryptPassword).then(data => {
				if (data) {
					dispatch(login(data[0].id));
					this.props.navigation.navigate('Home')
				}
				else {
					alert('😞! error invalid username/password');
				}
			});
		}
		else {
			alert('😞! error invalid username/password is empty');
		}

	}

	render() {
		const { username, password } = this.state;
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.row}>
					<ImageBackground source={require(logo)} style={styles.player} />
					<Text style={styles.titletext}>SoccerStatz</Text>
					<TextInput style={styles.input} placeholder="Enter username" value={username} onChangeText={(text) => this.setLoginData(text, "username")} />
					<TextInput style={styles.input} placeholder="Enter password" value={password} secureTextEntry={true} onChangeText={(text) => this.setLoginData(text, "password")} />
					<TouchableOpacity style={styles.btn} onPress={this.handleLogin}>
						<Text style={styles.btnText}>Login</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.register} onPress={() => this.register()}>
						<Text style={styles.registerText}>Don't have an account? Register</Text>
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
	player: {
		padding: 10,
		marginRight: 10,
		width: 100,
		height: 80,
		alignSelf: "center",
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
		backgroundColor: blue,
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

export default connect()(Login);