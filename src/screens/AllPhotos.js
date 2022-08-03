import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Linking, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView, Alert } from 'react-native';
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
import ShareModal from '../components/shareModal';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../theme';
import AlertService from '../Services/alertService';

const AllPhotos = (props) => {
    const [user, setUser] = useState({})
    const [imgs, setImgs] = useState(props?.route?.params?.imgs)
    const [albumsR, setAlbumsR] = useState([])
    const [add, setAdd] = useState(false)
    const [mod, setMod] = useState(false)
    const [albumName, setAlbumName] = useState('')
    useEffect(() => {
        console.log(props.route);
    }, [])
    const onDelete = async (item) => {
        AlertService.confirm("Do you want to DELETE this Picture?").then(async (res) => {
            if (res) {
                const temp = [];
                await imgs?.filter((i) => {
                    if (i != item) {
                        temp.push(i);
                    }
                })
                await saveData("Recieved", props.route?.params?.id, {
                    imgs: temp
                })
                setImgs(temp)
            }
        })
    }
    const getUser = async () => {
        const value = await AsyncStorage.getItem("User")
        const res = await getData("Users", value);
        props.getUser(res)
    }
    return (
        <SafeAreaView style={{ ...GlobalStyles.container, backgroundColor: '#fff' }}>
            <Header title={props.route.params?.albumName} onPress={() => { props.navigation.goBack() }} />
            <ScrollView
                style={{ flexGrow: 1, backgroundColor: "#fff" }}
                contentContainerStyle={{ paddingVertical: HP(2), paddingBottom: HP(10), paddingHorizontal: WP(5) }}
                showsVerticalScrollIndicator={false}
            >

                <View style={{}}>
                    <FlatList
                        numColumns={2}
                        // horizontal
                        data={imgs}
                        // showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => { props?.navigation?.navigate("OpenImage", { img: item }) }}>
                                <Image source={{ uri: item }} style={{ width: WP(40), height: WP(40), marginRight: WP(5), marginTop: HP(.5) }} />
                                {props?.user?.email==props?.route?.params?.owner &&
                                    <TouchableOpacity onPress={() => { onDelete(item) }} style={{ position: 'absolute', right: 0, paddingHorizontal: WP(5), paddingVertical: WP(2) }}>
                                        <Entypo name='circle-with-cross' color={palette.labelGray} size={25} />
                                    </TouchableOpacity>
                                }
                            </TouchableOpacity>
                        }
                    />
                </View>

            </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(AllPhotos);