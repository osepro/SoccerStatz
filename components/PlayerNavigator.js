import { createStackNavigator } from "react-navigation";

import ViewPlayer from "./ViewPlayer";
import PlayerProfile from "./PlayerProfile";

const PlayerNavigator = createStackNavigator({
	ViewPlayer: {
		navigationOptions: {
			header: null
		},
		screen: ViewPlayer
	},

	PlayerProfile: {
		navigationOptions: {
			header: null
		},
		screen: PlayerProfile
	}
});

PlayerNavigator.navigationOptions = ({ navigation }) => ({
	tabBarVisible: navigation.state.index === 0,
	swipeEnabled: navigation.state.index === 0
});

export default PlayerNavigator;