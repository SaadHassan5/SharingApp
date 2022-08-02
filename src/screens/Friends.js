import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-virtualized-view';
import React, { useEffect, useState } from 'react';
import { colors, spacing } from '../theme';
import Header from '../components/Header';
import { filterCollection, getAllOfCollection } from '../Auth/fire';
import { HP, WP } from '../assets/config';
import fontFamily from '../assets/config/fontFamily';
import { connect } from 'react-redux';
import { ChangeBackgroundColor, GetUser } from '../root/action';

const Friends = (props) => {
  const [allPosts, setPosts] = useState([])
  const [allUser, setAllUser] = useState([])
  const [mod, setMod] = useState(true)
  const [active, setActive] = useState(false)
  const [history, setHistory] = useState([])
  const [preImgs, setPreImgs] = useState([])

  useEffect(() => {
    console.log(props.route);
    getUsers();
    getAlbums()
  }, [])
  const getUsers = async () => {
    const res = await getAllOfCollection('Users');
    console.log(res);
    setAllUser(res)
  }
  async function getAlbums() {
    let sub = [];
    await props?.user?.history?.filter(async (i) => {
      let temp = await filterCollection("Recieved", i?.email, false, "owner", "reject");
      sub.push({ ...i, albums: temp })
    })
    console.log("filtered========>", sub);
    setTimeout(() => {
      setHistory(sub)
    }, 2000)
  }
  async function getFriendsAlbum(friendEmail) {
    const res = await filterCollection("Recieved", "msaadhassan70@gmail.com", false, "owner", "reject");
    return res;
  }
  return (
    <>
      <Header
        style={{ backgroundColor: colors.light }}
        title="Friends"
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView
        style={{ flexGrow: 1, backgroundColor: colors.light }}
        contentContainerStyle={{ paddingVertical: HP(2), paddingHorizontal: WP(5) }}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          numColumns={1}
          data={history}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <View style={{ ...styles.card }}>
              <TouchableOpacity onPress={() => {props.navigation.navigate("FriendProfile",item) }} style={{ paddingVertical: HP(2), paddingHorizontal: WP(5), }}>
                <View style={{ ...styles.row }}>
                  <Image source={{ uri: item?.profileUri }} style={{ width: WP(18), height: WP(18), borderRadius: WP(9) }} />
                  <View style={{ paddingHorizontal: WP(5) }}>
                    <Text style={{ ...styles.btnTxt, color: 'black' }}>{item?.name}</Text>
                    <Text style={{ ...styles.btnTxt, color: 'black', fontFamily: fontFamily.light }}>{item?.email}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <ScrollView horizontal>
                {item?.albums.map((subItem, i) =>
                  <View key={i} style={{ paddingRight: WP(5) }}>
                    <Image source={{ uri: subItem?.imgs[0] }} style={{ width: WP(25), height: WP(25), borderRadius: WP(2) }} />
                  </View>
                )}
              </ScrollView>
            </View>
          }
        />
      </ScrollView>

    </>
  )
}

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
export default connect(mapStateToProps, mapDispatchToProps)(Friends);

const styles = StyleSheet.create({
  btnView: {
    backgroundColor: colors.primary, paddingHorizontal: WP(10), paddingVertical: HP(1)
  },
  btnTxt: {
    color: '#fff', fontSize: 13, fontFamily: fontFamily.bold
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: spacing[3],
    marginBottom: spacing[8],

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  infoBtn: {
    width: 130,
    marginRight: 10,
    backgroundColor: "#EDEEF3",
  },
  lecturesBtn: {
    width: 130,
    backgroundColor: "#EDEEF3",
  },
  updateContainer: {
    flexDirection: 'row'
  },
  title: {
    color: colors.black,
    marginVertical: 20,
  },
  updateText: {
    color: colors.gray4,
    fontWeight: '500'
  },
  updateDate: {
    color: colors.black,
    fontWeight: '700'
  },
  desc: {
    marginVertical: 30
  },
  readMore: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16
  },
  teacherDescContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  teacherContent: {
    flexDirection: 'row',
  },
  teacherDetails: {
    marginLeft: 10
  },
  teacherRating: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  paymentContainer: {
    marginVertical: 35,
  },
  paymentTitle: {
    color: colors.black,
    fontSize: 20
  },
  paymentMethods: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15
  },
  imgStyle: {
    marginRight: 15,
  }
})
