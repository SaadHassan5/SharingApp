import { StyleSheet, View, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-virtualized-view';
import React, { useEffect, useState } from 'react';
// import { FontAwesome } from '@expo/vector-icons';
// import { Video } from 'expo-av';
// import { AntDesign } from '@expo/vector-icons';
import { colors, spacing } from '../theme';
import Header from '../components/Header';
import AppButton from '../components/AppButton';
import { saveData } from '../Auth/fire';
import { HP, WP } from '../assets/config';
import fontFamily from '../assets/config/fontFamily';
import AlertService from '../Services/alertService';
import AppTextInput from '../components/AppTextInput';

const AdminNotify = (props) => {
  const [titleNot, setTitleNot] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    // console.log(props.route);
    // getDate();
    // getUsers();
  }, [])
  async function sendNotification() {
    AlertService?.confirm("Confirmation?").then(async (res) => {
      await saveData("ManualNotifications", '', {
        title: titleNot,
        body: body
      })
    })
  }

  return (
    <>
      <Header
        style={{ backgroundColor: colors.light }}
        title="Notifications"
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView
        style={{backgroundColor: colors.light }}
        contentContainerStyle={{ paddingVertical: HP(2), paddingHorizontal: WP(5) }}
        showsVerticalScrollIndicator={false}
      >
        {/* <View style={{ paddingHorizontal: WP(5), paddingTop: HP(2) }}> */}
          <AppTextInput placeholderText='Enter Title' onChange={(e) => setTitleNot(e) } />
          <AppTextInput placeholderText='Enter Body' onChange={(e) => setBody(e) } />
          <View style={{ marginTop: HP(5) }}>
            <AppButton title={"Send"} onPress={() => { sendNotification() }} />
          {/* </View> */}
        </View>
      </ScrollView>

    </>
  )
}

export default AdminNotify;

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
    marginTop: HP(1)
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
    fontFamily: fontFamily.bold,
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
