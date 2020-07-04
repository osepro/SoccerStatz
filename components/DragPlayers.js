import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, PanResponder, Animated, ImageBackground, Modal, TouchableOpacity, } from "react-native";
import { black, orange, red, lightBlue, white, green } from "../utils/colors";
import { or } from "react-native-reanimated";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { savePlayerStats } from "../utils/api";
import { updateplayerstats } from "../actions/login";

const player = '../assets/jersey.png';

class DragPlayers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showDraggable: true,
			dropAreaValues: null,
			pan: new Animated.ValueXY(),
			opacity: new Animated.Value(1),
			modalVisible: false,
			playerDetails: '',
			add: 0,
			matchesplayes: 0,
			goals: 0,
			assists: 0,
			passes: 0,
			shots: 0,
			freekicks: 0,
		};

		this._val = { x: 0, y: 0 }
		this.state.pan.addListener((value) => this._val = value);

		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (e, gesture) => true,
			onPanResponderGrant: (e, gesture) => {
				this.state.pan.setOffset({
					x: this._val.x,
					y: this._val.y
				})
				this.state.pan.setValue({ x: 0, y: 0 })
			},
			onPanResponderTerminationRequest: (evt, gestureState) => false,
			onPanResponderMove: Animated.event([
				null, { dx: this.state.pan.x, dy: this.state.pan.y }
			]),
			onPanResponderRelease: (e, gesture) => {
				if (this.isDropArea(gesture)) {
					Animated.timing(this.state.opacity, {
						toValue: 1,
						duration: 1000
					}).start(() =>
						this.setState({
							showDraggable: true
						})
					);
				}
			}
		});
	}

	setVisible = () => {
		this.setState({
			modalVisible: !this.state.modalVisible,
		});
	}

	setModalVisible = (id) => {
		const { login } = this.props;

		login.players.map(player => {
			if (player.id === id) {
				this.setState({
					matchesplayes: player.matchesplayes,
					goals: player.goals,
					assists: player.assists,
					passes: player.passes,
					shots: player.shots,
					freekicks: player.freekicks,
				})
			}
		})
		this.setVisible()
	}

	updateModalDetails = (playerid) => {
		const { login, dispatch } = this.props;
		const updatedDetails = {
			matchesplayes: this.state.matchesplayes,
			goals: this.state.goals,
			assists: this.state.assists,
			passes: this.state.passes,
			shots: this.state.shots,
			freekicks: this.state.freekicks,
		}
		savePlayerStats(login.id, playerid, updatedDetails).then(response => {
			if (response) {
				dispatch(updateplayerstats(playerid, updatedDetails))
			}
			else {
				alert('👎 an error occured while updating');
			}
		});
		this.setVisible();
	}

	updateStat = (operation, itemupdate) => {
		if (operation === 'add') {
			this.setState({
				[itemupdate]: this.state[itemupdate] + 1
			})
		}

		if (operation === 'subtract') {
			this.setState({
				[itemupdate]: this.state[itemupdate] - 1
			})
		}
	}

	isDropArea(gesture) {
		return gesture.moveY < 200;
	}
	componentDidMount() {

	}

	render() {
		return (
			<View style={{ width: "100%", alignItems: "center" }}>
				{this.renderDraggable()}
			</View>
		);
	}

	renderDraggable() {
		const panStyle = {
			transform: this.state.pan.getTranslateTransform()
		}

		const { modalVisible, playerDetails } = this.state;

		const { no, name, id } = this.props;

		if (this.state.showDraggable) {
			return (
				<View style={{ position: "relative", }}>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert("Modal has been closed.");
						}}
					>
						<View style={styles.centeredView}>
							<View style={styles.topViewHeader}>
								<Text style={styles.topHeader}>Add Player's Stats</Text>
							</View>
							<View style={styles.modalView}>
								<Text style={styles.modalText}>Matches Played</Text>
								<View style={styles.statsupdate}>
									<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'matchesplayes')} disabled={this.state.matchesplayes === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
									<Text style={styles.statsvalue}>{this.state.matchesplayes}</Text>
									<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'matchesplayes')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
								</View>
								<Text style={styles.modalText}>Goals</Text>
								<View style={styles.statsupdate}>
									<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'goals')} disabled={this.state.goals === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
									<Text style={styles.statsvalue}>{this.state.goals}</Text>
									<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'goals')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
								</View>
								<Text style={styles.modalText}>Assists</Text>
								<View style={styles.statsupdate}>
									<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'assists')} disabled={this.state.assists === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
									<Text style={styles.statsvalue}>{this.state.assists}</Text>
									<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'assists')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
								</View>
								<Text style={styles.modalText}>Passes</Text>
								<View style={styles.statsupdate}>
									<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'passes')} disabled={this.state.passes === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
									<Text style={styles.statsvalue}>{this.state.passes}</Text>
									<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'passes')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
								</View>
								<Text style={styles.modalText}>Shots</Text>
								<View style={styles.statsupdate}>
									<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'shots')} disabled={this.state.shots === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
									<Text style={styles.statsvalue}>{this.state.shots}</Text>
									<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'shots')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
								</View>

								<Text style={styles.modalText}>Free Kicks</Text>
								<View style={styles.statsupdate}>
									<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'freekicks')} disabled={this.state.freekicks === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
									<Text style={styles.statsvalue}>{this.state.freekicks}</Text>
									<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'freekicks')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
								</View>
								<View style={styles.statsupdateview}>
									<TouchableOpacity
										style={styles.updateButton}
										onPress={() => this.updateModalDetails(id)}
									>
										<Text style={styles.textStyle}>Update <FontAwesome name='check' size={15} color={green} /></Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.cancelButton}
										onPress={this.setModalVisible}
									>
										<Text style={styles.textStyle}>Cancel <FontAwesome name='times' size={15} color={red} /></Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</Modal>
					<Animated.View
						{...this.panResponder.panHandlers}
						style={[panStyle, { opacity: this.state.opacity }, styles.pitchItems]
						}
					>
						<View style={styles.pitchItems}>
							<ImageBackground source={require(player)} style={styles.player}>
								<Text style={styles.playername}>{name}</Text>
								<Text style={styles.playernumber}>{no}</Text>
							</ImageBackground>
							<TouchableOpacity
								onPress={() => this.setModalVisible(id)}
							>
								<Text>⚽️</Text>
							</TouchableOpacity>
						</View>
					</Animated.View>
				</View>
			);
		}
	}
}

