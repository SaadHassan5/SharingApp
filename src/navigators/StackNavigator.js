import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { UserTab } from './userTab';
import HomeScreen from '../screens/HomeScreen';
import Splash from '../screens/Splash';



const MyStack = createStackNavigator();
class Stack extends Component {
  render() {
    return (
        <MyStack.Navigator initialRouteName={'Splash'} screenOptions={{headerShown:false}}>
          <MyStack.Screen name="Splash" component={Splash} />
          <MyStack.Screen name="LoginScreen" component={LoginScreen} />
          <MyStack.Screen name="RegisterScreen" component={RegisterScreen} />
          <MyStack.Screen name="UserTab" component={UserTab} />
          <MyStack.Screen name="HomeScreen" component={HomeScreen} />
        </MyStack.Navigator>
    )
  }
}



export default Stack;