import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';

import CS571 from '@cs571/mobile-client'
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import BadgerGuestSignUpScreen from './screens/BadgerGuestSignUpScreen';



const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const regex = /^\d{7}$/;

  useEffect(() => {
    // hmm... maybe I should load the chatroom names here
    fetch("https://cs571.org/rest/f24/hw9/chatrooms", {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId()
      },
    })
      .then(res => res.json()).then(json => {
        setChatrooms(json)
      })
  }, []);

  function handleLogin(username, pin) {
    // pin and repeatPin must be 7 digits
    if (!regex.test(pin)) {
      Alert.alert("Your pin must be a 7-digit number!");
      return;
    }
    // must input username and pin
    if (username === "" || pin === "") {
      Alert.alert("You must provide both a username and pin!");
      return;
    }

    fetch("https://cs571.org/rest/f24/hw9/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": CS571.getBadgerId()
      },
      body: JSON.stringify({
        username: username,
        pin: pin
      })
    }).then(res => {
      if (res.status === 401) {
        Alert.alert("Incorrect login, please try again!");
      } else if (res.status === 200) {
        Alert.alert("Login was successful!");
        setIsLoggedIn(true);
        res.json().then(data => {
          SecureStore.setItemAsync('token', data.token)
          SecureStore.setItemAsync('username', username)
        })
      }
    })
  }

  function handleSignup(username, pin, confirmPin) {
    // pin and repeatPin must be 7 digits
    if (!regex.test(pin) || !regex.test(confirmPin)) {
      Alert.alert("Your pin must be a 7-digit number!");
      return;
    }
    // must input username and pin
    if (username === "" || pin === "" || confirmPin === "") {
      Alert.alert("You must provide both a username and pin!");
      return;
    }
    // pin and repeatPin must match
    if (pin !== confirmPin) {
      Alert.alert("Your pins do not match!");
      return;
    }

    fetch("https://cs571.org/rest/f24/hw9/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": CS571.getBadgerId()
      },
      body: JSON.stringify({
        username: username,
        pin: pin
      })
    }).then(res => {
      if (res.status === 409) {
        Alert.alert("That username has already been taken!");
      } else if (res.status === 200) {
        Alert.alert("Registration was successful!");
        setIsLoggedIn(true);
        setIsRegistering(false)
      }
    }
    )
  }

  function handleLogout() {
    SecureStore.deleteItemAsync('token');
    SecureStore.deleteItemAsync('username');
    setIsLoggedIn(false);
  }

  if (isLoggedIn || isGuest) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} isGuest={isGuest} />}
              </ChatDrawer.Screen>
            })
          }
          {isGuest ?
            <ChatDrawer.Screen name="Signup" >
              {() => <BadgerGuestSignUpScreen setIsRegistering={setIsRegistering} setIsGuest={setIsGuest} />}
            </ChatDrawer.Screen>
            :
            <ChatDrawer.Screen name="Logout" >
              {() => <BadgerLogoutScreen handleLogout={handleLogout} />}
            </ChatDrawer.Screen>
          }
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} setIsGuest={setIsGuest} />
  }
}