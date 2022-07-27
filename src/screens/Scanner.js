import React, { createRef, useRef, useState } from 'react'
import { View, Text, Platform, ToastAndroid, Alert } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
const actionSheetRef = createRef();
const Scanner = (props,{navigation}) => {
  const [data,setData] = useState('')
  const actionSheetRef = useRef();
  function toastPrompt(msg) {
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
        alert(msg);
    }
}
  const onSuccess = async(e) => {
    // Alert.alert(e?.data)
    let sp=e?.data.split("/");
    props.navigation.navigate("UploadImageScreen",{email:sp[0],heading:sp[1]})
    setData(e?.data)
  };
  return (
    <View style={{ flex: 1 }}>
      <QRCodeScanner
        onRead={(e) => onSuccess(e)}
        flashMode={RNCamera.Constants.FlashMode.auto}
        topContent={
          <Text style={styles.centerText}>
            Hello{' '}
            <Text style={styles.textBold}>Scan Qr Code</Text>
            {'\n'}To Add User
          </Text>
        }
        bottomContent={
          <TouchableOpacity onPress={()=>props.navigation.goBack()} style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>GO BACK</Text>
          </TouchableOpacity>
        }
      />
  {/* <CustomAction dealby={data} actionSheetRef={actionSheetRef}/> */}
    </View>
  )
}
export default Scanner;
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});