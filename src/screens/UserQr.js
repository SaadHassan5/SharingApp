import React, { useEffect, useState } from 'react';
import { ActivityIndicator,Linking, Share, View, StyleSheet, TouchableOpacity, Text, SafeAreaView, FlatList, Platform, ToastAndroid } from 'react-native';
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
import dynamicLinks from '@react-native-firebase/dynamic-links';
const UserQr = (props) => {
    const [active, setActive] = useState(false)
    const [imgs, setImgs] = useState([])
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
    useEffect(()=>{
    },[])
    async function buildLink() {
        console.log("LINK");
        const link = await dynamicLinks().buildLink({
          link: 'https://sharingapp.page.link/'+ replaceFunc(email, " ", "-") + '/',
          // domainUriPrefix is created in your Firebase console
          domainUriPrefix: 'https://sharingapp.page.link',
          android:{
            fallbackUrl:"https://www.google.com/",
            packageName:"com.sharingapp",
          }
          // optional setup which updates Firebase analytics campaign
          // "banner". This also needs setting up before hand
          
        });
      
        return link;
      }
    const onShare = async () => {

        try {
            const result = await Share.share({
                message:
                    'https://sharingapp.page.link/' + replaceFunc(email, " ", "-") + '/'
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
    const onShareWhatsapp = async() => {
        await buildLink();
        // let url = 'whatsapp://send?text=' + "https://sharingapp.page.link/moonshot/";
        let url = 'whatsapp://send?text=' + 'https://sharingapp.page.link/' + replaceFunc(email, " ", "-") + '/';
        Linking.openURL(url)
    }
    async function onBrowse() {
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
                AlertService.confirm("Upload PIcs?").then((res) => {
                    if (res) {
                        onAddPic( response.assets)
                    }
                })
            }
        })
    }
    async function onAddPic( imgz) {
        const value = await AsyncStorage.getItem("User")
        setActive(true)
        let upImgs = await uploadMultiFile(imgz, value)
        setTimeout(async () => {
            if (upImgs.length > 0) {
                onApproveAll(upImgs)
                // props.navigation.goBack();
                setActive(false)
                // getAlbums()
            }
            else
                setActive(false)
        }, 3000 * imgz?.length);
    }
    const replaceFunc = (str, search, replace) => {
        const pieces = str.split(search);
        const resultingString = pieces.join(replace);
        return resultingString;
    }
    async function onApproveAll(item) {
        const value=await AsyncStorage.getItem("User")
        const res = await filterCollection("Recieved", heading.trim(), value, "albumName", "owner");
        // console.log("Find approve item", res);
        if (res.length < 1) {
            await saveData("Recieved", '', {
                albumName: heading,
                owner: value,
                imgs: item,
                view: check,
                approve: true,
                reject: false,
                feature:false,
            })
        }
        else {
            await saveData("Recieved", res[0]?.id, {
                imgs: item?.imgs,
            })
        }

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header title="Q R" style={{}} goBack={() => { props.navigation.goBack() }} />
            <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: "70%", marginVertical: HP(5) }}>
                    <AppTextInput value={heading} placeholderText={"Enter Heading"} onChange={(e) => { setHeading(e); setEmail(props?.user?.email + "/" + e + '/' + check) }} />
                    <View style={{ ...GlobalStyles.row, justifyContent: 'space-around' }}>
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
                <TouchableOpacity onPress={() => { onBrowse() }} style={{ ...styles.row, paddingVertical: HP(2), paddingHorizontal: WP(5) }}>
                    <IconFoundation name='upload' color={colors.primary} size={22} />
                    <Text style={{ ...styles.emailTxt, paddingLeft: WP(3), fontSize: 16 }}>Add Your Images in this Album
                    </Text>
                </TouchableOpacity>
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
                    <TouchableOpacity onPress={() => { onShare() }} style={{ ...styles.row, paddingVertical: HP(2), paddingHorizontal: WP(5) }}>
                        <IconMat name='share' color={colors.primary} size={22} />
                        <Text style={{ ...styles.emailTxt, paddingLeft: WP(3), fontSize: 16 }}>Invite People</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { onShareWhatsapp() }} style={{ ...styles.row, paddingVertical: HP(1.3), paddingHorizontal: WP(5), backgroundColor: palette.status_dot_bg_green, borderRadius: WP(1.4) }}>
                    <IconFontiso name='whatsapp' color={"#fff"} size={22} />
                    <Text style={{ ...styles.emailTxt, paddingLeft: WP(3), fontSize: 16, color: '#ffff' }}>Invite People on Whatsapp</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => { props.navigation.navigate('History') }} style={{ ...styles.row, paddingVertical: HP(2), paddingHorizontal: WP(5) }}>
                    <Text style={{ ...styles.emailTxt, paddingLeft: WP(3), fontSize: 18 }}>History
                    </Text>
                </TouchableOpacity> */}
            </View>
            {active &&
                    <View style={{ width: '100%', height: "100%", backgroundColor: 'transparent', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', }}>
                        <ActivityIndicator size={"large"} color="#00ff00" />
                    </View>
                }
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