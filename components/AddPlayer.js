import React, { Component } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, StatusBar, Picker } from "react-native"
import { white, orange, green, black, gray, blue, lightgray, lightBlue } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { savePlayer } from "../utils/api";
import { RandomGeneratedNumber } from "../utils/helpers";
import { addplayer } from "../actions/login";
import { connect } from "react-redux";
import Moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';

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

	setPlayerData = (input, name) => {
		this.setState({
			[name]: input
		})
	}

	setNumbericData(input, name) {
		let inputData = '';
		let numbers = '0123456789';

		for (var i = 0; i < input.length; i++) {
			if (numbers.indexOf(input[i]) > -1) {
				inputData = inputData + input[i];
				this.setState({ [name]: input })
			}
			else {
				alert("😜Please enter numbers only");
				this.setState({ [name]: '' })
			}
		}
	}

	handleAddPlayer = () => {
		const { fullname, position, jersey, height, weight, date } = this.state;
		const { dispatch, login } = this.props;

		if (fullname.length > 0 && position.length > 0) {
			if (fullname === position) alert('👎 an error occured in your input data');
			else {
				const newPlayer = {
					dateofbirth: date,
					fullname: fullname,
					height: height,
					id: RandomGeneratedNumber(),
					jersey: jersey,
					position: position,
					weight: weight,
					matchesplayes: 0,
					goals: 0,
					assists: 0,
					passes: 0,
					shots: 0,
					freekicks: 0,
				}
				savePlayer(login.id, newPlayer).then(value => {
					if (value) {
						dispatch(addplayer(newPlayer));
						alert('👍 Player successfully added');
						this.setState({
							fullname: '',
							position: '',
							jersey: '',
							height: '',
							weight: '',
							date: ''
						})
					}
					else {
						alert('👎 an error occured why adding game. Please try again')
					}
				});
			}
		}
		else alert('😏 compulsory fields empty');
	}

	setPosition = (value) => {
		this.setState({
			position: value
		})
	}


	render() {
		const { fullname, jersey, height, weight, show, date } = this.state;
		const newYear = new Date().getFullYear() - 5;
		return (
			<KeyboardAvoidingView behavior="margin" style={styles.container}>
				<View style={styles.row}>
					<Text style={styles.formHeader}>Add a new player</Text>
					<Text style={styles.formText}>Please fill form below to add a new Player....</Text>
					<TextInput style={styles.input} placeholder="enter fullname" value={fullname} onChangeText={(text) => this.setPlayerData(text, "fullname")} />
					<View style={styles.input}>
						<RNPickerSelect
							onValueChange={(value) => this.setPosition(value)}
							items={[
								{ label: 'Defender', value: 'Defender' },
								{ label: 'Forward', value: 'Forward' },
								{ label: 'Keeper', value: 'Keeper' },
								{ label: 'Midfielder', value: 'Midfielder' },
								{ label: 'Winger', value: 'Winger' },
							]}
							style={{ fontSize: 25, fontWeight: "bold" }}
							placeholder={{ label: "Select player's position", value: null }}
						/>
					</View>

					<TextInput style={styles.input} placeholder="enter player's jersey" value={jersey} onChangeText={(text) => this.setNumbericData(text, "jersey")} />
					<TextInput style={styles.input} placeholder="enter height" value={height} onChangeText={(text) => this.setPlayerData(text, "height")} />
					<TextInput style={styles.input} placeholder="enter weight" value={weight} onChangeText={(text) => this.setPlayerData(text, "weight")} />

					<TouchableOpacity onPress={this.setPlayerDOB}>
						<Text style={styles.textLabel}>
							<Text><FontAwesome name='calendar' size={22} color={lightBlue} /> Choose DOB: </Text>
							<Text style={styles.dateSeleted}>{Moment(date).format('MM-DD-YYYY')}</Text>
						</Text>
					</TouchableOpacity>
					{<DateTimePickerModal
						isVisible={show}
						mode="date"
						onConfirm={this.setDate}
						onCancel={this.setPlayerDOB}
						maximumDate={new Date(newYear, 0, 1)}
					/>}
					<TouchableOpacity style={styles.btn} onPress={this.handleAddPlayer}>
						<Text style={styles.btnText}>ADD PLAYER</Text>
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
		backgroundColor: white,
		flex: 1,
	},
	row: {
		flex: 1,
		justifyContent: "center",
		paddingLeft: 40,
		paddingRight: 40,
	},
	homeTitle: {
		fontSize: 25,
		color: orange,
		textAlign: "center",
		width: '70%'
	},
	formText: {
		fontSize: 18,
		color: gray,
		marginTop: 15
	},
	formHeader: {
		fontSize: 32,
		color: black,
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
		marginBottom: 50
	},
	btnText: {
		color: "#FFFFFF",
		fontSize: 25,
		textAlign: "center",
		fontWeight: "bold",
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