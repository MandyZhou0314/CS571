import { Text, View, Switch, StyleSheet, ScrollView } from "react-native";
import { useContext } from 'react'
import PreferenceContext from '../../context/PreferenceContext';
import { Card } from 'react-native-paper';

function BadgerPreferencesScreen(props) {

    const [prefs, setPrefs] = useContext(PreferenceContext);
    const toggleSwitch = (tag) => {
        const updatedPreferences = { ...prefs, [tag]: !prefs[tag] };
        setPrefs(updatedPreferences);
    };

    return <ScrollView>
        {
            Object.keys(prefs).map(tag =>
                <Card>
                    <View key={tag} style={styles.preferenceItem}>
                        <Text style={{ justifyContent: 'center', alignItems: 'center', }}>
                            Currently {prefs[tag] ? "" : "NOT "}showing {tag} articles.
                        </Text>
                        <View style={{ height: 15 }} />

                        <Switch
                            key={tag}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={prefs[tag] ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch(tag)}
                            value={prefs[tag]}
                        />
                    </View>
                </Card>
            )
        }

    </ScrollView>
}

export default BadgerPreferencesScreen;

const styles = StyleSheet.create({
    preferenceItem: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 20,
    },
}
);