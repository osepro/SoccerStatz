import React, { Component } from "react"
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, Dimensions } from "react-native"
import { white, orange, green, lightPurp, black, gray, blue, lightgray, lightBlue, red, purple } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getGame } from "../utils/api";
import { connect } from "react-redux";
import { PieChart, StackedBarChart } from 'react-native-chart-kit'

function PlayerList(props) {
	const datapie = [
		{
			name: "Passes",
			population: 24,
			color: lightBlue,
			legendFontColor: "#7F7F7F",
			legendFontSize: 15
		},
		{
			name: "Shots",
			population: 18,
			color: lightPurp,
			legendFontColor: "#7F7F7F",
			legendFontSize: 15
		},
		{
			name: "Fouls",
			population: 10,
			color: purple,
			legendFontColor: "#7F7F7F",
			legendFontSize: 15
		},
		{
			name: "Penalty",
			population: 5,
			color: orange,
			legendFontColor: "#7F7F7F",
			legendFontSize: 15
		},
		{
			name: "Free Kicks",
			population: 12,
			color: green,
			legendFontColor: "#7F7F7F",
			legendFontSize: 15
		}
	];

	const data = {
		labels: ["Home", "Away"],
		legend: ["Won", "Intercepts", "Blocks"],
		data: [[7, 6, 4], [8, 6, 4]],
		barColors: [green, lightPurp, lightBlue]
	};

	const chartConfig = {
		backgroundGradientFrom: "#1E2923",
		backgroundGradientFromOpacity: 0,
		backgroundGradientTo: "#08130D",
		backgroundGradientToOpacity: 0.5,
		color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
		strokeWidth: 2, // optional, default 3
		barPercentage: 2,
		useShadowColorFromDataset: false // optional
	};

	return (
		<ScrollView style={styles.container}>
			{
				<View>
					<View style={styles.item}>
						<View style={styles.profilepix}>
							<FontAwesome name='user-secret' size={80} color={red} />
						</View>
						<View style={styles.name}>
							<Text style={styles.nameText}> {props.fullname}</Text>
							<Text style={styles.details}> {'Midfielder'}</Text>
							<Text style={styles.details}> {'Terre Haute Club 2019/2020'}</Text>
							<Text style={styles.details}> {'Indiana'}</Text>
							<Text style={styles.details}> {'12 years'}</Text>
						</View>
					</View>

					<View style={styles.item}>
						<View style={styles.gamestats}>
							<Text style={styles.nameText}> {'Stats'}</Text>
							<Text style={styles.details}> {'Total Matches Played:'}</Text>
							<Text style={styles.details}> {'Total Minutes Played:'}</Text>
							<Text style={styles.details}> {'All Competition Goals:'}</Text>
							<Text style={styles.details}> {'All Competition Assist:'}</Text>
							<Text style={styles.details}> {'Total Fouls Commited:'}</Text>
						</View>
						<View style={styles.name}>
							<Text style={styles.nameText}> {''}</Text>
							<Text style={styles.statsdetails}> {38}</Text>
							<Text style={styles.statsdetails}> {3043}</Text>
							<Text style={styles.statsdetails}> {18}</Text>
							<Text style={styles.statsdetails}> {15}</Text>
							<Text style={styles.statsdetails}> {24}</Text>
						</View>
					</View>

					<View style={styles.item}>
						<View style={styles.name}>
							<Text style={styles.nameText}> {'Match Analysis'}</Text>
							<PieChart
								data={datapie}
								width={350}
								height={220}
								chartConfig={chartConfig}
								accessor="population"
								backgroundColor="transparent"
								paddingLeft="5"
								absolute
							/>
						</View>
					</View>

					<View style={styles.item}>
						<View style={styles.gamestats}>
							<Text style={styles.nameText}> {'Right Foot'}</Text>
							<Text style={styles.details}> {'Shots:'}</Text>
							<Text style={styles.details}> {'Goals:'}</Text>
							<Text style={styles.details}> {'Assists:'}</Text>
							<Text style={styles.details}> {'Conversion Rate:'}</Text>
						</View>
						<View style={styles.name}>
							<Text style={styles.nameText}> {''}</Text>
							<Text style={styles.statsdetails}> {22}</Text>
							<Text style={styles.statsdetails}> {2}</Text>
							<Text style={styles.statsdetails}> {8}</Text>
							<Text style={styles.statsdetails}> {'72 %'}</Text>
						</View>
					</View>

					<View style={styles.item}>
						<View style={styles.gamestats}>
							<Text style={styles.nameText}> {'Left Foot'}</Text>
							<Text style={styles.details}> {'Shots:'}</Text>
							<Text style={styles.details}> {'Goals:'}</Text>
							<Text style={styles.details}> {'Assists:'}</Text>
							<Text style={styles.details}> {'Conversion Rate:'}</Text>
						</View>
						<View style={styles.name}>
							<Text style={styles.nameText}> {''}</Text>
							<Text style={styles.statsdetails}> {34}</Text>
							<Text style={styles.statsdetails}> {10}</Text>
							<Text style={styles.statsdetails}> {18}</Text>
							<Text style={styles.statsdetails}> {10}</Text>
							<Text style={styles.statsdetails}> {'56 %'}</Text>
						</View>
					</View>

					<View style={styles.item}>
						<View style={styles.name}>
							<Text style={styles.nameText}> {'Tackle % Analysis'}</Text>
							<StackedBarChart
								style={{ fontWeight: 'bold' }}
								data={data}
								width={350}
								height={220}
								chartConfig={chartConfig}
							/>
						</View>
					</View>

				</View>
			}
		</ScrollView>
	)
}

class PlayerProfile extends Component {

	state = {
		players: []
	}

	setMainHeader = () => {
		const { playername } = this.props.route.params;
		const { navigation } = this.props;
		navigation.setOptions({
			title: playername
		});
	}

	componentDidMount() {
		const { login } = this.props;
		getGame().then(user => this.setState({ players: user[login.id].players }));
	}

	render() {
		this.setMainHeader();
		const { playername } = this.props.route.params;
		return (<PlayerList fullname={playername} />)

	}
}

function mapStateToProps({ login }) {
	return {
		login
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: white,
		flex: 1
	},
	row: {
		flex: 1,
		justifyContent: "center"
	},
	listItem: {
		padding: 10
	},
	touchview: {
		padding: 1,
	},
	list: {
		padding: 8,
	},
	profilepix: {
		flex: 0.5,
		flexDirection: "row",
		justifyContent: "center",
		padding: 12,
	},
	gamestats: {
		flex: 1,
		justifyContent: "center",
		padding: 12,
	},
	name: {
		flex: 1,
		justifyContent: "center",
		paddingLeft: 8
	},
	nameText: {
		fontSize: 24,
		fontWeight: "bold",
		color: black,
	},
	details: {
		color: gray,
		marginTop: 5,
	},
	statsdetails: {
		color: black,
		marginTop: 5,
		fontWeight: "bold",
	},
	jersey: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center"
	},
	jerseyText: {
		fontSize: 20,
		fontWeight: "bold",
		color: blue,
	},
	item: {
		flex: 1,
		backgroundColor: white,
		flexDirection: 'row',
		borderRadius: Platform.OS === "ios" ? 8 : 2,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 8,
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: "rgba(0, 0, 0, 0.24)",
		shadowOffset: {
			width: 0,
			height: 3
		}
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
})

export default connect(mapStateToProps)(PlayerProfile);