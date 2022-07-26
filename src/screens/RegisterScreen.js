import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Text,Platform,ToastAndroid } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors } from "../theme";
import Header from "./../components/Header";
import AppForm from './../components/form/AppForm';
import AppFormField from './../components/form/AppFormField';
import SubmitButton from './../components/form/SubmitButton';
import AppText from './../components/AppText';
import AppButton from "../components/AppButton";
import { saveData, uploadFile } from "../Auth/fire";
import { HP, palette, WP } from "../assets/config";
import { FireAuth } from "../Auth/socialAuth";
import fontFamily from "../assets/config/fontFamily";
import IconFb from "react-native-vector-icons/AntDesign"
import { onFacebookButtonPress } from "../Auth/fbAuth";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});



export default function RegisterScreen(props) {

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [imgs, setImgs] = useState({})
  const [active, setActive] = useState(false)

  const toastPrompt = (msg) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      // alert(msg);
    }
  }
  const handleFormSubmit = async (values) => {
    const name = values.name;
    const email = values.email;
    const password = values.password;
    if (imgs.uri) {
      setActive(true)
      const res = await FireAuth.Signup(email, password, name, props)
      if (res) {
        const rs = await uploadFile(imgs?.uri, imgs?.fileName, email);
        if (rs) {
          await saveData("Users", email, {
            profileUri: rs,
          })
          setActive(false)
          props.navigation.goBack();
          props.navigation.replace('UserTab')
        }
        else
          setActive(false)
      }
    }
    else
    toastPrompt("Enter All Detail & Image")
  }
  async function onBrowse(res) {
    const options = {
      mediaType: 'photos',
      base64: true,
      // selectionLimit: 5
    }
    await launchImageLibrary(options, async (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else {
        let _img = response?.assets[0]?.uri;
        console.log("image---->", response?.assets);
        setImgs(response?.assets[0])
        // toastPrompt("Image Uploaded")
      }
    })
  }
  return (
    <>
      <Header title="Register" onPress={() => props.navigation.goBack()} />

      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image source={require("../assets/images/logo/logo.png")} />
        </View>
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{ name: "", email: "", password: "" }}

            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
          >

            <AppFormField placeholderText="Name" name="name" />

            <AppFormField placeholderText="Email" name="email" />
            <AppFormField placeholderText="Password" name="password" secureTextEntry />
            {imgs?.uri &&
              <Image source={{ uri: imgs?.uri }} style={{ alignSelf: 'center', width: WP(25), height: WP(25), marginLeft: WP(2), marginTop: HP(1) }} />
            }
            <AppButton onPress={() => onBrowse()} style={{ marginTop: 10, marginBottom: 10, backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.gray }} textColor={true} title="Add Profile Image" />

            <SubmitButton title="Register" />
            <TouchableOpacity onPress={() => { setActive(true); onFacebookButtonPress(props) }} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: WP(5), alignSelf: 'center', paddingVertical: HP(2) }}>
              <Text style={{ fontFamily: fontFamily.bold, color: palette.blackGray }}>Register with </Text>
              <IconFb name="facebook-square" color={palette.lighBlueBtnTitle} size={25} />
            </TouchableOpacity>
          </AppForm>
        </View>


        <View style={styles.signUpLinkContainer}>
          <View style={styles.signUpTextContainer}>
            <AppText preset="default">All Ready have an account?</AppText>
            <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
              <AppText preset="bold" style={styles.link}>Login</AppText>
            </TouchableOpacity>
          </View>
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
    marginTop: 5,
    marginBottom: 50,
    alignItems: "center",
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
