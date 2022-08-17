import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { getData, saveData } from './fire';
import { CommonActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

GoogleSignin.configure({
    scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: true,
    webClientId: '802060354200-5psgcv928rdjpp1rsqs7np5aba79ldm7.apps.googleusercontent.com',
})

Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var dayOfYear = ((today - onejan + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7)
};
const onGoogleLogout = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
}
async function onGoogleButtonPressed(props) {
    try {
        // onGoogleLogout ()
    const token = await messaging().getToken();
        await GoogleSignin.hasPlayServices();
        const { user } = await GoogleSignin.signIn();
        const chk = await getData("Users", user?.email)
    if (chk) {
        await saveData("Users", user.email, {
            profileUri: user?.photo,
            token:token,
        })
    }
    else {
        const today = new Date();
        const currentWeekNumber = today.getWeek();
        await saveData("Users", user?.email, {
            email: user?.email,
            name: user?.givenName+" "+user?.familyName,
            id: user?.id,
            profileUri: user?.photo,
            subscribed: [],
            imgs: [],
            subscribedIds: [],
            history: [],
            pin: [],
            showReminder: true,
            token:token,
            month: new Date().getMonth(),
            date: new Date().getDate(),
            year: new Date().getFullYear(),
            week: currentWeekNumber,
        })
    }
    await AsyncStorage.setItem('User', user?.email);
    await AsyncStorage.setItem('id', user?.id);
    await AsyncStorage.setItem('google','yes');
    props.navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                { name: 'UserTab' },
            ]
        })
    );
        console.log("go", user);
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            throw 'User cancelled the login process'
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            throw 'operation is in progress already'
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            throw 'play services not available or outdated'
        } else {
            // some other error happened
            console.log(error)
            throw 'some unknown error occurred'
        }
    }
};

export const GoogleActions = {
    onGoogleButtonPressed,
    onGoogleLogout,
}