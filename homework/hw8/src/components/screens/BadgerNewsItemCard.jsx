import { Text, Image, Pressable } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

function BadgerNewsItemCard(props) {
  const navigation = useNavigation();

  const goToArticle = () => {
    navigation.push("Article", {
      fullArticleId: props.fullArticleId,
    })
  }

  return (
    <Pressable onPress={goToArticle}>
      <Card style={{ marginTop: 16, padding: 12 }}>
        <Image source={{ uri: `https://raw.githubusercontent.com/CS571-F24/hw8-api-static-content/main/${props.img}` }} style={{ width: '100%', height: 200 }} />
        <Text style={{ fontSize: 18 }}>{props.title}</Text>
      </Card>
    </Pressable>
  );
}

export default BadgerNewsItemCard;