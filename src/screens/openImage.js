import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, Share, View, StyleSheet, TouchableOpacity, Text, SafeAreaView, FlatList, Platform, ToastAndroid, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { HP, palette, WP } from '../assets/config';
import { ChangeBackgroundColor, GetUser } from '../root/action';
import fontFamily from '../assets/config/fontFamily';
import QRCode from 'react-native-qrcode-svg';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconFontiso from 'react-native-vector-icons/Fontisto';
import { colors, spacing } from '../theme';
import Header from '../components/Header';
import { GlobalStyles } from '../global/global.styles';
import AppTextInput from '../components/AppTextInput';
import { Checkbox } from 'react-native-paper';
import IconFoundation from "react-native-vector-icons/Foundation"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { filterCollection, saveData, uploadMultiFile } from '../Auth/fire';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertService from '../Services/alertService';
const OpenImage = (props) => {
    const toastPrompt = (msg) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            // alert(msg);
        }
    }
    useEffect(() => {
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" ,justifyContent:'center',alignItems:'center'}}>
            <Image resizeMode='contain' source={{uri:props?.route?.params?.img}} style={{width:"100%",height:HP(80)}}/>
        </SafeAreaView>
    )
}
const mapStateToProps = (state) => {
    const { backgroundColor } = state;
    const { user } = state;
    // alert(backgroundColor);
    // alert(Imgs);
    // console.log(backgroundColor);
    console.log('Redux Profile=>', user);

    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeBackgroundColor: (bg) => dispatch(ChangeBackgroundColor(bg)),
        getUser: (userInfo) => dispatch(GetUser(userInfo)),
    }
}
// export default Home
export default connect(mapStateToProps, mapDispatchToProps)(OpenImage);
const styles = StyleSheet.create({
    img: {
        width: WP(25),
        height: WP(25),
    }, row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: spacing[3],
        marginBottom: spacing[8]
    },
    emailTxt: {
        fontFamily: fontFamily.semi_bold,
        color: palette.black,
        fontSize: 14,
        letterSpacing: 1
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5, elevation: 5,
    },
    image: {
        width: '100%',
        borderRadius: 10,
    },
    optView: {
        backgroundColor: colors.lightGray,
        paddingVertical: HP(1),
        paddingHorizontal: WP(5)
    },
    optTxt: {
        color: "#fff",
        fontFamily: fontFamily.bold,
        fontSize: 13
    },

})