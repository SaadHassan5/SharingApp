import { StyleSheet, View, Text,ScrollView } from 'react-native';;
import React, { useEffect, useState } from 'react';
// import { FontAwesome } from '@expo/vector-icons';
// import { Video } from 'expo-av';
// import { AntDesign } from '@expo/vector-icons';
import { colors, spacing } from '../theme';
import Header from '../components/Header';
import { filterCollection, filterCollectionTriple, getAllOfCollection } from '../Auth/fire';
import { HP, WP } from '../assets/config';
import fontFamily from '../assets/config/fontFamily';

const UserCount = (props) => {
  const [allUser, setAllUser] = useState([])
  const [todayCount, setTodayCount] = useState(0)
  const [weeklyCount, setWeeklyCount] = useState(0)
  const [monthCount, setMonthCount] = useState(0)

  useEffect(() => {
    console.log(props.route);
    getDate();
    getUsers();
  }, [])
  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var dayOfYear = ((today - onejan + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7)
  };
  const getDate = async () => {
    const todays = new Date();
    const currentWeekNumber = todays.getWeek();
    console.log('crWq1', currentWeekNumber);
    console.log("Date", new Date().getDate());
    const today = await filterCollectionTriple("Users", new Date().getDate(), new Date().getMonth(), new Date().getFullYear(), 'date', 'month', 'year')
    const month = await filterCollection("Users", new Date().getMonth(), new Date().getFullYear(), 'month', 'year')
    const weekly = await filterCollection("Users", currentWeekNumber, new Date().getFullYear(), 'week', 'year')
    console.log('Today', today);
    setTodayCount(today.length)
    setWeeklyCount(weekly.length)
    setMonthCount(month.length)
  }
  const getUsers = async () => {
    const res = await getAllOfCollection('Users');
    console.log(res);
    setAllUser(res)
  }

  return (
    <>
      <Header
        style={{ backgroundColor: colors.light }}
        title="Users Count"
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView
        style={{ flexGrow: 1, backgroundColor: colors.light }}
        contentContainerStyle={{ paddingVertical: HP(2), paddingHorizontal: WP(5) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: WP(15), paddingTop: HP(2) }}>
          <View style={{ ...styles.row ,justifyContent:'space-between'}}>
            <Text style={{ ...styles.paymentTitle }}>Today Count:</Text>
            <Text style={{ ...styles.paymentTitle }}>{todayCount}</Text>
          </View>
          <View style={{ ...styles.row ,justifyContent:'space-between'}}>
            <Text style={{ ...styles.paymentTitle }}>Weekly Count:</Text>
            <Text style={{ ...styles.paymentTitle }}>{weeklyCount}</Text>
          </View>
          <View style={{ ...styles.row ,justifyContent:'space-between'}}>
            <Text style={{ ...styles.paymentTitle }}>Monthly Count:</Text>
            <Text style={{ ...styles.paymentTitle }}>{monthCount}</Text>
          </View>
        </View>
      </ScrollView>

    </>
  )
}

export default UserCount;

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
    marginTop:HP(1)
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
    fontFamily:fontFamily.bold,
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
