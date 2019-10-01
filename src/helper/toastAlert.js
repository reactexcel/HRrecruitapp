import {ToastAndroid, Alert} from "react-native";

export default alert = (message) => { 
    if(Platform.OS == 'android') {
       return  ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else if( Platform.OS == 'ios'){
       return  Alert.alert(
          'Alert',
          message,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
     }
}
