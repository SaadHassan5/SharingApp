import React, { useState } from 'react';
import { ReactNativeModal } from 'react-native-modal';
import { ActivityIndicator, FlatList, Image, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { HP, palette, WP } from '../../config';
import fontFamily from '../../config/fontFamily';
import { CustomBtn1 } from '../CustomButton/CustomBtn1';
import IconCross from 'react-native-vector-icons/Entypo';
const UploadImgModal = ({ mod, onPress, onBrowse, setMod, onSave, active, img, txt, setImgs }) => {
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
        img: {
            width: WP(18),
            height: WP(22),
        },
    })
    async function onCross(item) {
        let res = []
        await img.filter((i) => {
            if (i?.uri != item?.uri)
                res.push(i)
        })
        setImgs(res)
    }
    return (
        <ReactNativeModal onBackButtonPress={() => { setMod(false) }} onBackdropPress={() => { setMod(false) }} isVisible={mod} style={{ margin: 0 }}>
            <View style={{ paddingTop: HP(5), height: HP(95), width: WP(95), backgroundColor: "#fff", alignSelf: 'center', borderRadius: WP(4) }}>
                <Text style={{ ...Styles.uploadTxt }}>{txt}</Text>
                <Text style={{ ...Styles.uploadTxt, fontFamily: fontFamily.regular, fontSize: 12 }}>{img?.fileName}</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                </View>
                <TouchableOpacity onPress={() => { setMod(false) }} style={{ position: 'absolute', right: 0, top: 0, paddingHorizontal: WP(5), paddingVertical: WP(2) }}>
                    <Text style={{ ...Styles.uploadTxt }}>Skip</Text>
                </TouchableOpacity>
                <View style={{ alignSelf: 'center', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={onBrowse} style={{ alignSelf: 'center', paddingHorizontal: WP(5), paddingVertical: HP(1), backgroundColor: palette.lighBlueBtnTitle, borderRadius: WP(1), ...Styles.shadow }}>
                        <Text style={{ ...Styles.uploadTxt, color: "#fff" }}>Browse</Text>
                    </TouchableOpacity>
                    <FlatList
                        numColumns={4}
                        data={img}
                        contentContainerStyle={{ paddingBottom: HP(6), width: "100%" }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <View>
                                <Image source={{ uri: item?.uri }} style={{ ...Styles.img, marginLeft: WP(2), marginTop: HP(2) }} />
                                <TouchableOpacity onPress={() => onCross(item)} style={{ position: 'absolute', top: 0, left: 0 }}>
                                    <IconCross name='circle-with-cross' color={palette.svgGrayColor} size={25} />
                                </TouchableOpacity>
                            </View>
                        } />
                </View>
                <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                    <CustomBtn1 onPress={onSave} txt={"Save"} />
                </View>
            </View>
            {active &&
                <View style={{ width: '100%', height: "100%", backgroundColor: 'transparent', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', }}>
                    <ActivityIndicator size={"large"} color="#00ff00" />
                </View>
            }
        </ReactNativeModal>
    )
}
export default UploadImgModal;