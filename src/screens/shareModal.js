import React, { useState } from 'react';
import { ReactNativeModal } from 'react-native-modal';
import { ActivityIndicator, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, Image } from 'react-native';
import fontFamily from '../assets/config/fontFamily';
import { HP, WP } from '../assets/config';

import ImageSlider from 'react-native-image-slider';
import AppButton from '../components/AppButton';
const ShareModal = ({ mod, onPress, onShare, active, txt, phn, setPhn }) => {
    const Styles = StyleSheet.create({
        uploadTxt: {
            fontFamily: fontFamily.semi_bold,
            color: 'black',
            fontSize: 16,
            textAlign: 'center'
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
    })
    const img = [
        { img: require('D:\AirBlinkOffice\SharingApp\src\assets\images\icon\confirmation.png') },
        { img: require('D:\AirBlinkOffice\SharingApp\src\assets\images\icon\confirmation.png') },
        { img: require('D:\AirBlinkOffice\SharingApp\src\assets\images\icon\confirmation.png') },
        { img: require('D:\AirBlinkOffice\SharingApp\src\assets\images\icon\confirmation.png') },
    ]
    return (
        <ReactNativeModal isVisible={mod} style={{ margin: 0 }} onBackButtonPress={onPress} onBackdropPress={onPress}>
            <View style={{ paddingBottom: HP(5), paddingTop: HP(2), height: HP(90), width: WP(80), backgroundColor: "#fff", alignSelf: 'center', borderRadius: WP(4) }}>
                <ImageSlider
                    // loopBothSides
                    // autoPlayWithInterval={3000}
                    style={{ backgroundColor: '#fff' }}
                    images={img}
                    customSlide={({ index, item, style, width }) => (
                        // It's important to put style here because it's got offset inside
                        <View key={index} style={{ alignSelf: "center" }}>
                            <Image resizeMode='contain' source={item?.img} style={{ width: WP(70), height: HP(55), alignSelf: 'center' }} />
                        </View>
                    )}
                />
                {/* <View style={{ width: "80%", alignSelf: 'center',marginTop:HP(2) }}>
                    <AppTextInput placeholderText={"Enter Phone Number"} onChange={(e) => setPhn(e)} />
                </View> */}
                <Text style={{ ...Styles.uploadTxt, textAlign: 'center', paddingHorizontal: WP(10), marginVertical: HP(2) }}>Share this App with your friends & family and get <Text style={{ color: palette.angry }}>6 Months free Subscription</Text></Text>
                <View style={{ paddingHorizontal: WP(5), paddingTop: HP(2) }}>
                    <AppButton onPress={onShare} title={"Share"} />
                </View>
                <TouchableOpacity onPress={onPress} style={{ position: 'absolute', bottom: 0, right: 0, paddingHorizontal: WP(3), paddingVertical: HP(1) }}>
                    <Text style={{ ...Styles.uploadTxt }}>Cancel</Text>
                </TouchableOpacity>
            </View >


        </ReactNativeModal >
    )
}
export default ShareModal;