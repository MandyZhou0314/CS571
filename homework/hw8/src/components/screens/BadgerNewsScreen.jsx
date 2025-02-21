import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native";
import { useEffect, useState, useContext } from "react";
import BadgerNewsItemCard from "./BadgerNewsItemCard";
import CS571 from '@cs571/mobile-client';
import PreferenceContext from '../../context/PreferenceContext';

function BadgerNewsScreen(props) {

    const [newsItems, setNewsItems] = useState([]);
    const [prefs, setPrefs] = useContext(PreferenceContext);

    useEffect(() => {
        fetch('https://cs571.org/rest/f24/hw8/articles', {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(response => response.json())
            .then(data => {
                setNewsItems(data)
                let p = {}
                data.map(item => {
                    item.tags.map(tag => {
                        p[tag] = true
                    })
                })
                setPrefs(p)
            });
    }, []);

    return <ScrollView>
        <Text style={styles.title}>Articles</Text>

        {
            newsItems
                .filter(item => {
                    for (let tag of item.tags) {
                        if (prefs[tag] === false) {
                            return false
                        }
                    }
                    return true
                })
                .map(item => <BadgerNewsItemCard key={item.id} {...item}
                />)
        }

    </ScrollView>
}

export default BadgerNewsScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        marginTop: 80,
        fontWeight: 'bold',
    },
});