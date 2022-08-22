import React, { useState } from 'react';
import { ReactNativeModal } from 'react-native-modal';
import { ActivityIndicator, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, Image } from 'react-native';
import { HP, palette, WP } from '../../config';
import fontFamily from '../../config/fontFamily';
import AppButton from '../../../components/AppButton';
export const ShareModal = ({ mod, setMod, onPress,onShare }) => {
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
    return (
        <ReactNativeModal isVisible={mod} style={{ margin: 0 }} onBackButtonPress={onPress} onBackdropPress={onPress}>
            <View style={{ paddingBottom: HP(5), paddingTop: HP(2), height: HP(30), width: WP(80), backgroundColor: "#fff", alignSelf: 'center', borderRadius: WP(4) }}>
            <Text style={{ ...Styles.uploadTxt, textAlign: 'center',paddingHorizontal:WP(10),marginTop:HP(5) }}>Share this App with your friends & family and get <Text style={{color:palette.angry}}>6 Months free Subscription.</Text></Text>
                <View style={{ paddingHorizontal: WP(5), paddingTop: HP(2) }}>
                    <AppButton onPress={onShare} title={"Share"} />
                </View>
                <TouchableOpacity onPress={onPress} style={{ position: 'absolute', bottom: 0, right: 0, paddingHorizontal: WP(3), paddingVertical: HP(1) }}>
                    <Text style={{ ...Styles.uploadTxt }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </ReactNativeModal>
    )
}