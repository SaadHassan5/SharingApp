import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { ChangeBackgroundColor, GetUser } from '../root/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, saveData, uploadFile, uploadMultiFile } from '../Auth/fire';
import Header from '../components/Header';
import { GlobalStyles } from '../global/global.styles';
import AppButton from '../components/AppButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { HP, WP } from '../assets/config';

const UploadImageScreen = (props) => {
  const [user, setUser] = useState({})
  const [active, setActive] = useState(false)
  const [imgs, setImgs] = useState([])
  useEffect(() => {
    console.log(props.route);
    getUser();
    updateHistory();
  }, [])
  async function updateHistory(){
    const value = await AsyncStorage.getItem("User")
    const res = await getData("Users", value);
    const resFriend = await getData("Users", props.route.params?.email);
    console.log("USER",res);
    console.log("FRIEND",resFriend);
    let chk = res?.history.find(e => {return e?.email == props.route.params?.email})
    let chkFriend = resFriend?.history.find(e => {return e?.email == value})
    console.log(!chk,!chkFriend);
    if(!chk){
      let temp=[...res?.history]; temp.push({email:resFriend?.email,profileUri:resFriend?.profileUri,name:resFriend?.name})
      await saveData("Users", value, {
        history:temp
      })
    }
    if(!chkFriend){
      let temp1=[...resFriend?.history]; temp1.push({email:res?.email,profileUri:res?.profileUri,name:res?.name})
      await saveData("Users", resFriend?.email, {
        history:temp1
      })
    }
  }
  async function onSave(res) {
    const value = await AsyncStorage.getItem("User")
    setActive(true)
    let upImgs = await uploadMultiFile(imgs, value)
    setTimeout(async () => {
      if (upImgs.length > 0) {

        console.log("UPImg", upImgs);
        await saveData("Albums", '', {
          imgs: upImgs,
          owner: props?.route.params?.email,
          heading: props?.route.params?.heading,
          sender: value,
          senderImg: props?.user?.profileUri,
          view: props?.route.params?.view,
          approve: false,
          reject: false,
        })
        props.navigation.goBack();
        setActive(false)
      }
      else
        setActive(false)
    }, 3000 * imgs?.length);
  }
  async function onBrowse(res) {
    const options = {
      mediaType: 'photos',
      base64: true,
      selectionLimit: 20
    }
    await launchImageLibrary(options, async (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else {
        let _img = response?.assets[0]?.uri;
        console.log("image---->", response?.assets);
        setImgs(response?.assets)
        // toastPrompt("Image Uploaded")
      }
    })
  }
  const getUser = async () => {
    await AsyncStorage.removeItem("Link")
    const value = await AsyncStorage.getItem("User")
    const res = await getData("Users", value);
    props.getUser(res)
    let chk = res?.history.find(e => e?.email == props.route.params?.email)
    if(!chk){
      let temp=[res?.history]; temp.push({email:res?.email,profileUri:res?.profileUri,name:res?.name})
      await saveData("Users", value, {
        history:temp
      })
    }
  }
  return (
    <SafeAreaView style={{ ...GlobalStyles.container, backgroundColor: '#fff' }}>
      <Header title={props.route.params?.heading} onPress={()=>props?.navigation.goBack()} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: HP(10) }}>
        <View style={{ width: "80%" }}>
          <AppButton onPress={() => { onBrowse() }} title={"Add Images"} />
        </View>
        {imgs.length > 0 &&
          <View style={{ marginTop: HP(2) }}>
            <FlatList
              numColumns={3}
              data={imgs}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
                <View style={{ marginTop: HP(1), marginRight: WP(2) }}>
                  <Image source={{ uri: item?.uri }} style={{ ...Styles.img }} />
                </View>
              }
            />
          </View>
        }
      </View>
      {imgs.length > 0 &&
        <View style={{ width: "80%", flex: 1, justifyContent: 'flex-end', alignSelf: 'center' }}>
          <AppButton onPress={() => { onSave() }} title={"Save"} />
        </View>
      }
      {active &&
        <View style={{ width: '100%', height: "100%", backgroundColor: 'transparent', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', }}>
          <ActivityIndicator size={"large"} color="#00ff00" />
        </View>
      }
    </SafeAreaView>
  )
}
const Styles = StyleSheet.create({
  img: {
    width: WP(20),
    height: WP(20),
  }
})
const mapStateToProps = (state) => {
  const { backgroundColor } = state;
  const { user } = state;
  // alert(backgroundColor);
  // alert(Imgs);
  // console.log(backgroundColor);
  console.log('Redux User=>', user);

  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeBackgroundColor: (bg) => dispatch(ChangeBackgroundColor(bg)),
    getUser: (userInfo) => dispatch(GetUser(userInfo)),
  }
}
// export default Home
export default connect(mapStateToProps, mapDispatchToProps)(UploadImageScreen);