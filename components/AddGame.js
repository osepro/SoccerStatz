import React, { Component } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView } from "react-native"
import { white, orange, green, black, gray, blue, lightgray, lightBlue } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { addGame } from "../utils/api";
import { addgame } from "../actions/login";
import { connect } from "react-redux";
import Moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import UserName from "./UserName";


class AddGame extends Component {
	state = {
		gamelocation: '',
		date: new Date(),
		mode: 'date',
		show: false,
		yourteam: '',
		opponent: '',
		venue: '',
	}
	updateUser = (gamelocation) => {
		this.setState({ gamelocation })
	}

	onChange = () => {
		this.setState({
			show: true,
		})
	};

	showDatepicker = () => {
		this.setState({
			show: !this.state.show,
			mode: 'date'
		})
	};

	showTimepicker = () => {
		this.setState({
			show: !this.state.show,
			mode: 'time'
		})
	};

	setGameDate = () => {
		this.setState({
			show: !this.state.show
		})
	}

	setDate = (selectedDate) => {
		this.setState({
			show: !this.state.show,
			date: selectedDate
		})
	};

	setTime = (selectedDate) => {
		this.setState({
			show: !this.state.show,
			date: selectedDate
		})
	};

	setGameData = (input, name) => {
		this.setState({
			[name]: input
		})
	}

	handleAddGame = () => {
		const { yourteam, opponent, venue, date } = this.state;
		const { dispatch, login } = this.props;

		if (yourteam.length > 0 && opponent.length > 0) {
			if (yourteam === opponent) alert('👎 Opponent and Team cannot be the same');
			else {
				const gameDetails = {
					id: login.id,
					gamedate: date,
					team: yourteam,
					opponent: opponent,
					venue: venue
				}
				addGame(login.id, gameDetails).then(value => {
					if (value) {
						alert('⚽️ Game successfully added');
						dispatch(addgame(gameDetails));
						this.setState({
							yourteam: '',
							opponent: '',
							venue: '',
						})
						this.props.navigation.navigate('Home');
					}
					else {
						alert('👎 an error occured why creating game. Please try again')
					}
				});
			}
		}
		else alert('😏 compulsory fields empty');
	}


	render() {
		const { yourteam, opponent, venue, show, date, mode } = this.state;

		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.statusBar}>
					<StatusBar barStyle="light-content" />

					<Text style={styles.homeTitle}>SoccerStaz <FontAwesome name='soccer-ball-o' size={15} color={gray} /></Text>
					<Text style={styles.initTxt}><UserName /></Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.formText}>Please fill form to add game....</Text>
					<TextInput style={styles.input} placeholder="Please enter your team" value={yourteam} onChangeText={(text) => this.setGameData(text, "yourteam")} />
					<TextInput style={styles.input} placeholder="Please enter opponent" value={opponent} onChangeText={(text) => this.setGameData(text, "opponent")} />
					<TextInput style={styles.input} placeholder="Please enter match venue" value={venue} onChangeText={(text) => this.setGameData(text, "venue")} />
					<TouchableOpacity onPress={this.showDatepicker}>
						<Text style={styles.textLabel}>
							<Text>📅 Set game date: </Text>
							<Text style={styles.dateSeleted}>{Moment(date).format('MM-DD-YYYY')}</Text>
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.showTimepicker}>
						<Text style={styles.textLabel}>
							<Text>⏲ Set game time: </Text>
							<Text style={styles.dateSeleted}>{Moment(date).format('hh:mm:ss A')}</Text>
						</Text>
					</TouchableOpacity>
					{<DateTimePickerModal
						isVisible={show}
						mode={mode}
						onConfirm={this.setDate}
						onCancel={this.setGameDate}
						minimumDate={date}
						onChange={this.onChange}
					/>}
					<TouchableOpacity style={styles.btn} onPress={this.handleAddGame}>
						<Text style={styles.btnText}>Add Game</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

function mapStateToProps({ login }) {
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
		justifyContent: "center"
	},
	statusBar: {
		flexDirection: "row",
		backgroundColor: white,
		paddingLeft: 20,
		borderBottomColor: lightgray,
		borderBottomWidth: 1,
		paddingTop: 40,
		paddingBottom: 20,
		justifyContent: "center"
	},
	initTxt: {
		backgroundColor: lightBlue,
		color: white,
		fontWeight: "bold",
		borderRadius: 15,
		padding: 10,
	},
	homeTitle: {
		fontSize: 25,
		color: orange,
		textAlign: "center",
		width: '70%'
	},
	formText: {
		fontSize: 20,
		color: gray,
		marginTop: 15
	},
	dateSeleted: {
		color: gray
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
	},
	homeContainer: {
		flexWrap: "wrap",
		justifyContent: "flex-start",
		width: '10%'
	},
	textLabel: {
		fontSize: 15,
		color: gray,
		marginTop: 20,
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
})

export default connect(mapStateToProps)(AddGame);