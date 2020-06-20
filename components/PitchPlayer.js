import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { black } from "../utils/colors";

const player = '../assets/jersey.png';

const PitchPlayer = () => {
	return (
		<View style={styles.pitchItems} key={i}>
			<ImageBackground source={require(player)} style={styles.player}>
				<Text style={styles.playernumber}>9</Text>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	pitchItems: {
		justifyContent: "flex-end",
		width: 60,
		height: 60
	},
	player: {
		padding: 10,
		marginRight: 10,
	},
	playernumber: {
		color: black,
		fontWeight: "bold",
		textAlign: "center"
	},
})

export default PitchPlayer;