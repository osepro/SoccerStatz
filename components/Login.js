import React, { Component } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native"
import { white, orange, gray } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Base64 } from 'js-base64';
import { getUser } from "../utils/api";
import { connect } from "react-redux";
import { login } from "../actions/login";

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

	handleLogin = () => {
		const { username, password } = this.state;
		const { dispatch } = this.props;
		const encryptPassword = Base64.encode(password);
		getUser(username, encryptPassword).then(data => {
			if (data) {
				dispatch(login(data[0].id, data[0].name));
				this.props.navigation.navigate('Home')
			}
			else {
				alert('😞! error invalid username/password');
			}
		});
	}

	render() {
		const { username, password } = this.state;
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.row}>
					<Text style={styles.titletext}>SoccerStatz <FontAwesome name='soccer-ball-o' size={30} color={gray} /></Text>
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

export default connect()(Login);