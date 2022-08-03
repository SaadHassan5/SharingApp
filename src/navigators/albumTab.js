import * as React from 'react';
import { Image, Settings, Text, TouchableOpacity, View } from 'react-native';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconMat from "react-native-vector-icons/MaterialIcons"
import IconFoundation from "react-native-vector-icons/Foundation"
import IconMatComunity from "react-native-vector-icons/MaterialCommunityIcons"
import IconEntypo from "react-native-vector-icons/Entypo"
import { colors } from '../theme';
import { HP, palette, WP } from '../assets/config';
import IconScanner from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import fontFamily from '../assets/config/fontFamily';
import LoginScreen from '../screens/LoginScreen';
import UserQr from '../screens/UserQr';
import Profile from '../screens/Profile';
import RecieveImages from '../screens/recieveImages';
import Friends from '../screens/Friends';
import AllRecievePhotos from '../screens/AllRecievePhotos';
import AllPhotos from '../screens/AllPhotos';
import AlbumQr from '../screens/AlbumQr';

const ScannerButton = (prop) => {
  return (
    <TouchableOpacity onPress={()=>{prop.navigation?.navigate('UserQr')}} style={{ backgroundColor: 'black', width: WP(20), height: WP(20), borderRadius: WP(10), marginTop: -HP(5),justifyContent:'center',alignItems:'center',borderWidth:2,borderColor:palette.lighterGrey}}>
      <IconMat name='qr-code-scanner' color={colors.primary} size={30} />
    </TouchableOpacity>
  )
}
const Tab = createBottomTabNavigator();

export function AlbumTab(props) {
  return (
    <Tab.Navigator

      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          // borderWidth: 1,
          borderColor: 'black',
          paddingLeft: 20, paddingRight: 20,
          // height: HP(9),
          position: 'absolute',
          bottom: 0
        }
      }}

    >
      
      <Tab.Screen name="AllPhotos" initialParams={props?.route?.params} component={AllPhotos}
        options={{
          // tabBarLabel: true,
          // title: 'Group',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <IconMat name={'photo'} size={20} color={focused ? "black" : "grey"} />
              <Text style={{ color: focused ? "black" : "grey", fontFamily: fontFamily.bold, fontSize: 12 }}>Photos</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="QR" initialParams={props?.route?.params} component={AlbumQr}
        options={{
          // tabBarLabel: true,
          // title: 'Group',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <IconMat name={'qr-code'} size={20} color={focused ? "black" : "grey"} />
              <Text style={{ color: focused ? "black" : "grey", fontFamily: fontFamily.bold, fontSize: 12 }}>QR</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="Recieve" initialParams={props?.route?.params} component={RecieveImages}
        options={{
          // tabBarLabel: true,
          // title: 'Group',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <IconMatComunity name={'download'} size={20} color={focused ? "black" : "grey"} />
              <Text style={{ color: focused ? "black" : "grey", fontFamily: fontFamily.bold, fontSize: 12 }}>RecieveImages</Text>
            </View>
          )
        }}
      />


    </Tab.Navigator >
  );
}
