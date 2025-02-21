import { Button, Image, View, Text, StyleSheet, ScrollView, Animated, Pressable, Linking, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import CS571 from '@cs571/mobile-client';

function BadgerNewsDetail(props) {
  const params = props.route.params;
  const [newsItem, setNewsItem] = useState();
  const navigation = useNavigation();
  const fadeRef = useRef(new Animated.Value(0));

  useEffect(() => {
    fetch(`https://cs571.org/rest/f24/hw8/article?id=${params.fullArticleId}`, {
      headers: {
        "X-CS571-ID": CS571.getBadgerId()
      }
    })
      .then(response => response.json())
      .then(data => setNewsItem(data));
  }, []);

  useEffect(() => {
    Animated.timing(fadeRef.current, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true
    }).start()
  }, [])

  const handlePress = async (url) => {
    // const supported = await Linking.canOpenURL(url);
    // can use method above to check if the url is valid and then open url
    // can also use try/catch block to handle the error
    try {
      await Linking.openURL(url);
    } catch (e) {
      Alert.alert("Wrong website address");
    }
  };

  return <ScrollView style={styles.container}>
    <Text style={styles.title}>Article</Text>
    <Button title="<-Back!!!" onPress={() => {
      navigation.pop();
    }} />
    {
      newsItem ? <>
        <Animated.View style={{ opacity: fadeRef.current }}>
          <Image source={{ uri: `https://raw.githubusercontent.com/CS571-F24/hw8-api-static-content/main/${newsItem.img}` }} style={{ width: '100%', height: 200 }} />
          <View style={{ height: 15 }} />
          <Text style={{ fontSize: 20 }}>{newsItem.title}</Text>
          <View style={{ height: 15 }} />
          <Text style={{ fontSize: 16 }}>{newsItem.author} on {newsItem.posted}</Text>
          <Pressable onPress={() => handlePress(newsItem.url)}>
            <Text style={{ color: 'blue' }}>
              Read full article here</Text>
          </Pressable>
          <View style={{ height: 15 }} />
          <Text> {newsItem.body} </Text>
        </Animated.View>
      </>
        : <Text>The content is loading...</Text>
    }
  </ScrollView>
}

export default BadgerNewsDetail;


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  title: {
    fontSize: 30,
    marginTop: 80,
    fontWeight: 'bold',
  },
});

