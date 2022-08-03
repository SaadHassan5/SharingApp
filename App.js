import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { View, Linking } from 'react-native';
import { Provider } from 'react-redux';
import Stack from './src/navigators/StackNavigator';
import { store } from './src/root/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';
import { LocalNotifee } from './src/Services/LocalPushController';

const App = () => {
  const nav = useRef();
  useEffect(() => {
      getLink();
      notf();
    notfBack();
    notfInitial();

    dynamicLinks()
      .getInitialLink()
      .then(async (link) => {
        console.log("BACK DYNAMIC");
        let sp = link?.url?.split('/')
        const value = await AsyncStorage.getItem("User")
        if (value != null) {
          if (sp?.length > 5)
            nav?.current?.navigate("UploadImageScreen", { email: sp[sp?.length - 4], heading: sp[sp?.length - 3], view: sp[sp?.length - 2] })
        }
        else {
          await AsyncStorage.setItem("Link", link?.url)
          nav?.current?.navigate("LoginScreen")
        }
        //   // listener(url);
      });
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, [])
  const handleDynamicLink = async (link) => {
    // Handle dynamic link inside your own application
    console.log("DYNAMIC", link.url);
    let sp = link?.url?.split('/')
    const value = await AsyncStorage.getItem("User")
    if (value != null) {
      if (sp?.length > 5)
        nav?.current?.navigate("UploadImageScreen", { email: sp[sp?.length - 4], heading: sp[sp?.length - 3], view: sp[sp?.length - 2] })
    }
    else
      nav?.current?.navigate("LoginScreen")
    //   // listener(url);
  };
  async function getLink() {
    const token = await messaging().getToken();
    console.log(token);
    const linkingSubscription = Linking.addEventListener('url', async ({ url }) => {
      let sp = url.split('/')
      console.log("LinkedUrlApp", url, sp?.length);
      const value = await AsyncStorage.getItem("User")
      if (value != null) {
        if (sp?.length > 5)
          nav?.current?.navigate("UploadImageScreen", { email: sp[sp?.length - 4], heading: sp[sp?.length - 3], view: sp[sp?.length - 2] })
      }
      else {
        await AsyncStorage.setItem("Link",url)
        nav?.current?.navigate("LoginScreen")
      }
      //   // listener(url);
    });
    return linkingSubscription;
  }
  const notf = async () => {
    const unsubscribe = await messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // Alert.alert(remoteMessage?.notification?.title)
      // selectFile();
      LocalNotifee(remoteMessage?.notification?.title,remoteMessage?.notification?.body)

    })
    return unsubscribe;
  }
  const notfBack = async () => {
    const unsubscribe = await messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      // selectFile();
  });
    return unsubscribe;
  }
  
  const notfInitial = async () => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });
  }

  return (
    <Provider store={store}>
      <NavigationContainer ref={nav}>
        <Stack />
      </NavigationContainer>
    </Provider>
  )
}
export default App;