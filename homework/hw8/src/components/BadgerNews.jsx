import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import BadgerTabs from './navigation/BadgerTabs';
import PreferenceContext from '../context/PreferenceContext';

export default function BadgerNews(props) {

  const [prefs, setPrefs] = useState({});

  return (
    <PreferenceContext.Provider value={[prefs, setPrefs]}>
      <NavigationContainer>
        <BadgerTabs />
      </NavigationContainer>
    </PreferenceContext.Provider>
  );
}