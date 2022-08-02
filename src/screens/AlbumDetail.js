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
import { HP, palette, WP } from '../assets/config';
import IconMatCom from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../theme';
import AppText from '../components/AppText';
const AlbumDetail = (props) => {
    const [user, setUser] = useState({})
    const [comments, setComments] = useState([])
    const [albumsR, setAlbumsR] = useState([])
    const [add, setAdd] = useState(false)
    const [com, setCom] = useState('')
    const [item, setItem] = useState(props?.route?.params)
    useEffect(() => {
        console.log(props.route);
        getComments();
    }, [])


    const getItem = async () => {
        const res = await getData("Recieved", props?.route?.params?.id)
        console.log(res);
        setItem(res)
    }
    const getUser = async () => {
        const value = await AsyncStorage.getItem("User")
        const res = await getData("Users", value);
        props.getUser(res)
    }
    const onLike = async (item1) => {
        let sub = [...item1?.likedBy]
        sub.push({ email: props?.user?.email, name: props?.user?.name, profileUri: props?.user?.profileUri })
        await saveData("Recieved", props?.route?.params?.id, {
            likes: item1?.likes + 1,
            likedBy: sub
        })
        await getItem();
    }
    const unLike = async (item1) => {
        let sub = [];
        item1?.likedBy.filter((i) => {
            if (i?.email != props?.user?.email)
                sub.push(i)
        })
        await saveData("Recieved", props?.route?.params?.id, {
            likes: item1?.likes - 1,
            likedBy: sub
        })
        await getItem();
    }
    const getComments = async () => {
        const res = await filterCollectionSingle("Comments", props?.route?.params?.id, 'albumId')
        console.log("CO", res);
        setComments(res);
    }
    const addComment = async () => {
        if (com.trim() != '') {
            await saveData("Comments", '', {
                albumId: props?.route?.params?.id,
                name: props?.user?.name,
                profileUri: props?.user?.profileUri,
                email: props?.user?.email,
                comment: com
            })
            await getComments();
        }
    }
    return (
        <SafeAreaView style={{ ...GlobalStyles.container, backgroundColor: '#fff' }}>
            <Header title={props.route.params?.albumName} goBack={() => { props.navigation.goBack() }} />
            <ScrollView
                style={{ flexGrow: 1, backgroundColor: "#fff" }}
                contentContainerStyle={{ paddingVertical: HP(2), paddingBottom: HP(10), paddingHorizontal: WP(5) }}
                showsVerticalScrollIndicator={false}
            >

                <View style={{}}>
                    <FlatList
                        // numColumns={2}
                        horizontal
                        data={props.route.params.imgs}
                        // showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <Image source={{ uri: item }} style={{ width: WP(40), height: WP(40), marginRight: WP(5), marginTop: HP(.5) }} />
                        } />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ ...GlobalStyles.row }}>
                            {item?.likedBy?.find(e => e?.email == props?.user?.email) ?
                                <TouchableOpacity onPress={() => { unLike(item) }}>
                                    <AntDesign name='like1' size={25} color={colors.primary} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => { onLike(item) }}>
                                    <AntDesign name='like2' size={25} color={colors.primary} />
                                </TouchableOpacity>}
                            <AppText style={{ paddingLeft: WP(2), color: colors.primary, fontFamily: fontFamily.medium }}>{item?.likes}</AppText>
                        </View>
                        <TouchableOpacity onPress={() => { }}>
                            <IconMatCom name='comment' size={25} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        numColumns={1}
                        data={comments}
                        // showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View style={{width:WP(90)}}>
                                <View style={{ ...GlobalStyles.row,marginTop:HP(3), }}>
                                    <Image source={{ uri: item?.profileUri }} style={{ width: WP(12), height: WP(12), borderRadius: WP(6) }} />
                                    <View style={{paddingLeft:WP(5)}}>
                                        <AppText style={{ ...Styles.titleTxt }}>{item?.name}</AppText>
                                        <AppText style={{ ...Styles.titleTxt, fontSize: 12, fontFamily: fontFamily.regular }}>{item?.email}</AppText>
                                        <AppText style={{ ...Styles.titleTxt, fontSize: 12, fontFamily: fontFamily.regular}}>{item?.comment}</AppText>
                                    </View>
                                </View>
                            </View>
                        }
                    />
                </View>

            </ScrollView>
            <View style={{ width: "98%", position: 'absolute', bottom: 0, alignSelf: 'center', ...GlobalStyles.row }}>
                <View style={{ width: '96%' }}>
                    <AppTextInput value={com} onChange={(e) => { setCom(e) }} placeholderText={"Add Comment"} />
                </View>
                <TouchableOpacity onPress={() => { addComment() }} style={{ position: 'absolute', right: 0,top:20, paddingHorizontal: WP(5) }}>
                    <IconMatCom name='send' size={35} color={palette.primary1} />
                </TouchableOpacity>
            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail);