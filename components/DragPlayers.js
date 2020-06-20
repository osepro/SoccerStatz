import React, { Component } from "react";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, PanResponder, Animated, ImageBackground } from "react-native";
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
						toValue: 0,
						duration: 1000
					}).start(() =>
						this.setState({
							showDraggable: false
						})
					);
				}
			}
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

		const { no, name } = this.props;
		if (this.state.showDraggable) {
			return (
				<View style={{ position: "relative", }}>
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