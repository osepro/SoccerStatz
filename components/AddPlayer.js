import React, { Component } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, StatusBar, Picker } from "react-native"
import { white, orange, green, black, gray, blue, lightgray, lightBlue } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { savePlayer, getGame } from "../utils/api";
import { RandomGeneratedNumber } from "../utils/helpers";
import { addUser } from "../actions/register";
import { connect } from "react-redux";
import { Base64 } from 'js-base64';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";

class AddPlayer extends Component {
	state = {
		gamelocation: '',
		date: new Date(),
		mode: 'date',
		show: false,
		fullname: '',
		position: '',
		jersey: '',
		height: '',
		weight: '',
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

	setPlayerDOB = () => {
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

	setMainHeader = () => {
		const { deck } = this.props.route.params;
		const { navigation } = this.props;
		navigation.setOptions({
			title: deck
		});
	}

	setPlayerData = (input, name) => {
		this.setState({
			[name]: input
		})
	}

	handleAddGame = () => {
		const { fullname, position, jersey, height, weight, date } = this.state;
		const { dispatch, login } = this.props;

		if (fullname.length > 0 && position.length > 0) {
			if (fullname === position) alert('👎 an error occured in your input data');
			else {
				const newPlayer = {
					fullname: fullname,
					position: position,
					jersey: jersey,
					height: height,
					weight: weight,
					dateofbirth: date,
				}
				savePlayer(login.id, newPlayer).then(value => {
					if (value) {
						alert('👍 Player successfully added');
						//this.props.navigation.navigate('Home');
					}
					else {
						alert('👎 an error occured why adding game. Please try again')
					}
				});
			}
		}
		else alert('😏 compulsory fields empty');
	}


	render() {
		const { fullname, position, jersey, height, weight, show, date } = this.state;
		getGame().then(user => console.log(user));
		Moment.locale('en');
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.row}>
					<Text style={styles.formText}>Please fill form to add player....</Text>
					<TextInput style={styles.input} placeholder="enter fullname" value={fullname} onChangeText={(text) => this.setPlayerData(text, "fullname")} />
					<TextInput style={styles.input} placeholder="enter position" value={position} onChangeText={(text) => this.setPlayerData(text, "position")} />
					<TextInput style={styles.input} placeholder="enter player's jersey" value={jersey} onChangeText={(text) => this.setPlayerData(text, "jersey")} />
					<TextInput style={styles.input} placeholder="enter height" value={height} onChangeText={(text) => this.setPlayerData(text, "height")} />
					<TextInput style={styles.input} placeholder="enter weight" value={weight} onChangeText={(text) => this.setPlayerData(text, "weight")} />
					<TouchableOpacity onPress={this.setPlayerDOB}>
						<Text style={styles.textLabel}>
							<Text>📅 choose player's DOB: </Text>
							<Text style={styles.dateSeleted}>{Moment(date).format('MM-DD-YYYY')}</Text>
						</Text>
					</TouchableOpacity>
					{<DateTimePickerModal
						isVisible={show}
						mode="date"
						onConfirm={this.setDate}
						onCancel={this.setPlayerDOB}
					/>}
					<TouchableOpacity style={styles.btn} onPress={this.handleAddGame}>
						<Text style={styles.btnText}>Add Player</Text>
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

export default connect(mapStateToProps)(AddPlayer);