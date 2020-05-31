import React from "react"
import { Text } from "react-native"
import { connect } from "react-redux";

function UserName({ login }) {
	return (
		<Text>{login.username.substring(0, 2).toUpperCase()}</Text>
	)
}

const mapStateToProps = ({ login }) => {
	return {
		login
	}
}

export default connect(mapStateToProps)(UserName);