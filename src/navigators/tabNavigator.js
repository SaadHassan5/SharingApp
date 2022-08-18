import * as React from 'react';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconEntypo from "react-native-vector-icons/Entypo"
import IconPost from "react-native-vector-icons/MaterialCommunityIcons"
import { palette } from '../assets/config';
import UserAdmin from '../screens/UsersAdmin';
import AdminAlbum from '../screens/AdminAlbums';

const Tab = createBottomTabNavigator();

export function TabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      // labeled={false}
      // barStyle={{
      //   backgroundColor: '#4B4B4B',
      //   borderTopLeftRadius: 30,
      //   borderTopRightRadius: 30,
      //   borderWidth: 1,
      //   borderColor: '#707070',
      //   paddingLeft: 20, paddingRight: 20,
      //   height: HP(9),
      //   // padding: HP(1),
      //   // paddingBottom:HP(0)
      // }}

      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          // borderWidth: 1,
          borderColor: '#fff',
          paddingLeft: 20, paddingRight: 20,
          // height: HP(9),
          position: 'absolute',
          bottom:0

          // padding: HP(1),
          // paddingBottom:HP(0)
          // ...Styles.shadow,
          // paddingVertical:HP(6)
        }
      }}

    >
      {/* <Tab.Screen name="ApproveProfile" component={ApproveProfile} 
        options={{
          // tabBarLabel: true,
          title: 'Group',
          tabBarIcon: ({ color, size, focused }) => (
            <Icons name={'group'} size={20} color={focused?palette.lighBlueBtnTitle:"grey"}/>
          )
        }}
      />
       <Tab.Screen name="ApproveComment" component={ApproveComment} 
        options={{
          // tabBarLabel: true,
          title: 'Comments',
          tabBarIcon: ({ color, size, focused }) => (
            <IconCom name={'comments'} size={20} color={focused?palette.lighBlueBtnTitle:"grey"}/>
          )
        }}
      />
    */}
    <Tab.Screen name="Albums" component={AdminAlbum} 
      options={{
        // tabBarLabel: true,
        title: 'Albums',
        tabBarIcon: ({ color, size, focused }) => (
          <IconPost name={'post'} size={20} color={focused?palette.lighBlueBtnTitle:"grey"}/>
        )
      }}
    /> 
      <Tab.Screen name="User" component={UserAdmin} 
        options={{
          // tabBarLabel: true,
          title: 'Users',
          tabBarIcon: ({ color, size, focused }) => (
            <IconEntypo name={'users'} size={20} color={focused?palette.lighBlueBtnTitle:"grey"}/>
          )
        }}
      />
     

    </Tab.Navigator >
  );
}
