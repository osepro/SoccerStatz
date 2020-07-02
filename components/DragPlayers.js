import React, { Component } from "react";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, PanResponder, Animated, ImageBackground, Modal, TouchableOpacity, } from "react-native";
import { black } from "../utils/colors";

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
			playerDetails: ''
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

	setModalVisible = () => {
		this.setState({
			modalVisible: !this.state.modalVisible,
		});
	}

	isDropArea(gesture) {
		return gesture.moveY < 200;
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

		const { no, name } = this.props;
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
								<Text style={styles.modalText}>Hello World!</Text>

								<TouchableOpacity
									style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
									onPress={this.setModalVisible}
								>
									<Text style={styles.textStyle}>Hide Modal</Text>
								</TouchableOpacity>
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
								style={styles.openButton}
								onPress={this.setModalVisible}
							>
								<Text>↗️</Text>
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
	name: PropTypes.string
};

const styles = StyleSheet.create({
	row: {
		flexDirection: "row"
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
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
		backgroundColor: "#F194FF",
		borderRadius: 20,
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
		marginTop: 8,
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

export default DragPlayers;