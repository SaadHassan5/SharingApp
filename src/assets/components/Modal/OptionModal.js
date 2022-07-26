import React, { useState } from 'react';
import { ReactNativeModal } from 'react-native-modal';
import { ActivityIndicator, Image, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { HP, palette, WP } from '../../config';
import fontFamily from '../../config/fontFamily';
import { CustomBtn1 } from '../CustomButton/CustomBtn1';

const OptionModal = ({ mod, onPress, active, obj, selected, setSelected, onSubscribe }) => {
    // const [selected, setSelected] = useState([])
    const Styles = StyleSheet.create({
        uploadTxt: {
            fontFamily: fontFamily.bold,
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
        row: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        optView: {
            width: WP(27), height: HP(20),
            borderWidth: .3
        },
        img: {
            width: WP(20),
            height: WP(20),
            alignSelf: 'center'
        },
        optTxt: {
            fontFamily: fontFamily.semi_bold, color: 'black', fontSize: 13,
            width: WP(13),
            textAlign: 'center'
        }
    })
    async function onSelect(opt, optPoint) {
        const sub = [...selected];
        // if (selected.length != 0)
        //     sub = [...selected]
        let flag = sub.find((i) => {
            return i?.option == opt;
        })
        if (!flag) {
            sub.push({ option: opt, points: optPoint });
            setSelected(sub)
        }
        else {
            const temp = sub.filter((i) => {
                if (i?.option != opt)
                    return i;
            })
            setSelected(temp)
        }
    }
    return (
        <ReactNativeModal isVisible={mod} style={{ margin: 0 }} onBackButtonPress={onPress} onBackdropPress={onPress}>
            <View style={{ height: HP(85), width: WP(90), backgroundColor: "#fff", alignSelf: 'center', borderRadius: WP(4) }}>

                <Text style={{ ...Styles.uploadTxt, paddingTop: HP(1) }}>Options to Subscribe</Text>
                <View style={{ ...Styles.row, justifyContent: 'space-evenly', marginTop: HP(2) }}>
                    {/* <Image source={{ uri: obj?.op }} style={{ ...Styles.img }} /> */}
                    <Text style={{ ...Styles.optTxt, width: WP(20), textDecorationLine: 'underline' }}>IMAGES</Text>
                    <Text style={{ ...Styles.optTxt, width: WP(30), textDecorationLine: 'underline' }}>OPTIONS</Text>
                    <Text style={{ ...Styles.optTxt, textDecorationLine: 'underline' }}>POINTS</Text>
                </View>
                <TouchableOpacity onPress={() => { onSelect("option1", obj?.option1Points) }} style={{
                    ...Styles.row, justifyContent: 'space-evenly', marginTop: HP(2), backgroundColor: selected.find((i) => {
                        return i?.option == "option1";
                    }) ? palette.lighBlueBtn : "#ffff"
                }}>
                    <Image source={{ uri: obj?.opt1Img }} style={{ ...Styles.img }} />
                    <Text style={{ ...Styles.optTxt, width: WP(30) }}>{obj?.option1}</Text>
                    <Text style={{ ...Styles.optTxt }}>{obj?.option1Points}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onSelect("option2", obj?.option2Points) }} style={{
                    ...Styles.row, justifyContent: 'space-evenly', marginTop: HP(2), backgroundColor: selected.find((i) => {
                        return i?.option == "option2";
                    }) ? palette.lighBlueBtn : "#ffff"
                }}>
                    <Image source={{ uri: obj?.opt2Img }} style={{ ...Styles.img }} />
                    <Text style={{ ...Styles.optTxt, width: WP(30) }}>{obj?.option2}</Text>
                    <Text style={{ ...Styles.optTxt }}>{obj?.option2Points}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onSelect("option3", obj?.option3Points) }} style={{
                    ...Styles.row, justifyContent: 'space-evenly', marginTop: HP(2), backgroundColor: selected.find((i) => {
                        return i?.option == "option3";
                    }) ? palette.lighBlueBtn : "#ffff"
                }}>
                    <Image source={{ uri: obj?.opt3Img }} style={{ ...Styles.img }} />
                    <Text style={{ ...Styles.optTxt, width: WP(30) }}>{obj?.option3}</Text>
                    <Text style={{ ...Styles.optTxt }}>{obj?.option3Points}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onSelect("option4", obj?.option4Points) }} style={{
                    ...Styles.row, justifyContent: 'space-evenly', marginTop: HP(2), backgroundColor: selected.find((i) => {
                        return i?.option == "option4";
                    }) ? palette.lighBlueBtn : "#ffff"
                }}>
                    <Image source={{ uri: obj?.opt4Img }} style={{ ...Styles.img }} />
                    <Text style={{ ...Styles.optTxt, width: WP(30) }}>{obj?.option4}</Text>
                    <Text style={{ ...Styles.optTxt }}>{obj?.option4Points}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onSelect("option5", obj?.option5Points) }} style={{
                    ...Styles.row, justifyContent: 'space-evenly', marginTop: HP(2), backgroundColor: selected.find((i) => {
                        return i?.option == "option5";
                    }) ? palette.lighBlueBtn : "#ffff"
                }}>
                    <Image source={{ uri: obj?.opt5Img }} style={{ ...Styles.img }} />
                    <Text style={{ ...Styles.optTxt, width: WP(30) }}>{obj?.option5}</Text>
                    <Text style={{ ...Styles.optTxt }}>{obj?.option5Points}</Text>
                </TouchableOpacity>
                <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                    <CustomBtn1 onPress={onSubscribe} txt={"Subscribe"} />
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
export default OptionModal;