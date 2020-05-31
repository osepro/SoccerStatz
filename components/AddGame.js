import React, { Component } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, StatusBar, Picker } from "react-native"
import { white, orange, green, black, gray, blue, lightgray, lightBlue } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { addGame, getGame } from "../utils/api";
import { RandomGeneratedNumber } from "../utils/helpers";
import { addUser } from "../actions/register";
import { connect } from "react-redux";
import { Base64 } from 'js-base64';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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

	onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		this.setState({
			show: true,
			date: currentDate
		})
	};

	setGameDate = () => {
		this.setState({
			show: !this.state.show
		})
	}

	setDate = (selectedDate) => {
		//const currentDate = selectedDate || this.state.date;
		this.setState({
			show: !this.state.show,
			date: selectedDate
		})
	};

	setMainHeader = () => {
		const { deck } = this.props.route.params;
		const { navigation } = this.props;
		navigation.setOptions({
			title: deck
		});
	}

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
					opponent: yourteam,
					venue: venue
				}
				addGame(gameDetails);
				alert('⚽️ Game successfully added');
				/*saveUser(user).then(data => {
					if (data) {
						dispatch(addUser(user.id, user.name, user.password));
						alert('👍account successfully created');
						this.props.navigation.navigate('Login');
					}
					else {
						alert('👎error!! username name already exist');
					}
				});*/
			}
		}
		else alert('😏 compulsory fields empty');
	}


	render() {
		const { yourteam, opponent, venue, show, date, mode } = this.state;
		console.log(getGame().then(result => console.log(result)));
		console.log(this.props.state);
		Moment.locale('en');
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.statusBar}>
					<StatusBar barStyle="light-content" />
					<Text style={styles.homeTitle}>SoccerStaz <FontAwesome name='soccer-ball-o' size={15} color={gray} /></Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.formText}>Please fill form to add game....</Text>
					<TextInput style={styles.input} placeholder="Please enter your team" value={yourteam} onChangeText={(text) => this.setGameData(text, "yourteam")} />
					<TextInput style={styles.input} placeholder="Please enter opponent" value={opponent} onChangeText={(text) => this.setGameData(text, "opponent")} />
					<TextInput style={styles.input} placeholder="Please enter match venue" value={venue} onChangeText={(text) => this.setGameData(text, "venue")} />
					<TouchableOpacity onPress={this.setGameDate}>
						<Text style={styles.textLabel}>
							<Text>📅 Set game date: </Text>
							<Text style={styles.dateSeleted}>{Moment(date).format('MM-DD-YYYY')}</Text>
						</Text>
					</TouchableOpacity>
					{<DateTimePickerModal
						isVisible={show}
						mode="date"
						onConfirm={this.setDate}
						onCancel={this.setGameDate}
						minimumDate={new Date()}
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