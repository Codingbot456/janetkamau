// MainNavigator.js
import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from './constants/screenConstants';
import HomeScreen from '../screens/Home/HomeScreen';

const Stack = createNativeStackNavigator();
const isWeb = Platform.OS === 'web';

const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      detachInactiveScreens: false,
      animation: isWeb ? 'none' : 'slide_from_right',
    }}
  >
    <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
  </Stack.Navigator>
);

export default MainNavigator;