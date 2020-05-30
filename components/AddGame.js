import React, { Component } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native"
import { white, orange, green, black, gray } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { saveUser, getUser } from "../utils/api";
import { RandomGeneratedNumber } from "../utils/helpers";
import { addUser } from "../actions/register";
import { connect } from "react-redux";
import { Base64 } from 'js-base64';

class AddGame extends Component {
	render() {
		return (
			<View>
				<Text>Add Game</Text>
			</View>
		)
	}
}
export default connect()(AddGame);