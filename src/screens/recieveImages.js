import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Share, View, StyleSheet, Image, TouchableOpacity, Text, Linking, ScrollView, FlatList } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import { colors, spacing } from '../theme';
import AppText from '../components/AppText';
// import { auth, signOut } from '../firebase/firebase';
// import { isConfirmation, login, selectUser } from '../redux/features/userSlice';
import Screen from '../components/Screen';
import { HP, palette, WP } from '../assets/config';
import { ChangeBackgroundColor, GetUser } from '../root/action';
import fontFamily from '../assets/config/fontFamily';
import { CommonActions } from '@react-navigation/native';
import AlertService from '../Services/alertService';
import { filterCollection, filterCollectionTriple, getAllOfCollection, getData, saveData, uploadMultiFile } from '../Auth/fire';
import { GlobalStyles } from '../global/global.styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

function RecieveImages(props) {
    const [email, setEmail] = useState(props?.user?.email)
    const [allAlbums, setAllAlbums] = useState([])
    const [imgs, setImgs] = useState([])
    const [active, setActive] = useState(false)

    useEffect(() => {
        console.log(props.route);
        const unsubscribe = props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action and update data
            getAlbums();
        });
        return unsubscribe;
    }, [props.navigation])

    const getAlbums = async () => {
        // console.log("USSS",props?.user);
        const value = await AsyncStorage.getItem('User')
        console.log("email", value);
        const res = await filterCollectionTriple("Albums", value, false, props?.route?.params?.albumName, "owner", "reject", "heading");
        console.log(res);
        setAllAlbums(res)
    }
    async function onApprove(item, item1) {
        console.log("item", item, item1);
        const res = await filterCollection("Recieved", item?.heading, item?.owner, "albumName", "owner");
        console.log("Find approve item", res);
        if (res.length < 1) {
            await saveData("Recieved", '', {
                albumName: item?.heading,
                owner: item?.owner,
                view: item?.view,
                imgs: [item1],
                approve: true,
                feature:false,
                reject: false,
            })
            let temp = [];
            await item?.imgs.filter((e) => {
                if (e != item1) {
                    temp.push(e)
                }
            })
            await saveData("Albums", item?.id, {
                imgs: temp
            })
            getAlbums()
        }
        else {
            const resImgs = [...res[0]?.imgs];
            resImgs.push(item1);
            await saveData("Recieved", res[0]?.id, {
                imgs: resImgs,
            })
            let temp = [];
            await item?.imgs.filter((e) => {
                if (e != item1) {
                    temp.push(e)
                }
            })
            await saveData("Albums", item?.id, {
                imgs: temp
            })
            getAlbums();
        }

    }
    async function onReject(item, item1) {
        let temp = [];
        await item?.imgs.filter((e) => {
            if (e != item1) {
                temp.push(e)
            }
        })
        await saveData("Albums", item?.id, {
            imgs: temp
        })
        getAlbums()
    }
    async function onApproveAll(item) {
        const res = await filterCollection("Recieved", item?.heading, item?.owner, "albumName", "owner");
        console.log("Find approve item", res);
        if (res.length < 1) {
            await saveData("Recieved", '', {
                albumName: item?.heading,
                owner: item?.owner,
                imgs: item?.imgs,
                view: item?.view,
                approve: true,
                reject: false,
                feature:false,
            })
            await saveData("Albums", item?.id, {
                approve: false,
                reject: true,
            })
            getAlbums()
        }
        else {
            await saveData("Recieved", res[0]?.id, {
                imgs: item?.imgs,
            })
            await saveData("Albums", item?.id, {
                approve: false,
                reject: true,
            })
            getAlbums();
        }

    }
    async function onRejectAll(item) {

        await saveData("Albums", item?.id, {
            approve: false,
            reject: true,
        })
        getAlbums()
    }
    async function onBrowse(item) {
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
                        onAddPic(item, response.assets)
                    }
                })
            }
        })
    }
    async function onAddPic(item, imgz) {
        const value = await AsyncStorage.getItem("User")
        setActive(true)
        let upImgs = await  uploadMultiFile(imgz, value)
        setTimeout(async () => {
            if (upImgs.length > 0) {

                console.log("UPImg", upImgs);
                await saveData("Albums", item?.id, {
                    imgs: [...upImgs, ...item?.imgs],
                })
                // props.navigation.goBack();
                setActive(false)
                getAlbums()
            }
            else
            setActive(false)
        }, 3000 * imgz?.length);
    }
    return (
        <>
            <Header title="Recieve Photos" goBack={() => { props?.navigation?.goBack() }} style={{ backgroundColor: colors.light }} />
            <Screen style={Styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: HP(20), paddingTop: HP(2) }}
                >
                    <View style={{}}>
                        <FlatList
                            numColumns={1}
                            data={allAlbums}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                                <View>
                                    {item?.imgs.length > 0 &&
                                        <View>
                                            <View style={{ ...GlobalStyles.row, width: '100%' }}>
                                                <Text style={{ ...Styles.titleTxt, paddingVertical: HP(3) }}>{item?.heading}</Text>
                                                <View style={{ ...GlobalStyles.row, marginLeft: WP(10), }}>
                                                    <TouchableOpacity onPress={() => { onApproveAll(item) }}>
                                                        <Text style={{ ...Styles.cancelTxt, color: "green" }}>Approve All</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { onRejectAll(item) }} style={{ marginLeft: WP(10) }}>
                                                        <Text style={{ ...Styles.cancelTxt, color: "red" }}>Reject All</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <ScrollView horizontal >
                                                {item?.imgs.map((item1, key1) => (
                                                    <View key={key1}>
                                                        <Image source={{ uri: item1 }} style={{ width: WP(40), height: WP(40), marginRight: WP(5) }} />
                                                        <View style={{ ...GlobalStyles.row, justifyContent: 'space-around' }}>
                                                            <TouchableOpacity onPress={() => { onApprove(item, item1) }}>
                                                                <Text style={{ ...Styles.cancelTxt, color: "green" }}>Approve</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => { onReject(item, item1) }}>
                                                                <Text style={{ ...Styles.cancelTxt, color: "red" }}>Reject</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                ))
                                                }

                                            </ScrollView>

                                        </View>
                                    }
                                </View>
                            }
                        />
                    </View>
                </ScrollView>
                {active &&
                    <View style={{ width: '100%', height: "100%", backgroundColor: 'transparent', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', }}>
                        <ActivityIndicator size={"large"} color="#00ff00" />
                    </View>
                }
            </Screen>
        </>
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
export default connect(mapStateToProps, mapDispatchToProps)(RecieveImages);
const Styles = StyleSheet.create({
    cancelTxt: {
        fontFamily: fontFamily.bold,
        fontSize: 14,
        color: 'black'
    },
    titleTxt: {
        fontFamily: fontFamily.bold,
        fontSize: 16,
        color: 'black'
    },
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