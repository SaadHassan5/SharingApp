import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, ToastAndroid } from 'react-native';
import { saveData } from './fire';
const toastPrompt = (msg) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    // alert(msg);
  }
}
const Logout = async () => {
  await auth().signOut();
}
Date.prototype.getWeek = function () {
  var onejan = new Date(this.getFullYear(), 0, 1);
  var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
  var dayOfYear = ((today - onejan + 86400000) / 86400000);
  return Math.ceil(dayOfYear / 7)
};
const Signup = async (email, password, name, props) => {
  let response = {}; 
  const today = new Date();
  const currentWeekNumber = today.getWeek();
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (res) => {
      toastPrompt('User account created & signed in!');
      console.log("user", res);
      await AsyncStorage.setItem('User', email);
      await AsyncStorage.setItem('id', res?.user?.uid);
      await saveData("Users", email, {
        email: email,
        id: res?.user?.uid,
        subscribed: [],
        name: name,
        imgs: [],
        history: [],
        pin:[],
        month: new Date().getMonth(),
        date: new Date().getDate(),
        year: new Date().getFullYear(),
        week: currentWeekNumber,
      })
      response = res?.user;
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        toastPrompt('That email address is already in use!');
      }
      else if (error.code === 'auth/invalid-email') {
        toastPrompt('That email address is invalid!');
      }
      else if (error.code == "auth/network-request-failed")
        toastPrompt('Internet Problem')
      console.error(error);
    });
  return response;
}
const Signin = async (email, password, props) => {
  // let dat=new Date().toDateString().toString().split(' ')
 
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res) => {
      toastPrompt('signed in!');
      console.log(res.user.uid);
      await AsyncStorage.setItem('User', email);
      await AsyncStorage.setItem('id', res?.user?.uid);
      await saveData("Users", email, {
        email: email,
      })
      props.navigation.replace('UserTab')
      // props.navigation.replace('Home')
      // props.navigation.replace('TabNavigator');

    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        toastPrompt('That email address is already in use!');
      }
      else if (error.code === 'auth/invalid-email') {
        toastPrompt('That email address is invalid!');
      }
      else if (error.code === 'auth/wrong-password') {
        toastPrompt('That password is invalid!');
      }
      else if (error.code == "auth/network-request-failed")
        toastPrompt('Internet Problem')
      else {
        toastPrompt("Unknown Error")
      }
      console.error(error.code);
    });
}
const Reset = async (email, props) => {

  auth().sendPasswordResetEmail(email)
    .then(() => {
      console.log('Success');
      toastPrompt('Email Sent!' + '\n' + 'Click on recieved email for further process.')
      props.navigation.goBack()
    })
    .catch(error => {
      if (error.code == "auth/user-not-found")
        toastPrompt('User not Found')
      if (error.code == "auth/network-request-failed")
        toastPrompt('Internet Problem')
      console.error(error);
      // alert(error)
    });

}
export const FireAuth = {
  Signup,
  Signin,
  Reset,
  Logout
}