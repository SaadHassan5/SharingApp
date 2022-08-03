import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Linking, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView, Pressable } from 'react-native';
import { connect } from 'react-redux';
import { ChangeBackgroundColor, GetUser } from '../root/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filterCollection, filterCollectionSingle, getAllOfCollection, getData, saveData } from '../Auth/fire';
import Header from '../components/Header';
import { GlobalStyles } from '../global/global.styles';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import fontFamily from '../assets/config/fontFamily';
import { HP, WP } from '../assets/config';
import ShareModal from '../components/shareModal';
import IconMatCom from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../theme';
import ArrowRight from '../svg/ArrowRight';
import { color } from 'react-native-reanimated';
import AppText from '../components/AppText';

const HomeScreen = (props) => {
    const [user, setUser] = useState({})
    const [albums, setAlbums] = useState([])
    const [albumsR, setAlbumsR] = useState([])
    const [add, setAdd] = useState(false)
    const [mod, setMod] = useState(false)
    const [active, setActive] = useState(false)
    const [albumName, setAlbumName] = useState('')
    useEffect(() => {
        setTimeout(() => {
            setMod(true)
        }, 1000);
        getUser();
        // getCreatedAlbums();
        getRecievedAlbums()
    }, [])
    const getRecievedAlbums = async () => {
        const res = await filterCollection('Recieved', "Public", true, "view", "feature");
        console.log(res);
        setAlbumsR(res)
    }
    const onShare = async () => {
        let url = 'whatsapp://send?text=' + 'https://sharingapp.page.link/moonsot';
        Linking.openURL(url)
    }
    const getCreatedAlbums = async () => {
        const value = await AsyncStorage.getItem("User")
        const res = await filterCollectionSingle("Created", value.trim(), "owner")
        console.log("Albums", res, value);
        setAlbums(res);
    }
    const getUser = async () => {
        const value = await AsyncStorage.getItem("User")
        const res = await getData("Users", value);
        props.getUser(res)
    }
    const onSave = async () => {
        const value = await AsyncStorage.getItem("User")
        await saveData("Created", '', {
            owner: value,
            albumName: albumName,
            imgs: [],
        })
        setAdd(false);
        // getCreatedAlbums();
    }
    const onLike = async (item) => {
        let sub = [...item?.likedBy]
        sub.push({ email: props?.user?.email, name: props?.user?.name, profileUri: props?.user?.profileUri })
        await saveData("Recieved", item?.id, {
            likes: item?.likes + 1,
            likedBy: sub
        })
        await getRecievedAlbums();
    }
    const unLike = async (item) => {
        let sub = [];
        item?.likedBy.filter((i)=>{
            if(i?.email!=props?.user?.email)
            sub.push(i)
        })
        await saveData("Recieved", item?.id, {
            likes: item?.likes - 1,
            likedBy: sub
        })
        await getRecievedAlbums();
    }
    return (
        <SafeAreaView style={{ ...GlobalStyles.container, backgroundColor: '#fff' }}>
            <Header title={"Home"} goBack={false} />
            <ScrollView
                style={{ flexGrow: 1, backgroundColor: "#fff" }}
                contentContainerStyle={{ paddingVertical: HP(2), paddingBottom: HP(10), paddingHorizontal: WP(5) }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{}}>
                    <FlatList
                        numColumns={1}
                        data={albumsR}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <Pressable onPress={() => { props.navigation.navigate("AllPhotos", item) }} style={{ marginTop: HP(2) }}>
                                <View style={{ ...GlobalStyles.row, justifyContent: 'space-between', paddingVertical: HP(.5) }}>
                                    <Text style={{ ...Styles.titleTxt, }}>{item?.albumName}</Text>
                                    <Text style={{ ...Styles.titleTxt, color: 'red', fontSize: 12 }}>{item?.view}</Text>
                                </View>
                                <FlatList
                                    // numColumns={1}
                                    horizontal
                                    data={item?.imgs}
                                    // showsHorizontalScrollIndicator={false}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) =>
                                        <Image source={{ uri: item }} style={{ width: WP(50), height: WP(50), marginRight: WP(5) }} />
                                    } />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop:HP(2) }}>
                                    <View style={{ ...GlobalStyles.row }}>
                                        { item?.likedBy?.find(e=> e?.email==props?.user?.email) ?
                                        <TouchableOpacity onPress={() => { unLike(item) }}>
                                            <AntDesign name='like1' size={25} color={colors.primary} />
                                        </TouchableOpacity>
:
                                        <TouchableOpacity onPress={() => { onLike(item) }}>
                                            <AntDesign name='like2' size={25} color={colors.primary} />
                                        </TouchableOpacity>}
                                        <AppText style={{ paddingLeft: WP(2), color: colors.primary, fontFamily: fontFamily.medium }}>{item?.likes}</AppText>
                                    </View>
                                    <TouchableOpacity onPress={()=>{props.navigation.navigate("AlbumDetail",item)}}>
                                        <IconMatCom name='comment' size={25} color={colors.primary} />
                                    </TouchableOpacity>
                                </View>
                            </Pressable>
                        }
                    />
                </View>
            </ScrollView>
            <ShareModal mod={mod} onShare={onShare} onPress={() => { setMod(false) }} />
        </SafeAreaView>
    )
}
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
    }
})
const mapStateToProps = (state) => {
    const { backgroundColor } = state;
    const { user } = state;
    // alert(backgroundColor);
    // alert(Imgs);
    // console.log(backgroundColor);
    console.log('Redux User=>', user);

    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeBackgroundColor: (bg) => dispatch(ChangeBackgroundColor(bg)),
        getUser: (userInfo) => dispatch(GetUser(userInfo)),
    }
}
// export default Home
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);