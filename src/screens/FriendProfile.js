import React, { useEffect, useState } from 'react';
import { Share, View, StyleSheet, Image, TouchableOpacity, Text, Linking ,ScrollView, FlatList, SafeAreaView} from 'react-native';
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
import { filterCollectionSingle } from '../Auth/fire';
// import AlertService from '../Services/alertService';

function FriendProfile(props) {
  const [email, setEmail] = useState(props?.user?.email)
  const dispatch = useDispatch();
  const user = useState({});
  const [opt, setOpt] = useState('');
  const [posts, setPosts] = useState([])
  const [allAlbums, setAllAlbums] = useState([])
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
    });
    return unsubscribe;
  }, [props.navigation])


  return (
    <SafeAreaView style={{backgroundColor:"#fff",flex:1}}>
      <Header title={props.route?.params?.name} goBack={()=>{props.navigation?.goBack()}} style={{ backgroundColor: colors.light }} />
      <Screen style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: HP(20), paddingTop: HP(2) }}
        >
          <View style={styles.userProfileBox}>
            <Image source={{ uri: props.route?.params?.profileUri }} style={{ width: WP(25), height: WP(25),borderRadius:WP(13)}} />
            <TouchableOpacity
            >
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <AppText style={styles.userName} preset='h4'>{props.route?.params?.name}</AppText>
              <AppText style={styles.userEmail}>{props.route?.params?.email}</AppText>
            </View>
          </View>
          <FlatList
                        numColumns={1}
                        data={props.route.params?.albums}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={()=>{props.navigation.navigate("AllPhotos",item)}}>
                                <Text style={{ ...styles.titleTxt, paddingVertical: HP(3) }}>{item?.albumName}</Text>
                                <FlatList
                                    // numColumns={1}
                                    horizontal
                                    data={item?.imgs}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) =>
                                        <Image source={{ uri: item }} style={{ width: WP(40), height: WP(40), marginRight: WP(5),borderRadius:WP(2) }} />
                                    } />

                            </TouchableOpacity>
                        }
                    />

        </ScrollView>
      </Screen>
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
export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile);
const styles = StyleSheet.create({
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