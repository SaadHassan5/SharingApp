import React, { useState } from 'react';
import { ReactNativeModal } from 'react-native-modal';
import { ActivityIndicator, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { HP, palette, WP } from '../../config';
import fontFamily from '../../config/fontFamily';
import { CustomBtn1 } from '../CustomButton/CustomBtn1';

const ShareModal = ({ mod, onPress,  onShare, active, txt}) => {
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
            <View style={{ paddingVertical: HP(5), height: HP(26), width: WP(80), backgroundColor: "#fff", alignSelf: 'center', borderRadius: WP(4) }}>
            <Text style={{...Styles.uploadTxt,textAlign:'center'}}>Share this App with your{'\n'} friends & family</Text>
                <View style={{ paddingHorizontal: WP(5), paddingTop: HP(2) }}>
                    <CustomBtn1 onPress={onShare} txt={"Share"} />
                </View>
                <TouchableOpacity onPress={onPress} style={{ position: 'absolute',bottom:0,right:0,paddingHorizontal:WP(3),paddingVertical:HP(1) }}>
                    <Text style={{ ...Styles.uploadTxt }}>Cancel</Text>
                </TouchableOpacity>
            </View>
                {active &&
                    <View style={{ width: '100%', height: "100%", backgroundColor: 'transparent', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', }}>
                        <ActivityIndicator size={"large"} color="#00ff00" />
                    </View>
                }
        </ReactNativeModal>
    )
}
export default ShareModal;