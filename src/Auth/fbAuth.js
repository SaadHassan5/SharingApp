import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import { saveData, uploadFile } from './fire';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const onFacebookButtonPress = async (props) => {
    // Attempt login with permissions
    LoginManager.logOut();
    const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
    ]);
    if (result.isCancelled) {
        return null;
        // throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    console.log("Data", data);
    if (!data) {
        return null;
        // throw 'Something went wrong obtaining access token'
    }
    const facebookCredential = await auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    const res = await auth().signInWithCredential(facebookCredential)
    console.log("res", res);
    if(res?.additionalUserInfo?.isNewUser){
        await saveData("Users", res?.additionalUserInfo?.profile?.email, {
            email: res?.additionalUserInfo?.profile?.email,
            name: res?.additionalUserInfo?.profile?.name,
            id: res?.additionalUserInfo?.profile?.id,
            profileUri: res?.additionalUserInfo?.profile?.picture?.data?.url,
            subscribed: [],
            imgs:[],
            history:[],
            pin:[],
            month: new Date().getMonth(),
            date: new Date().getDate(),
            year: new Date().getFullYear(),
            week: currentWeekNumber,
        })
    }
    else{
        await saveData("Users", res?.additionalUserInfo?.profile?.email, {
            email: res?.additionalUserInfo?.profile?.email,
            name: res?.additionalUserInfo?.profile?.name,
            id: res?.additionalUserInfo?.profile?.id,
            profileUri: res?.additionalUserInfo?.profile?.picture?.data?.url,
        })
    }
    await AsyncStorage.setItem('User', res?.additionalUserInfo?.profile?.email);
    await AsyncStorage.setItem('id', res?.additionalUserInfo?.profile?.id);
    props.navigation.replace('UserTab')

};
