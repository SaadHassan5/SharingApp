import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, Linking, Share, View, StyleSheet, TouchableOpacity, Text, SafeAreaView, FlatList, Platform, ToastAndroid, ScrollView, Image, TextInput } from 'react-native';
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
import { filterCollection, filterCollectionSingle, getAllOfCollectionOrder, saveData, uploadFile, uploadMultiFile } from '../Auth/fire';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertService from '../Services/alertService';
const SearchAlbum = (props) => {
    const [active, setActive] = useState(false)
    const [chng, setChng] = useState(true)
    const [imgs, setImgs] = useState([])
    const [allAlbum, setAllAlbum] = useState([])
    const [album, setAlbum] = useState({})
    const [keyword, setKeyword] = useState('')
    const scroll = useRef();

    const toastPrompt = (msg) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            // alert(msg);
        }
    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getAlbums();
        });
        return unsubscribe;
    }, [props?.navigation])
    async function getAlbums() {
        const res = await getAllOfCollectionOrder("Recieved", "keyword");
        console.log("ORDER=====>", res);
        setAllAlbum(res)
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
    async function onSearch() {
        setActive(true)
        const res = await filterCollectionSingle("Recieved", keyword?.toLowerCase(), "keyword")
        setActive(false)
        console.log(res);
        if (res?.length > 0) {
            console.log('mia');
            setAlbum(res[0])
        }
        else {
            setAlbum({})
            toastPrompt("No Album found")
        }
    }
    async function onAddPic() {
        if (imgs?.length > 0 && keyword?.trim() != "") {
            AlertService.confirm("Upload Pictures?").then(async (res) => {
                if (res) {
                    toastPrompt("Uploading Stay in app")
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
    }
    const replaceFunc = (str, search, replace) => {
        const pieces = str.split(search);
        const resultingString = pieces.join(replace);
        return resultingString;
    }
    async function onApproveAll(item) {
        const value = await AsyncStorage.getItem("User")
        let obj = {
            heading: album?.albumName,
            approve: false,
            imgs: [],
            owner: album?.owner,
            sender: value,
            imgs: item,
            reject: false,
        }
        console.log("OBJ===>", obj);
        await saveData("Albums", '', {
            ...obj
        })
        toastPrompt("Uploaded")
        setImgs([]);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView ref={scroll}
                style={{ flexGrow: 1, backgroundColor: "#fff" }}
                contentContainerStyle={{ paddingBottom: HP(10), paddingHorizontal: WP(5) }}
                showsVerticalScrollIndicator={false}
            >
                <Header title="Search Album" style={{}} onPress={() => { props.navigation.goBack() }} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: "90%", marginVertical: HP(5) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* <TextInput onFocus={()=>{}}/> */}
                            <AppTextInput onFocus={() => { setChng(true) }} style={{ width: "100%" }} value={keyword} placeholderText={"Enter Keywords"} onChange={(e) => { setKeyword(e) }} />
                            <TouchableOpacity onPress={() => { onSearch() }} style={{ position: 'absolute', right: 0, paddingHorizontal: WP(5), top: 0, paddingVertical: HP(4) }}>
                                <Text style={{ ...styles.emailTxt, }}>Search</Text>
                            </TouchableOpacity>
                        </View>
                        {chng &&
                            <View>
                                            <Text style={{ ...styles.emailTxt,letterSpacing:0,fontSize:15}}>Suggested Albums:</Text>
                                <FlatList
                                    numColumns={1}
                                    data={allAlbum}
                                    // style={{}}
                                    // showsHorizontalScrollIndicator={false}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity onPress={() => { setAlbum(item); setChng(false) }} style={{  paddingVertical: HP(.5) }}>
                                            <Text style={{ ...styles.emailTxt, textAlign: 'center' }}>{item?.keyword}</Text>
                                        </TouchableOpacity>

                                    }
                                />
                            </View>
                        }
                        <TouchableOpacity onPress={() => { album?.albumName ? onBrowse() : toastPrompt("Search Album First") }} style={{ ...styles.row, paddingVertical: HP(2), paddingHorizontal: WP(5), backgroundColor: palette.lighBlueBtnTitle, alignSelf: 'center', marginTop: HP(2) }}>
                            <IconFoundation name='upload' color={"#fff"} size={22} />
                            <Text style={{ ...styles.emailTxt, paddingLeft: WP(3), fontSize: 16, color: "#fff", textAlign: 'center' }}>Upload Images
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ ...styles.emailTxt, fontSize: 15, color: "black", marginVertical: HP(3) }}>{album?.albumName}</Text>
                        <FlatList
                            numColumns={3}
                            data={imgs}
                            style={{ marginBottom: HP(2) }}
                            // showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                                <Image source={{ uri: item?.uri }} style={{ ...styles.img, marginRight: WP(5), marginTop: HP(1) }} />
                            }
                        />
                        <FlatList
                            numColumns={3}
                            data={album?.imgs}
                            style={{}}
                            // showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                                <Image source={{ uri: item }} style={{ ...styles.img, marginRight: WP(5), marginTop: HP(1) }} />
                            }
                        />
                        <TouchableOpacity onPress={() => { onAddPic() }} style={{ ...styles.row, paddingVertical: HP(2), paddingHorizontal: WP(25), backgroundColor: colors.primary, alignSelf: "center", marginTop: HP(2) }}>
                            <Text style={{ ...styles.emailTxt, fontSize: 16, color: "#fff", textAlign: 'center' }}>Save
                            </Text>
                        </TouchableOpacity>
                    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchAlbum);
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