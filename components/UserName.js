import React from "react";
import { Text, StyleSheet } from "react-native";
import { white, lightBlue } from "../utils/colors";
import { connect } from "react-redux";

function UserName({ login }) {
	return (
		<Text style={styles.initTxt}>{login.username.substring(0, 2).toUpperCase()}</Text>
	)
}

const mapStateToProps = ({ login }) => {
	return {
		login
	}
}

const styles = StyleSheet.create({
	initTxt: {
		backgroundColor: lightBlue,
		color: white,
		fontWeight: "bold",
		padding: 5,
		fontSize: 15,
	},
})

export default connect(mapStateToProps)(UserName);