DragPlayers.propTypes = {
	no: PropTypes.string,
	name: PropTypes.string,
};

const styles = StyleSheet.create({
	row: {
		flexDirection: "row"
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	topViewHeader: {
		backgroundColor: lightBlue,
		padding: 10,
	},
	statsupdate: {
		flexDirection: "row",
		marginBottom: 12,
	},
	statsupdateview: {
		flexDirection: "row",
		marginTop: 30,
	},
	statsubstr: {
		color: white,
		fontWeight: "bold",
		fontSize: 18,
	},
	statsaddbtn: {
		borderRadius: 3,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 15,
		paddingRight: 15,
		elevation: 2,
		backgroundColor: lightBlue,
	},
	statsbtn: {
		borderRadius: 3,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 15,
		paddingRight: 15,
		elevation: 2,
		backgroundColor: red,
	},
	statsvalue: {
		paddingRight: 10,
		paddingLeft: 10,
		paddingTop: 5,
		fontWeight: "bold",
	},
	topHeader: {
		color: white,
		fontWeight: "bold",
	},
	modalView: {
		margin: 5,
		width: 300,
		backgroundColor: "white",
		borderRadius: 10,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	openButton: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	updateButton: {
		backgroundColor: lightBlue,
		borderRadius: 10,
		marginRight: 10,
		padding: 10,
		elevation: 2
	},
	cancelButton: {
		backgroundColor: black,
		borderRadius: 10,
		padding: 10,
		elevation: 2
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	dropZone: {
		height: 200,
		backgroundColor: "#00334d"
	},
	text: {
		marginTop: 25,
		marginLeft: 5,
		marginRight: 5,
		textAlign: "center",
		color: "#fff",
		fontSize: 25,
		fontWeight: "bold"
	},
	pitchItems: {
		justifyContent: "flex-end",
		width: 60,
		height: 40,
		marginTop: 32,
	},
	player: {
		padding: 10,
		marginRight: 10,
	},
	playernumber: {
		color: black,
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 10
	},
	playername: {
		color: black,
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 7
	},
});

function mapStateToProps({ login }) {
	return {
		login
	}
}

export default connect(mapStateToProps)(DragPlayers);