import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, PanResponder, Animated, ImageBackground, Modal, TouchableOpacity, Image } from "react-native";
import { black, orange, red, lightBlue, white, green, gray } from "../utils/colors";
import { or } from "react-native-reanimated";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { savePlayerStats } from "../utils/api";
import { updateplayerstats } from "../actions/login";

const player = '../assets/jersey.png';
const statzbg = '../assets/SoccerField.png';

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
			shortpasses: 0,
			shortpassescompleted: 0,
			longpasses: 0,
			longpassescompleted: 0,
			passcompleted: 0,
			shotontarget: 0,
			dribbles: 0,
			dribblescompleted: 0,
			tackles: 0,
			tackleswon: 0,
			pressure: 0,
			blocks: 0,
			cleareance: 0,
			goalagainst: 0,
			shotagainst: 0,
			savesmade: 0,
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
			if (player.id === id && player.position === 'Midfielder') {
				this.setState({
					matchesplayes: player.matchesplayes,
					goals: player.goals || 0,
					assists: player.assists || 0,
					shots: player.shots || 0,
					freekicks: player.freekicks || 0,
					shortpasses: player.shortpasses || 0,
					shortpassescompleted: player.shortpassescompleted || 0,
					longpasses: player.longpasses || 0,
					longpassescompleted: player.longpassescompleted || 0,
				})
			}

			if (player.id === id && player.position === 'Forward') {
				this.setState({
					matchesplayes: player.matchesplayes || 0,
					goals: player.goals || 0,
					assists: player.assists || 0,
					passes: player.passes || 0,
					passescompleted: player.passcompleted || 0,
					shots: player.shots || 0,
					shotontarget: player.shotontarget || 0,
					dribbles: player.dribbles || 0,
					dribblescompleted: player.dribblescompleted || 0,
					freekicks: player.freekicks || 0,
				})
			}

			if (player.id === id && player.position === 'Defender') {
				this.setState({
					matchesplayes: player.matchesplayes || 0,
					goals: player.goals || 0,
					assists: player.assists || 0,
					tackles: player.tackles || 0,
					tackleswon: player.tackleswon || 0,
					pressure: player.pressure || 0,
					blocks: player.blocks || 0,
					cleareance: player.cleareance || 0,
				})
			}

			if (player.id === id && player.position === 'Winger') {
				this.setState({
					matchesplayes: player.matchesplayes || 0,
					goals: player.goals || 0,
					assists: player.assists || 0,
					passes: player.passes || 0,
					passescompleted: player.passcompleted || 0,
					shots: player.shots || 0,
					shotontarget: player.shotontarget || 0,
					dribbles: player.dribbles || 0,
					dribblescompleted: player.dribblescompleted || 0,
					freekicks: player.freekicks || 0,
				})
			}

			if (player.id === id && player.position === 'Keeper') {
				this.setState({
					matchesplayes: player.matchesplayes || 0,
					goals: player.goals || 0,
					goalagainst: player.goalagainst || 0,
					shotagainst: player.shotagainst || 0,
					savesmade: player.savesmade || 0,
				})
			}
		})
		this.setVisible()
	}

	updateModalDetails = (playerid, position) => {
		const { login, dispatch } = this.props;
		let updatedDetails = {};
		const { matchesplayes, goals, assists, shots, freekicks, shortpasses, shortpassescompleted,
			longpasses, longpassescompleted, passes, passcompleted, shotontarget, dribbles, dribblescompleted,
			tackles, tackleswon, pressure, blocks, cleareance, goalagainst, shotagainst, savesmade } = this.state;

		if (position === 'Midfielder') {
			updatedDetails = {
				matchesplayes,
				goals,
				assists,
				shots,
				freekicks,
				shortpasses,
				shortpassescompleted,
				longpasses,
				longpassescompleted,
			}
		}

		if (position === 'Forward' || position === 'Winger') {
			updatedDetails = {
				matchesplayes,
				goals,
				assists,
				passes,
				passcompleted,
				shots,
				shotontarget,
				dribbles,
				dribblescompleted,
			}
		}

		if (position === 'Defender') {
			updatedDetails = {
				matchesplayes,
				goals,
				assists,
				tackles,
				tackleswon,
				pressure,
				blocks,
				cleareance,
			}
		}

		if (position === 'Keeper') {
			updatedDetails = {
				matchesplayes,
				goalagainst,
				shotagainst,
				savesmade,
			}
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

		const { modalVisible, playerDetails, matchesplayes, goals, assists, shots, freekicks, passes, shortpasses,
			shortpassescompleted, longpasses, longpassescompleted, passcompleted, shotontarget, dribbles, dribblescompleted,
			tackles, tackleswon, pressure, blocks, cleareance, goalagainst, shotagainst, savesmade
		} = this.state;

		const { no, name, id, position } = this.props;

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

							<View style={styles.modalView}>
								<ImageBackground source={require(statzbg)} style={styles.backgroundImage}>
									{(position === 'Midfielder' || position === 'Defender' || position === 'Forward' || position === 'Winger' || position === 'Keeper') &&
										(<View>
											<Text style={styles.modalText}>Matches Played</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'matchesplayes')} disabled={matchesplayes === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{matchesplayes}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'matchesplayes')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)
									}
									{(position === 'Midfielder' || position === 'Defender' || position === 'Forward' || position === 'Winger') &&
										(<View>
											<Text style={styles.modalText}>Goals</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'goals')} disabled={goals === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{goals}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'goals')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)
									}
									{(position === 'Midfielder' || position === 'Defender' || position === 'Forward' || position === 'Winger') &&
										(<View>
											<Text style={styles.modalText}>Assists</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'assists')} disabled={assists === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{assists}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'assists')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Midfielder') &&
										(<View>
											<Text style={styles.modalText}>Shots</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'shots')} disabled={shots === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{shots}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'shots')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Midfielder') &&
										(<View>
											<Text style={styles.modalText}>Freekicks</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'freekicks')} disabled={freekicks === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{freekicks}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'freekicks')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Midfielder') &&
										(<View>
											<Text style={styles.modalText}>Short Passes</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'shortpasses')} disabled={shortpasses === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{shortpasses}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'shortpasses')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Midfielder') &&
										(<View>
											<Text style={styles.modalText}>Short Passes CT</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'shortpassescompleted')} disabled={shortpassescompleted === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{shortpassescompleted}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'shortpassescompleted')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Midfielder') &&
										(<View>
											<Text style={styles.modalText}>Long Passes</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'longpasses')} disabled={longpasses === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{longpasses}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'longpasses')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Midfielder') &&
										(<View>
											<Text style={styles.modalText}>Long Passes CT</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'longpassescompleted')} disabled={longpassescompleted === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{longpassescompleted}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'longpassescompleted')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Forward' || position === 'Winger') &&
										(<View>
											<Text style={styles.modalText}>Passes</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'passes')} disabled={passes === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{passes}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'passes')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Forward' || position === 'Winger') &&
										(<View>
											<Text style={styles.modalText}>Passes CT</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'passcompleted')} disabled={passcompleted === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{passcompleted}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'passcompleted')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Forward' || position === 'Winger') &&
										(<View>
											<Text style={styles.modalText}>Shots</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'shots')} disabled={shots === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{shots}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'shots')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Forward' || position === 'Winger') &&
										(<View>
											<Text style={styles.modalText}>Shots on Target</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'shotontarget')} disabled={shotontarget === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{shotontarget}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'shotontarget')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Forward' || position === 'Winger') &&
										(<View>
											<Text style={styles.modalText}>Dribbles</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'dribbles')} disabled={dribbles === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{dribbles}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'dribbles')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Forward' || position === 'Winger') &&
										(<View>
											<Text style={styles.modalText}>Dribbles CT</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'dribblescompleted')} disabled={dribblescompleted === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{dribblescompleted}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'dribblescompleted')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Defender') &&
										(<View>
											<Text style={styles.modalText}>Tackles</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'tackles')} disabled={tackles === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{tackles}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'tackles')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Defender') &&
										(<View>
											<Text style={styles.modalText}>Tackles Won</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'tackleswon')} disabled={tackleswon === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{tackleswon}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'tackleswon')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Defender') &&
										(<View>
											<Text style={styles.modalText}>Pressure</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'pressure')} disabled={pressure === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{pressure}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'pressure')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Defender') &&
										(<View>
											<Text style={styles.modalText}>Blocks</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'blocks')} disabled={blocks === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{blocks}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'blocks')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Defender') &&
										(<View>
											<Text style={styles.modalText}>Cleareance</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'cleareance')} disabled={cleareance === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{cleareance}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'cleareance')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Keeper') &&
										(<View>
											<Text style={styles.modalText}>Goal Against</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'goalagainst')} disabled={goalagainst === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{goalagainst}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'goalagainst')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Keeper') &&
										(<View>
											<Text style={styles.modalText}>Shot Against</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'shotagainst')} disabled={shotagainst === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{shotagainst}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'shotagainst')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									{(position === 'Keeper') &&
										(<View>
											<Text style={styles.modalText}>Saves Made</Text>
											<View style={styles.statsupdate}>
												<TouchableOpacity style={styles.statsbtn} onPress={() => this.updateStat('subtract', 'savesmade')} disabled={savesmade === 0 ? true : false}><Text style={styles.statsubstr}>-</Text></TouchableOpacity>
												<Text style={styles.statsvalue}>{savesmade}</Text>
												<TouchableOpacity style={styles.statsaddbtn} onPress={() => this.updateStat('add', 'savesmade')}><Text style={styles.statsubstr}>+</Text></TouchableOpacity>
											</View>
										</View>)}

									<View style={styles.statsupdateview}>
										<TouchableOpacity
											style={styles.updateButton}
											onPress={() => this.updateModalDetails(id, position)}
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
								</ImageBackground>
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
	no: PropTypes.number,
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
		color: black,
	},
	topHeader: {
		color: white,
		fontWeight: "bold",
	},
	modalView: {
		margin: 5,
		width: 320,
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
	backgroundImage: {
		resizeMode: 'cover',
		justifyContent: "center",
		alignItems: "center",
		width: '100%',
		height: '100%'
	},
	updateButton: {
		backgroundColor: lightBlue,
		borderRadius: 5,
		marginRight: 10,
		padding: 10,
		elevation: 2
	},
	cancelButton: {
		backgroundColor: black,
		borderRadius: 5,
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
		textAlign: "center",
		color: black,
		fontSize: 14,
		fontWeight: "bold",
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