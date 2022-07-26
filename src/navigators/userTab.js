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

// const ScannerButton = (prop) => {
//   return (
//     <TouchableOpacity onPress={()=>{prop.navigation?.navigate('QRR')}} style={{ backgroundColor: '#fff', width: WP(20), height: WP(20), borderRadius: WP(10), marginTop: -HP(5),justifyContent:'center',alignItems:'center',borderWidth:2,borderColor:palette.lighterGrey}}>
//       <IconScanner name='qr-code-scanner' color={colors.primary} size={30} />
//     </TouchableOpacity>
//   )
// }
const Tab = createBottomTabNavigator();

export function UserTab(props) {
  return (
    <Tab.Navigator

      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          // borderWidth: 1,
          borderColor: '#fff',
          paddingLeft: 20, paddingRight: 20,
          // height: HP(9),
          position: 'absolute',
          bottom: 0
        }
      }}

    >
      <Tab.Screen name="HomeScreen" component={HomeScreen}
        options={{
          // tabBarLabel: true,
          // title: 'Group',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <IconMat name={'home'} size={20} color={focused ? "#fff" : "grey"} />
              <Text style={{ color: focused ? "#fff" : "grey", fontFamily: fontFamily.bold, fontSize: 12 }}>Home</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="Profile" component={HomeScreen}
        options={{
          // tabBarLabel: true,
          // title: 'Group',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <IconEntypo name={'user'} size={20} color={focused ? "#fff" : "grey"} />
              <Text style={{ color: focused ? "#fff" : "grey", fontFamily: fontFamily.bold, fontSize: 12 }}>Profile</Text>
            </View>
          )
        }}
      />


    </Tab.Navigator >
  );
}
