import { NavigationContainer } from '@react-navigation/native';
import React,{useEffect,useState} from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
import { ChangeBackgroundColor, GetUser } from '../root/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '../Auth/fire';

const HomeScreen = (props) => {
    const [user,setUser]=useState({})
    useEffect(()=>{
        getUser();
    },[])
    const getUser=async()=>{
        const value = await AsyncStorage.getItem("User")
        const res=await getData("Users",value);
        props.getUser(res)
    }
  return (
    <View>
        <Text>saad</Text>
    </View>
  )
}
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
  export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);