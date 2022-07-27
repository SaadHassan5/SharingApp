import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList,ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-virtualized-view';
import React, { useEffect, useState } from 'react';
import { colors, spacing } from '../theme';
import Header from '../components/Header';
import { getAllOfCollection } from '../Auth/fire';
import { HP, WP } from '../assets/config';
import fontFamily from '../assets/config/fontFamily';

const UserAdmin = (props) => {
  const [allPosts, setPosts] = useState([])
  const [allUser, setAllUser] = useState([])
  const [mod, setMod] = useState(true)
  const [active, setActive] = useState(false)
  const [imgs, setImgs] = useState([])
  const [preImgs, setPreImgs] = useState([])

  useEffect(() => {
    console.log(props.route);
    getUsers();
  }, [])
  const getUsers = async () => {
    const res = await getAllOfCollection('Users');
    console.log(res);
    setAllUser(res)
  }

  return (
    <>
      <Header
        style={{ backgroundColor: colors.light }}
        title="Users"
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView
        style={{ flexGrow: 1, backgroundColor: colors.light }}
        contentContainerStyle={{ paddingVertical: HP(2), paddingHorizontal: WP(5) }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={()=>{props.navigation.navigate('UserCount')}} style={{...styles.btnView,justifyContent:'center',paddingVertical:HP(1.4)}}>
          <Text style={{...styles.btnTxt,textAlign:'center'}}>User Count</Text>
        </TouchableOpacity>
        <FlatList
          numColumns={1}
          data={allUser}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={()=>{}} style={{ ...styles.card }}>
              <View style={{ ...styles.row }}>
                <Image source={{ uri: item?.profileUri }} style={{ width: WP(18), height: WP(18), borderRadius: WP(9) }} />
                <View style={{paddingHorizontal:WP(5)}}>
                  <Text style={{ ...styles.btnTxt, color: 'black' }}>{item?.name}</Text>
                  <Text style={{ ...styles.btnTxt, color: 'black',fontFamily:fontFamily.light }}>{item?.email}</Text>
                </View>
              </View>
            </TouchableOpacity>
          }
        />
      </ScrollView>

    </>
  )
}

export default UserAdmin;

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
    paddingVertical: HP(2), paddingHorizontal: WP(5),
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
