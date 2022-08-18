import React, { useEffect, useState, useRef } from 'react';
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
import IconFonAw from "react-native-vector-icons/FontAwesome"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { filterCollection, filterCollectionSingle, saveData, uploadFile, uploadMultiFile } from '../Auth/fire';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertService from '../Services/alertService';
const UserQr = (props) => {
    const [active, setActive] = useState(false)
    const [imgs, setImgs] = useState([])
    const [open, setOpen] = useState(false)
    const [opt, setOpt] = useState('Login As')
    const [heading, setHeading] = useState('NewAlbum')
    const [keyword, setKeyword] = useState('')
    const [link, setLink] = useState('')
    const [check, setCheck] = useState("Public")
    const [email, setEmail] = useState(props?.user?.email + "/" + heading);
    const scroll = useRef();
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
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // recieveAlbums()
            setOpen(false);
            // setHeading('')
        });
        return unsubscribe;
    }, [props?.navigation])

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
    const onShareWhatsapp = async () => {
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
            }
        })
    }
    async function checkUniqueness() {
        const res = await filterCollectionSingle("Recieved", keyword?.toLowerCase(), "keyword")
        console.log(res);
        if (res?.length > 0) {
            return false;
        }
        return true;
    }
    async function onAddPic() {
        if (imgs?.length > 0 && heading != '' && keyword?.trim() != "") {
                let uniqueFlag = false;
                uniqueFlag = await checkUniqueness();
                console.log('u',uniqueFlag);
                if (uniqueFlag) {
                AlertService.confirm("Upload Pictures?").then(async (res) => {
                    if (res) {
                        setOpen(true);
                        scroll.current.scrollToEnd({ animated: true });
                        const value = await AsyncStorage.getItem("User")
                        let upImgs = []
                        if (imgs?.length > 0) {
                            let i0 = await uploadFile(imgs[0]?.uri, imgs[0]?.value)
                            upImgs.push(i0)
                        }
                        if (imgs?.length > 1) {
                            let i1 = await uploadFile(imgs[1]?.uri, imgs[1]?.value)
                            upImgs.push(i1)
                        }
                        if (imgs?.length > 2) {
                            let i2 = await uploadFile(imgs[2]?.uri, imgs[2]?.value)
                            upImgs.push(i2)
                        }
                        if (imgs?.length > 3) {
                            let i3 = await uploadFile(imgs[3]?.uri, imgs[3]?.value)
                            upImgs.push(i3)
                        }
                        if (imgs?.length > 4) {
                            let i4 = await uploadFile(imgs[4]?.uri, imgs[4]?.value)
                            upImgs.push(i4)
                        }
                        if (imgs?.length > 5) {
                            let i5 = await uploadFile(imgs[5]?.uri, imgs[5]?.value)
                            upImgs.push(i5)
                        }
                        if (imgs?.length > 6) {
                            let i6 = await uploadFile(imgs[6]?.uri, imgs[6]?.value)
                            upImgs.push(i6)
                        }
                        if (imgs?.length > 7) {
                            let i7 = await uploadFile(imgs[7]?.uri, imgs[7]?.value)
                            upImgs.push(i7)
                        }
                        if (imgs?.length > 8) {
                            let i8 = await uploadFile(imgs[8]?.uri, imgs[8]?.value)
                            upImgs.push(i8)
                        }
                        if (imgs?.length > 9) {
                            let i9 = await uploadFile(imgs[9]?.uri, imgs[9]?.value)
                            upImgs.push(i9)
                        }
                        if (imgs?.length > 10) {
                            let i10 = await uploadFile(imgs[10]?.uri, imgs[10]?.value)
                            upImgs.push(i10)
                        }
                        if (imgs?.length > 11) {
                            let i11 = await uploadFile(imgs[11]?.uri, imgs[11]?.value)
                            upImgs.push(i11)
                        }
                        if (imgs?.length > 12) {
                            let i12 = await uploadFile(imgs[12]?.uri, imgs[12]?.value)
                            upImgs.push(i12)
                        }
                        if (imgs?.length > 13) {
                            let i13 = await uploadFile(imgs[13]?.uri, imgs[13]?.value)
                            upImgs.push(i13)
                        }
                        if (imgs?.length > 14) {
                            let i14 = await uploadFile(imgs[14]?.uri, imgs[14]?.value)
                            upImgs.push(i14)
                        }
                        onApproveAll(upImgs)
                    }
                })
            }
            else {
                toastPrompt("Album keyword already taken")
            }
        }
        else {
            toastPrompt("Give Imgs,Heading & keyword")
        }
    }
    const replaceFunc = (str, search, replace) => {
        const pieces = str.split(search);
        const resultingString = pieces.join(replace);
        return resultingString;
    }
    async function onApproveAll(item) {
        const value = await AsyncStorage.getItem("User")
        const res = await filterCollection("Recieved", heading.trim(), value, "albumName", "owner");
        if (res.length < 1) {
            await saveData("Recieved", '', {
                albumName: heading,
                owner: value,
                imgs: item,
                view: check,
                likes: 0,
                keyword: keyword?.toLowerCase(),
                likedBy: [],
                approve: true,
                reject: false,
                feature: false,
            })
            toastPrompt("Uploaded")
            setImgs([]);
            setHeading("")
        }
        else {
            await saveData("Recieved", res[0]?.id, {
                imgs: item?.imgs,
            })
        }

    }
    const onShareW = async (e) => {
        // await buildLink()
        let url = 'whatsapp://send?text=' + e;
        await Linking.openURL(url)
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView ref={scroll}
                style={{ flexGrow: 1, backgroundColor: "#fff" }}
                contentContainerStyle={{ paddingBottom: HP(10), paddingHorizontal: WP(5) }}
                showsVerticalScrollIndicator={false}
            >
                <Header title="Q R" style={{}} onPress={() => { props.navigation.goBack() }} />
                <Text style={{ ...styles.emailTxt, paddingLeft: WP(5), fontSize: 12, marginTop: HP(3) }}>STEP 01:<Text style={{ color: 'red' }}>     IMPORTANT</Text> </Text>
                <TouchableOpacity onPress={() => { onShareW('https://sharingapp.page.link/') }} style={{ ...styles.row, paddingVertical: HP(1.3), marginVertical: HP(1), paddingHorizontal: WP(5), backgroundColor: 'green', alignSelf: 'center', borderRadius: WP(2), width: WP(70) }}>
                    <IconFonAw name='whatsapp' color={"#fff"} size={25} />
                    <Text style={{ ...styles.emailTxt, paddingLeft: WP(3), fontSize: 12, color: '#fff', textAlign: 'center' }}>Share this App with Family
                    </Text>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: "90%", marginVertical: HP(5) }}>
                        <AppTextInput value={heading} placeholderText={"Enter Heading"} onChange={(e) => { setHeading(e); setEmail(props?.user?.email + "/" + e.trim() + '/' + check) }} />
                        <AppTextInput value={keyword} placeholderText={"Enter Unique Keywords"} onChange={(e) => { setKeyword(e) }} />

                        <TouchableOpacity onPress={() => { onBrowse() }} style={{ ...styles.row, paddingVertical: HP(2), paddingHorizontal: WP(5), backgroundColor: palette.lighBlueBtnTitle, alignSelf: 'center', marginTop: HP(2) }}>
                            <IconFoundation name='upload' color={"#fff"} size={22} />
                            <Text style={{ ...styles.emailTxt, paddingLeft: WP(3), fontSize: 16, color: "#fff", textAlign: 'center' }}>Upload Images
                            </Text>
                        </TouchableOpacity>

                        <View style={{ ...GlobalStyles.row, justifyContent: 'space-around', marginTop: HP(1) }}>
                            <TouchableOpacity onPress={() => { setCheck('Public') }} style={{ flexDirection: 'row', alignItems: 'center', marginTop: HP(1) }}>
                                <Text style={{ ...styles.emailTxt, color: palette.labelGray }}>Public</Text>
                                <Checkbox status={check == "Public" ? 'checked' : 'unchecked'} color={colors.primary} uncheckedColor={'red'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setCheck('Private') }} style={{ flexDirection: 'row', alignItems: 'center', marginTop: HP(1) }}>
                                <Text style={{ ...styles.emailTxt, color: palette.labelGray }}>Private</Text>
                                <Checkbox status={check == "Private" ? 'checked' : 'unchecked'} color={colors.primary} uncheckedColor={'red'} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => { onAddPic() }} style={{ ...styles.row, paddingVertical: HP(2), paddingHorizontal: WP(25), backgroundColor: colors.primary, alignSelf: "center", marginTop: HP(2) }}>
                            {/* <IconFoundation name='upload' color={"#fff"} size={22} /> */}
                            <Text style={{ ...styles.emailTxt, fontSize: 16, color: "#fff", textAlign: 'center' }}>Save
                            </Text>
                        </TouchableOpacity>
                        <FlatList
                            numColumns={3}
                            data={imgs}
                            style={{ marginTop: HP(2) }}
                            // showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                                <Image source={{ uri: item?.uri }} style={{ ...styles.img, marginRight: WP(5), marginTop: HP(1) }} />
                            }
                        />
                    </View>
                    {open &&
                        <View style={{ alignSelf: 'center', width: '100%' }}>
                            <View
                                style={{ alignSelf: 'center', }}
                            >
                                <QRCode
                                    value={email}
                                    size={200}
                                />
                            </View>
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
                        </View>
                    }
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