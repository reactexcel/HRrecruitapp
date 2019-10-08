import {ToastAndroid, Alert} from "react-native";

export default AlertMessage = (message, type,onPress) => { 
    if(type == 'toast') {
       return  ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else{
        // if(onPress)
       return  Alert.alert(
          'Alert',
          message,
          [{
            text: "Ok",
            onPress:  () => {onPress ? onPress() : null}
          }]
        );
     }
}
