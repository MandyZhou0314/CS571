import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BadgerPreferencesScreen from '../screens/BadgerPreferencesScreen';
import BadgerNewsStack from './BadgerNewsStack';

// navigate to two tabs, news and pref
const BadgerNewsTabs = createBottomTabNavigator();

function BadgerTabs(props) {
    return <BadgerNewsTabs.Navigator>
        <BadgerNewsTabs.Screen name="News" component={BadgerNewsStack} options={{ headerShown: false }} />
        <BadgerNewsTabs.Screen name="Preferences" component={BadgerPreferencesScreen} />
    </BadgerNewsTabs.Navigator>

}

export default BadgerTabs;