import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Linking, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../theme';

const HomeScreen = (props) => {
    const [user, setUser] = useState({})
    const [albums, setAlbums] = useState([])
    const [albumsR, setAlbumsR] = useState([])
    const [add, setAdd] = useState(false)
    const [mod, setMod] = useState(false)
    const [albumName, setAlbumName] = useState('')
    useEffect(() => {
        setTimeout(() => {
            setMod(true)
        }, 1000);
        getUser();
        getCreatedAlbums();
        getRecievedAlbums()
    }, [])
    const getRecievedAlbums = async () => {
        const res = await filterCollection('Recieved',"Public",true,"view","feature");
        console.log(res);
        setAlbumsR(res)
    }
    const onShare = async () => {
        let url = 'whatsapp://send?text=' + 'https://www.google.com/';
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
        getCreatedAlbums();
    }
    return (
        <SafeAreaView style={{ ...GlobalStyles.container, backgroundColor: '#fff' }}>
            <Header title={"Home"} goBack={false} />
            <ScrollView
                style={{ flexGrow: 1, backgroundColor: "#fff" }}
                contentContainerStyle={{ paddingVertical: HP(2), paddingBottom: HP(10), paddingHorizontal: WP(5) }}
                showsVerticalScrollIndicator={false}
            >
                {albums.length < 1 ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '70%' }}>
                            {!add ?
                                <AppButton onPress={() => { setAdd(!add) }} title={"Create Album"} />
                                :
                                <View>
                                    <AppTextInput placeholderText={"Enter Album Name"} onChange={(e) => { setAlbumName(e) }} value={albumName} />
                                    <View>
                                        <AppButton onPress={() => { onSave() }} title={"Save Album"} />
                                        <TouchableOpacity onPress={() => { setAdd(!add) }} style={{ paddingVertical: WP(2) }}>
                                            <Text style={{ ...Styles.cancelTxt, textAlign: 'center' }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                    :
                    //ALbums Exist
                    <View style={{ }}>
                        <FlatList
                            numColumns={1}
                            data={albums}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                                <View>
                                    <Text style={{ ...Styles.titleTxt, paddingVertical: HP(3) }}>{item?.albumName}</Text>
                                    <FlatList
                                        // numColumns={1}
                                        horizontal
                                        data={item?.imgs}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={item => item.id}
                                        renderItem={({ item }) =>
                                            <Image source={{ uri: item }} style={{ width: WP(40), height: WP(40), marginRight: WP(5) }} />
                                        } />

                                </View>
                            }
                        />
                        <View style={{}}>
                            <FlatList
                                numColumns={1}
                                data={albumsR}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) =>
                                    <View style={{ marginTop: HP(2) }}>
                                        <View style={{ ...GlobalStyles.row, justifyContent: 'space-between' }}>
                                            <Text style={{ ...Styles.titleTxt, }}>{item?.albumName}</Text>
                                            <Text style={{ ...Styles.titleTxt, color: 'red', fontSize: 12 }}>{item?.view}</Text>
                                            {item?.view == "Public" &&
                                                <TouchableOpacity onPress={() => { onFeature(item) }} style={{ paddingHorizontal: WP(10), position: 'absolute', right: WP(5), }}>
                                                    {item?.feature ?
                                                        <AntDesign name={'star'} size={25} color={colors.primary} />
                                                        :
                                                        <AntDesign name={'staro'} size={25} color={colors.primary} />
                                                    }
                                                </TouchableOpacity>
                                            }
                                        </View>
                                        <FlatList
                                            // numColumns={1}
                                            horizontal
                                            data={item?.imgs}
                                            showsHorizontalScrollIndicator={false}
                                            keyExtractor={item => item.id}
                                            renderItem={({ item }) =>
                                                <Image source={{ uri: item }} style={{ width: WP(40), height: WP(40), marginRight: WP(5) }} />
                                            } />

                                    </View>
                                }
                            />
                        </View>
                    </View>
                }
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