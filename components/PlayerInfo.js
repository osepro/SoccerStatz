import React, { Component } from "react"
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, Dimensions } from "react-native"
import { white, orange, green, lightPurp, black, gray, blue, lightgray, lightBlue, red, purple } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getGame } from "../utils/api";
import { connect } from "react-redux";
import { PieChart, StackedBarChart } from 'react-native-chart-kit';
import Moment from "moment";


class PlayerInfo extends Component {

	render() {
		const { fullname, playerid, login } = this.props;
		const playerStats = login.players.filter(player => player.id === playerid)

		const home = login.matches.filter(matches => matches.matchfield === "Home")
		const away = login.matches.length - home.length;

		const datapie = [
			{
				name: "Home",
				population: home.length,
				color: orange,
				legendFontColor: "#7F7F7F",
				legendFontSize: 15
			},
			{
				name: "Away",
				population: away,
				color: blue,
				legendFontColor: "#7F7F7F",
				legendFontSize: 15
			},
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
			useShadowColorFromDataset: false
		};
		return (
			<ScrollView style={styles.container}>
				{
					<View>
						<View style={styles.item}>
							<View style={styles.profilepix}>
								<FontAwesome name='user-o' size={80} color={red} />
							</View>
							<View style={styles.name}>
								<Text style={styles.nameText}> {playerStats[0].fullname}</Text>
								<Text style={styles.details}> {playerStats[0].position}</Text>

								<Text style={styles.details}> {Math.floor(Moment(new Date()).diff(Moment(playerStats[0].dateofbirth, "YYYYMMDD"), 'years', true))}{' years'}</Text>
							</View>
						</View>
						{
							playerStats[0].position === "Keeper" ?

								(<View style={styles.item}>
									<View style={styles.gamestats}>
										<Text style={styles.nameText}> {'Stats'}</Text>
										<Text style={styles.details}> {'Total Matches Played:'}</Text>
										<Text style={styles.details}> {'Goals Against:'}</Text>
										<Text style={styles.details}> {'Saves Made:'}</Text>
										<Text style={styles.details}> {'Shot Against:'}</Text>
									</View>
									<View style={styles.name}>
										<Text style={styles.nameText}> {''}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].matchesplayes}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].goalagainst}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].savesmade}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].shotagainst}</Text>
									</View>
								</View>) : <View />
						}

						{
							playerStats[0].position === "Forward" || playerStats[0].position === "Winger" ?

								(<View style={styles.item}>
									<View style={styles.gamestats}>
										<Text style={styles.nameText}> {'Stats'}</Text>
										<Text style={styles.details}> {'Total Matches Played:'}</Text>
										<Text style={styles.details}> {'Goals:'}</Text>
										<Text style={styles.details}> {'Assists:'}</Text>
										<Text style={styles.details}> {'Passes:'}</Text>
										<Text style={styles.details}> {'Passes Completed:'}</Text>
										<Text style={styles.details}> {'Shots:'}</Text>
										<Text style={styles.details}> {'Shots on Target:'}</Text>
										<Text style={styles.details}> {'Dribbles:'}</Text>
										<Text style={styles.details}> {'Dribbles Completed:'}</Text>
									</View>
									<View style={styles.name}>
										<Text style={styles.nameText}> {''}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].matchesplayes}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].goals}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].assists}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].passes}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].passcompleted}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].shots}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].shotontarget}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].dribbles}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].dribblescompleted}</Text>
									</View>
								</View>) : <View />
						}

						{
							playerStats[0].position === "Midfielder" ?

								(<View style={styles.item}>
									<View style={styles.gamestats}>
										<Text style={styles.nameText}> {'Stats'}</Text>
										<Text style={styles.details}> {'Total Matches Played:'}</Text>
										<Text style={styles.details}> {'Goals:'}</Text>
										<Text style={styles.details}> {'Assists:'}</Text>
										<Text style={styles.details}> {'Shots:'}</Text>
										<Text style={styles.details}> {'Freekicks:'}</Text>
										<Text style={styles.details}> {'Short Passes:'}</Text>
										<Text style={styles.details}> {'Short Passes Completed:'}</Text>
										<Text style={styles.details}> {'Long Passes:'}</Text>
										<Text style={styles.details}> {'Long Passes Completed:'}</Text>
									</View>
									<View style={styles.name}>
										<Text style={styles.nameText}> {''}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].matchesplayes}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].goals}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].assists}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].shots}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].freekicks}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].shortpasses}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].shortpassescompleted}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].longpasses}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].longpassescompleted}</Text>
									</View>
								</View>) : <View />
						}

						{
							playerStats[0].position === "Defender" ?

								(<View style={styles.item}>
									<View style={styles.gamestats}>
										<Text style={styles.nameText}> {'Stats'}</Text>
										<Text style={styles.details}> {'Total Matches Played:'}</Text>
										<Text style={styles.details}> {'Goals:'}</Text>
										<Text style={styles.details}> {'Assists:'}</Text>
										<Text style={styles.details}> {'Tackles:'}</Text>
										<Text style={styles.details}> {'Tackles Won:'}</Text>
										<Text style={styles.details}> {'Pressure:'}</Text>
										<Text style={styles.details}> {'Blocks:'}</Text>
										<Text style={styles.details}> {'Clearance:'}</Text>
									</View>
									<View style={styles.name}>
										<Text style={styles.nameText}> {''}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].matchesplayes}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].goals}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].assists}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].tackles}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].tackleswon}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].pressure}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].blocks}</Text>
										<Text style={styles.statsdetails}> {playerStats[0].cleareance}</Text>
									</View>
								</View>) : <View />
						}


						<View style={styles.item}>
							<View style={styles.name}>
								<Text style={styles.nameText}> {'Total Home/Away Matches'}</Text>
								{playerStats[0].matchesplayes > 0 ?
									<PieChart
										data={datapie}
										width={350}
										height={220}
										chartConfig={chartConfig}
										accessor="population"
										backgroundColor="transparent"
										paddingLeft="5"
										absolute
									/> : <View style={styles.row}>
										<Text style={styles.details}>No Data available for analysis</Text>
									</View>}
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
								<Text style={styles.statsdetails}> N/A</Text>
								<Text style={styles.statsdetails}> N/A</Text>
								<Text style={styles.statsdetails}> N/A</Text>
								<Text style={styles.statsdetails}> N/A</Text>
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
								<Text style={styles.statsdetails}> N/A</Text>
								<Text style={styles.statsdetails}> N/A</Text>
								<Text style={styles.statsdetails}> N/A</Text>
								<Text style={styles.statsdetails}> N/A</Text>
								<Text style={styles.statsdetails}> N/A</Text>
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
		flex: 3,
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

export default connect(mapStateToProps)(PlayerInfo);