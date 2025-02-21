import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BadgerNewsScreen from '../screens/BadgerNewsScreen';
import BadgerNewsDetail from '../screens/BadgerNewsDetail';

// navigate to article summary and article detail

const NewsStack = createNativeStackNavigator();

function BadgerNewsStack() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen name="Articles" component={BadgerNewsScreen} options={{ headerShown: false }} />
      <NewsStack.Screen name="Article" component={BadgerNewsDetail} options={{ headerShown: false }} />
    </NewsStack.Navigator>
  );
}

export default BadgerNewsStack;