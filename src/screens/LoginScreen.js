
import React, { useState } from "react";
import * as Yup from 'yup';
import { ActivityIndicator,View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../components/Header";
import AppText from "../components/AppText";
import AppForm from './../components/form/AppForm';
import AppFormField from './../components/form/AppFormField';
import SubmitButton from './../components/form/SubmitButton';
import { spacing, colors } from "../theme";
import { FireAuth } from '../Auth/socialAuth';
import { Checkbox } from 'react-native-paper';
import { HP, palette, WP } from "../assets/config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filterCollection } from "../Auth/fire";
import IconFb from "react-native-vector-icons/AntDesign"
import fontFamily from "../assets/config/fontFamily";
import { onFacebookButtonPress } from "../Auth/fbAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default function LoginScreen(props) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [values, setValues] = useState({});  
  
  const [active, setActive] = useState(false)

  const [check, setCheck] = useState("uncheck")

  return (
    <>
      <Header title="Login" onPress={() => { }} />

      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}
        showsHorizontalScrollIndicator={false}
      >

        <View style={styles.logoContainer}>
          <Image source={require("../assets/images/logo/logo.png")} />
        </View>
        <View style={styles.formContainer}>

          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {

              const email = values.email;
              const password = values.password;

              if (check == 'uncheck')
              await FireAuth.Signin(email, password, props)
          else {
              const adm = await filterCollection("Admin", email, password,"email","password");
              if(adm.length>0){
                  await AsyncStorage.setItem('User', email);
                  await AsyncStorage.setItem('Admin', email);
                  props.navigation.replace('TabNavigator')
              }
              else
              toastPrompt("Wrong Credentials")
          }


            }}
            validationSchema={validationSchema}
          >

            <AppFormField placeholderText="Email" name="email" />
            <AppFormField placeholderText="Password" name="password" secureTextEntry />
            <TouchableOpacity onPress={() => { check == "check" ? setCheck('uncheck') : setCheck('check') }} style={{ flexDirection: 'row', alignItems: 'center', marginTop: HP(1) }}>
              <Text style={{ ...styles.label }}>Login as Admin</Text>
              <Checkbox status={check == "check" ? 'checked' : 'unchecked'} color={colors.primary} uncheckedColor={'red'} />
            </TouchableOpacity>
           
            <SubmitButton title="Login" style={{ marginTop: spacing[4] }} />
            <TouchableOpacity onPress={async()=>{setActive(true);await onFacebookButtonPress(props);setActive(false)}} style={{flexDirection:'row',alignItems:'center',paddingHorizontal:WP(5),alignSelf:'center',paddingVertical:HP(2)}}>
              <Text style={{fontFamily:fontFamily.bold,color:palette.blackGray,fontSize:20}}>Login with </Text>
              <IconFb name="facebook-square" color={palette.lighBlueBtnTitle} size={30}/>
            </TouchableOpacity>
          </AppForm>
        </View>
        <View style={styles.signUpLinkContainer}>
          <TouchableOpacity onPress={() => props.navigation.navigate("RegisterScreen")} style={styles.signUpTextContainer}>
            <AppText>Don’t have an account?</AppText>
              <AppText preset="bold" style={styles.link}>Sign Up</AppText>
          </TouchableOpacity>
        </View>
        {active &&
                <View style={{ width: '100%', height: "100%", backgroundColor: 'transparent', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', }}>
                    <ActivityIndicator size={"large"} color="#00ff00" />
                </View>
            }
      </KeyboardAwareScrollView>

    </>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 15,
    marginBottom: 50,
    alignItems: "center",
  },
  userCheckMeta: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  forgotPass: {
    textAlign: "right",
    color: colors.black
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    margin: 8,
    color: colors.black
  },
  loginBtn: {
    marginTop: 20,
  },
  signUpLinkContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: "row",
  },
  signUpTextContainer: {
    flexDirection: "row",
  },
  link: {
    marginLeft: 5,
    color: colors.primary,
  },
});
