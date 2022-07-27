import { StyleSheet, View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';;
import React, { useEffect, useState } from 'react';
// import { FontAwesome } from '@expo/vector-icons';
// import { Video } from 'expo-av';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors, spacing } from '../theme';
import Header from '../components/Header';
import { filterCollection, filterCollectionTriple, getAllOfCollection, saveData } from '../Auth/fire';
import { HP, WP } from '../assets/config';
import fontFamily from '../assets/config/fontFamily';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import AlertService from '../Services/alertService';
import { GlobalStyles } from '../global/global.styles';

const AdminAlbum = (props) => {
    const [albums, setAlbums] = useState([])
    const [todayCount, setTodayCount] = useState(0)
    const [weeklyCount, setWeeklyCount] = useState(0)
    const [monthCount, setMonthCount] = useState(0)

    useEffect(() => {
        console.log(props.route);
        getUsers();
    }, [])
    const getUsers = async () => {
        const res = await getAllOfCollection('Recieved');
        console.log(res);
        setAlbums(res)
    }
    const handleSignOut = async () => {
        AlertService.confirm("Are you sure you want to Logout?").then(async (res) => {
            if (res) {
                await AsyncStorage.removeItem("User")
                await AsyncStorage.removeItem("Admin")
                await AsyncStorage.removeItem("id");
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Splash' },
                        ]
                    })
                );
            }
        })
    }
    const onFeature=async(item)=>{
        await saveData("Recieved",item?.id,{
            feature:!item.feature,
        })
        getUsers()
    }
    return (
        <>
            <Header
                style={{ backgroundColor: colors.light }}
                title="Albums"
                logout={() => { handleSignOut() }}
                onPress={() => props.navigation.goBack()}
            />
            <ScrollView
                style={{ flexGrow: 1, backgroundColor: colors.light }}
                contentContainerStyle={{ paddingVertical: HP(2), paddingBottom: HP(10), paddingHorizontal: WP(5) }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{}}>
                    <FlatList
                        numColumns={1}
                        data={albums}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View style={{marginTop:HP(2)}}>
                                <View style={{...GlobalStyles.row,justifyContent:'space-between'}}>
                                    <Text style={{ ...Styles.titleTxt,  }}>{item?.albumName}</Text>
                                    <Text style={{ ...Styles.titleTxt,  color:'red',fontSize:12}}>{item?.view}</Text>
                                    {item?.view=="Public" && 
                                    <TouchableOpacity onPress={()=>{onFeature(item)}} style={{ paddingHorizontal: WP(10),position:'absolute',right:WP(5), }}>
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
            </ScrollView>

        </>
    )
}

export default AdminAlbum;

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

})
