
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { View, Linking } from 'react-native';
import { Provider } from 'react-redux';
import Stack from './src/navigators/StackNavigator';
import { store } from './src/root/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';
const App = () => {
  const nav = useRef();
  useEffect(() => {
    getLink();
    dynamicLinks()
    .getInitialLink()
    .then(async(link) => {
      console.log("BACK DYNAMIC");
      let sp = link?.url?.split('/')
      const value = await AsyncStorage.getItem("User")
      if (value != null) {
        if(sp.length==6)
        nav?.current?.navigate("UploadImageScreen", { email: sp[sp?.length - 4], heading: sp[sp?.length - 3], view: sp[sp?.length - 2] })
      }
      else
        nav?.current?.navigate("LoginScreen")
      //   // listener(url);
    });
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, [])
  const handleDynamicLink = async(link) => {
    // Handle dynamic link inside your own application
    console.log("DYNAMIC", link.url);
    let sp = link?.url?.split('/')
    const value = await AsyncStorage.getItem("User")
      if (value != null) {
        if(sp.length==6)
        nav?.current?.navigate("UploadImageScreen", { email: sp[sp?.length - 4], heading: sp[sp?.length - 3], view: sp[sp?.length - 2] })
      }
      else
        nav?.current?.navigate("LoginScreen")
      //   // listener(url);
  };
  async function getLink() {
    const linkingSubscription = Linking.addEventListener('url', async ({ url }) => {
      let sp = url.split('/')
      console.log(sp.length);
      console.log("LinkedUrlApp", url, sp[sp?.length - 4], sp[sp?.length - 3], sp[sp?.length - 2]);
      const value = await AsyncStorage.getItem("User")
      if (value != null) {
        if(sp.length==6)
        nav?.current?.navigate("UploadImageScreen", { email: sp[sp?.length - 4], heading: sp[sp?.length - 3], view: sp[sp?.length - 2] })
      }
      else
        nav?.current?.navigate("LoginScreen")
      //   // listener(url);
    });
    return linkingSubscription;
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