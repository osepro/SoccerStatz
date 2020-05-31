import React, { Component } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, StatusBar, Picker } from "react-native"
import { white, orange, green, black, gray, blue, lightgray, } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { saveUser, getUser } from "../utils/api";
import { RandomGeneratedNumber } from "../utils/helpers";
import { addUser } from "../actions/register";
import { connect } from "react-redux";
import { Base64 } from 'js-base64';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

class AddGame extends Component {
	state = {
		gamelocation: '',
		date: new Date(1598051730000),
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

	setDate = (event, selectedDate) => {
		const currentDate = selectedDate || this.state.date;
		this.setState({
			show: true,
			date: currentDate
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
		const { yourteam, opponent, venue, } = this.state;
		const { dispatch } = this.props;

		if (yourteam.length > 0 && opponent.length > 0) {
			if (password !== cpassword) alert('👎 password does not match');
			else {
				const user = {
					id: RandomGeneratedNumber(),
					name: this.state.username,
					password: Base64.encode(this.state.password.toLocaleLowerCase()),
				}
				saveUser(user).then(data => {
					if (data) {
						dispatch(addUser(user.id, user.name, user.password));
						alert('👍account successfully created');
						this.props.navigation.navigate('Login');
					}
					else {
						alert('👎error!! username name already exist');
					}
				});
			}
		}
		else alert('😏 compulsory fields empty');
	}


	render() {
		const { yourteam, opponent, venue, show, date } = this.state;
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
						<Text style={styles.textLabel}>Click to set game date: {Moment(date).format('MM-DD-YYYY')}</Text>
					</TouchableOpacity>
					{show && <DateTimePicker
						testID="dateTimePicker"
						timeZoneOffsetInMinutes={0}
						value={this.state.date}
						mode={this.state.mode}
						is24Hour={true}
						display="default"
						onChange={this.setDate}
					/>}
					<TouchableOpacity style={styles.btn} onPress={this.handleAddGame}>
						<Text style={styles.btnText}>Add Game</Text>
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

export default connect()(AddGame);