import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';

import { colors } from "../theme";
import Header from "./Header";
import Screen from "./Screen";
import AppButton from "./AppButton";
import AppText from './AppText';
import { useDispatch, useSelector } from "react-redux";
import { isConfirmation, selectUser } from "../redux/features/userSlice";
// import useGlobalContext from "../hooks/useGlobalContext";

export default function AppConfirmation({ headerTitle, Link, buttonTitle, title, subtitle, }) {
  const navigation = useNavigation();
  const user = useSelector();
  const dispatch = useDispatch();

  const handleConfirmation = () => {
    dispatch(isConfirmation(true));
    if(user?.email){
     return navigation.navigate('Home')
    }
    else {
     return navigation.navigate('Login')
    }
  }
  return (
    <>
      <Header
        style={{ backgroundColor: colors.light }}
        title={`${headerTitle} Confirmation`} 
        onPress={() => navigation.goBack()}
      />
      <Screen style={styles.container}>
        <View style={styles.confirmationWrapper}>

        <LottieView
          autoPlay
          loop={false}
          style={{width:150,height:150}}
          source={require('../data/successfull.json')}
        />

          <View style={styles.textContainer}>
            <AppText preset="h3" style={styles.text}>{title}</AppText>
            <AppText style={styles.subtitle}>{subtitle}</AppText>
          </View>

          <AppButton
            onPress={handleConfirmation}
            title={`${buttonTitle}`}
          />
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    paddingTop: 85,
    paddingHorizontal: 20,
  },
  confirmationWrapper: {
    paddingVertical: 45,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
    alignItems:'center'
  },
  confirmationIcon: {
    alignSelf: "center",
  },
  textContainer: {
    marginBottom: 35,
  },
  text: {
    paddingTop: 35,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 28,
    color: colors.black,
  },
  subtitle: {
    textAlign: "center",
    lineHeight: 24,
  },
});
