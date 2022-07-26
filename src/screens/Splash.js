
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = (props) => {
  useEffect(() => {
    setTimeout(() => {
      checkUser();
    }, 500);
  }, [])
  const checkUser = async () => {
    const adm = await AsyncStorage.getItem("Admin")
    if (adm != null) {
      props.navigation.replace('TabNavigator');
    }
    else {
      const value = await AsyncStorage.getItem("User")
      if (value != null) {
        props.navigation.replace('UserTab');
      }
      else
        props.navigation.replace('LoginScreen');
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>

    </View>
  )
}

export default Splash;