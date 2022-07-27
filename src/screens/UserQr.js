import React, { useState } from 'react';
import { Linking,Share, View, StyleSheet, TouchableOpacity, Text, SafeAreaView, FlatList, Platform, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { HP, palette, WP } from '../assets/config';
import { ChangeBackgroundColor, GetUser } from '../root/action';
import fontFamily from '../assets/config/fontFamily';
import QRCode from 'react-native-qrcode-svg';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing } from '../theme';
import Header from '../components/Header';
import { GlobalStyles } from '../global/global.styles';
import AppTextInput from '../components/AppTextInput';
import { Checkbox } from 'react-native-paper';

const UserQr = (props) => {
    const [open, setOpen] = useState(false)
    const [opt, setOpt] = useState('Login As')
    const [heading, setHeading] = useState('')
    const [check, setCheck] = useState("Public")
    const [email, setEmail] = useState(props?.user?.email + "/NewAlbum");
    const loginAs = [
        { key: 'User' },
        { key: 'Police' },
        { key: 'Admin' },
    ]
    const toastPrompt = (msg) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            // alert(msg);
        }
    }

    const onShare = async () => {
        let url = 'whatsapp://send?text=' + 'https://www.sharingapp.com/' + email +'/' ;
        Linking.openURL(url)
        // try {
        //     const result = await Share.share({
        //         message:
        //             'https://www.sharingapp.com/' + email +'/'
        //     });
        //     if (result.action === Share.sharedAction) {
        //         if (result.activityType) {
        //             // shared with activity type of result.activityType
        //         } else {
        //             // shared
        //         }
        //     } else if (result.action === Share.dismissedAction) {
        //         // dismissed
        //     }
        // } catch (error) {
        //     alert(error.message);
        // }
    }
    async function onInvite() {
        if (heading.trim() != "") {
            onShare();
        }
        else
            toastPrompt("Enter Heading")
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header title="Q R" style={{}} goBack={() => { props.navigation.goBack() }} />
            <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: "70%", marginVertical: HP(5) }}>
                    <AppTextInput value={heading} placeholderText={"Enter Heading"} onChange={(e) => { setHeading(e); setEmail(props?.user?.email + "/" + e+'/'+check) }} />
                    <View style={{...GlobalStyles.row,justifyContent:'space-around'}}>
                        <TouchableOpacity onPress={() => { setCheck('Public') }} style={{ flexDirection: 'row', alignItems: 'center', marginTop: HP(1) }}>
                            <Text style={{ ...styles.emailTxt, color: palette.labelGray }}>Public</Text>
                            <Checkbox status={check == "Public" ? 'checked' : 'unchecked'} color={colors.primary} uncheckedColor={'red'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setCheck('Private') }} style={{ flexDirection: 'row', alignItems: 'center', marginTop: HP(1) }}>
                            <Text style={{ ...styles.emailTxt, color: palette.labelGray }}>Private</Text>
                            <Checkbox status={check == "Private" ? 'checked' : 'unchecked'} color={colors.primary} uncheckedColor={'red'} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <QRCode
                    value={email}
                    size={200}
                />
                <View style={{ ...styles.row, justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("Scanner") }} style={{ ...styles.row, paddingVertical: HP(2), paddingHorizontal: WP(5) }}>
                        <IconMat name='qr-code-scanner' color={colors.primary} size={22} />
                        <Text style={{ ...styles.emailTxt, paddingLeft: WP(3), fontSize: 16 }}>Scan QR
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { onInvite() }} style={{ ...styles.row, paddingVertical: HP(2), paddingHorizontal: WP(5) }}>
                        <IconMat name='share' color={colors.primary} size={22} />
                        <Text style={{ ...styles.emailTxt, paddingLeft: WP(3), fontSize: 16 }}>Invite People</Text>
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity onPress={() => { props.navigation.navigate('History') }} style={{ ...styles.row, paddingVertical: HP(2), paddingHorizontal: WP(5) }}>
                    <Text style={{ ...styles.emailTxt, paddingLeft: WP(3), fontSize: 18 }}>History
                    </Text>
                </TouchableOpacity> */}
            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserQr);
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