import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { colors, spacing } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
// import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import IconIonicons from "react-native-vector-icons/Ionicons"
import IconEntypo from "react-native-vector-icons/Entypo"
import IconAnt from "react-native-vector-icons/AntDesign"
import AppText from './AppText';
// import { addToWishList } from '../redux/features/wishlistSlice';
import adjust from '../theme/adjust';
import { IMAGES } from '../assets/imgs';
import { HP, WP } from '../assets/config';
import fontFamily from '../assets/config/fontFamily';

export default function SingleCourse({ item, verticalCourses, prop, onSubscribe,pinned }) {
  const navigation = useNavigation();
  const [isWishList, setIsWishList] = useState(false);
  const dispatch = useDispatch();
  const handleWishListItem = (item) => {
    // dispatch(addToWishList(item));
    setIsWishList(true)
  }


  return (
    <>

      <TouchableOpacity
        onPress={() => navigation.navigate('PostedPosts', item)}>
        <View style={{ ...styles.card, marginHorizontal: WP(5) }}>
          <TouchableOpacity style={{position: 'absolute',right:0,top:0,paddingHorizontal:WP(5),paddingVertical:HP(1)}}>
            <IconAnt name='pushpino' size={25} color={colors.primary}/>
          </TouchableOpacity>
          <View style={{ paddingHorizontal: spacing[8], paddingVertical: spacing[5], }}>
            <View style={styles.courseItem}>

              <View style={styles.courseDetails}>
                <AppText preset="h5"
                  style={styles.courseTitle} >
                  {item.name}
                </AppText>
                <View style={{ paddingHorizontal: WP(5) }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <AppText preset="h1"
                      style={styles.optionTxt} >
                      Option 01: {item?.option1}
                    </AppText>
                    <AppText preset="h1"
                      style={styles.optionTxt} >
                      {item?.option1Points}
                    </AppText>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <AppText preset="h1"
                      style={styles.optionTxt} >
                      Option 02: {item?.option2}
                    </AppText>
                    <AppText preset="h1"
                      style={styles.optionTxt} >
                      {item?.option2Points}
                    </AppText>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <AppText preset="h1"
                      style={styles.optionTxt} >
                      Option 03: {item?.option3}
                    </AppText>
                    <AppText preset="h1"
                      style={styles.optionTxt} >
                      {item?.option3Points}
                    </AppText>
                  </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <AppText preset="h1"
                      style={styles.optionTxt} >
                      Option 04: {item?.option4}
                    </AppText>
                    <AppText preset="h1"
                      style={styles.optionTxt} >
                      {item?.option4Points}
                    </AppText>
                  </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <AppText preset="h1"
                      style={styles.optionTxt} >
                      Option 05: {item?.option5}
                    </AppText>
                    <AppText preset="h1"
                      style={styles.optionTxt} >
                      {item?.option5Points}
                    </AppText>
                </View>
                </View>
                <View style={styles.courseBottomContent}>
                  <View style={styles.courseBottomText}>
                    <IconEntypo name="dot-single" size={adjust(16)}
                      color={colors.gray3} />
                    <AppText style={styles.text}>
                      {item.email}
                    </AppText>
                  </View>
                  <View style={styles.courseBottomText}>
                    <IconEntypo name="dot-single" size={adjust(16)}
                      color={colors.gray3} />
                  </View>
                </View>
                {item?.userPoints>-1 &&
                  <AppText preset="h1"
                    style={{ ...styles.optionTxt, color: colors.golden,fontFamily:fontFamily.bold,textAlign:'right' }} >
                    User Points: {item?.userPoints}
                  </AppText>
                }
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={pinned} style={{position: 'absolute',right:0,top:0,paddingHorizontal:WP(5),paddingVertical:HP(1)}}>
          {prop.user.pin?.find((i) => {
              return item.id == i?.id
            }) ?
            <IconAnt name='pushpin' size={25} color={colors.primary}/>
            :
            <IconAnt name='pushpino' size={25} color={colors.primary}/>
          }
            {/* pushpin */}
          </TouchableOpacity>
          <TouchableOpacity onPress={onSubscribe} style={{ backgroundColor: colors.primary, paddingVertical: HP(1.3), justifyContent: 'center', alignItems: 'center' }}>
            {prop.user.subscribed?.find((i) => {
              return item.id == i?.id
            }) ?
              <AppText style={{ ...styles.courseTitle, color: "#fff", marginTop: 0 }}>  Unsubscribe
              </AppText>

              :
              <AppText style={{ ...styles.courseTitle, color: "#fff", marginTop: 0 }}>  Subscribe
              </AppText>
            }

          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: spacing[3],
    marginBottom: spacing[8]
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
  courseWrapper: {
    // paddingHorizontal: 20,
    flexWrap: "wrap"
  },
  courseItem: {
    width: "100%",
    // padding: 10,
    backgroundColor: colors.white,
    overflow: "hidden",
    // borderRadius: 10,
    flexDirection: "row",
    // marginBottom: 10,
  },
  courseImg: {
    alignSelf: "flex-start",
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    position: 'relative'
  },
  courseDetails: {
    // paddingHorizontal: 10,
    justifyContent: "space-between",
    flexGrow: 1,
    flex: 1,
    fontFamily: fontFamily.medium

  },
  courseTitle: {
    color: colors.black,
    // marginTop: spacing[4],
    fontSize: adjust(14),
    fontFamily: fontFamily.bold
  },
  optionTxt: {
    color: colors.black,
    // marginTop: spacing[1],
    fontSize: adjust(11),
    fontFamily: fontFamily.medium
  },
  courseBottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingTop: spacing[1],
  },
  courseBottomText: {
    flexDirection: "row",
    alignItems: 'center',
  },
  text: {
    color: colors.gray3,
    fontWeight: "600",
    fontSize: adjust(12),
  }
})