import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { UserTab } from './userTab';
import HomeScreen from '../screens/HomeScreen';
import Splash from '../screens/Splash';
import UserQr from '../screens/UserQr';
import Scanner from '../screens/Scanner';
import UploadImageScreen from '../screens/UploadImageScreen';
import Profile from '../screens/Profile';
import UserAdmin from '../screens/UsersAdmin';
import UserCount from '../screens/UserCount';
import { TabNavigator } from './tabNavigator';
import RecieveImages from '../screens/recieveImages';
import AllPhotos from '../screens/AllPhotos';
import FriendProfile from '../screens/FriendProfile';
import AlbumDetail from '../screens/AlbumDetail';
import { AlbumTab } from './albumTab';
import OpenImage from '../screens/openImage';



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
          <MyStack.Screen name="UserQr" component={UserQr} />
          <MyStack.Screen name="Scanner" component={Scanner} />
          <MyStack.Screen name="UploadImageScreen" component={UploadImageScreen} />
          <MyStack.Screen name="Profile" component={Profile} />
          <MyStack.Screen name="UserAdmin" component={UserAdmin} />
          <MyStack.Screen name="UserCount" component={UserCount} />
          <MyStack.Screen name="TabNavigator" component={TabNavigator} />
          <MyStack.Screen name="RecieveImages" component={RecieveImages} />
          <MyStack.Screen name="AllPhotos" component={AllPhotos} />
          <MyStack.Screen name="FriendProfile" component={FriendProfile} />
          <MyStack.Screen name="AlbumDetail" component={AlbumDetail} />
          <MyStack.Screen name="AlbumTab" component={AlbumTab} />
          <MyStack.Screen name="OpenImage" component={OpenImage} />
        </MyStack.Navigator>
    )
  }
}



export default Stack;