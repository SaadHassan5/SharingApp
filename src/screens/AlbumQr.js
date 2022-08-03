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
const AlbumQr = (props) => {
    const [active, setActive] = useState(false)
    const [imgs, setImgs] = useState([])
    const [open, setOpen] = useState(false)
    const [opt, setOpt] = useState('Login As')
    const [heading, setHeading] = useState('NewAlbum')
    const [desc, setDesc] = useState('')
    const [check, setCheck] = useState(props?.route?.params?.view)
    const [email, setEmail] = useState(props?.user?.email + "/" + props?.route?.params?.albumName+"/"+check);

    const toastPrompt = (msg) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            // alert(msg);
        }
    }
    useEffect(() => {
    }, [])

    const onShare = async () => {

        try {
            const result = await Share.share({
                message:
                    'https://sharingapp.page.link/' + replaceFunc(email, " ", "-")+ '/'
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }
    const onShareWhatsapp = async () => {
        // let url = 'whatsapp://send?text=' + "https://sharingapp.page.link/moonshot/";
        let url = 'whatsapp://send?text=' + 'https://sharingapp.page.link/' + replaceFunc(email, " ", "-") + '/';
        Linking.openURL(url)
    }

    const replaceFunc = (str, search, replace) => {
        const pieces = str.split(search);
        const resultingString = pieces.join(replace);
        return resultingString;
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView
                style={{ flexGrow: 1, backgroundColor: "#fff" }}
                contentContainerStyle={{ paddingBottom: HP(10), paddingHorizontal: WP(5) }}
                showsVerticalScrollIndicator={false} >
                <Header title="Q R" style={{}} goBack={() => { props.navigation.goBack() }} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:HP(20) }}>
                    <QRCode
                        value={email}
                        size={200}
                    />
                    <View style={{ ...styles.row, justifyContent: 'space-around'}}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate("Scanner") }} style={{ ...styles.row, paddingVertical: HP(2), paddingHorizontal: WP(5) }}>
                            <IconMat name='qr-code-scanner' color={colors.primary} size={22} />
                            <Text style={{ ...styles.emailTxt, paddingLeft: WP(3), fontSize: 16 }}>Scan QR
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { onShare() }} style={{ ...styles.row, paddingVertical: HP(2), paddingHorizontal: WP(5) }}>
                            <IconMat name='share' color={colors.primary} size={22} />
                            <Text style={{ ...styles.emailTxt, paddingLeft: WP(3), fontSize: 16 }}>Invite People</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { onShareWhatsapp() }} style={{ ...styles.row, paddingVertical: HP(1.3), paddingHorizontal: WP(5), backgroundColor: palette.status_dot_bg_green, borderRadius: WP(1.4) }}>
                        <IconFontiso name='whatsapp' color={"#fff"} size={22} />
                        <Text style={{ ...styles.emailTxt, paddingLeft: WP(3), fontSize: 16, color: '#ffff' }}>Invite People on Whatsapp</Text>
                    </TouchableOpacity>
                </View>
                {active &&
                    <View style={{ width: '100%', height: "100%", backgroundColor: 'transparent', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', }}>
                        <ActivityIndicator size={"large"} color="#00ff00" />
                    </View>
                }
            </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(AlbumQr);
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
    container: {
        backgroundColor: colors.light,
        paddingHorizontal: 20,
    },
    userProfileBox: {
        backgroundColor: colors.white,
        paddingHorizontal: WP(5),
        paddingVertical: HP(2),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    updateText: {
        color: colors.gray4,
        fontWeight: '500'
    },
    updateDate: {
        color: colors.black,
        fontWeight: '700'
    },
    editImg: {
        position: 'relative',
        top: -20,
        left: 30
    },
    userName: {
        alignSelf: 'center',
        color: colors.black
    },
    userEmail: {
        alignSelf: 'center'
    },
    listItems: {
        paddingVertical: 35,
    }
})