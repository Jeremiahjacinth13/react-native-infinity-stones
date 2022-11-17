import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import type {RootStackParamList} from '../types';
import HomeScreen from '../screens/Home';
import HelloWorld from '../screens/HelloWorld';

const StackNavigator = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator initialRouteName="HelloWorld">
        {/* // screenOptions={{headerShown: false}}> */}
        <StackNavigator.Screen name="Home" component={HomeScreen} />
        <StackNavigator.Screen name="HelloWorld" component={HelloWorld} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
