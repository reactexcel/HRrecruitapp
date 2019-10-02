import {ToastAndroid, Alert} from "react-native";

export default AlertMessage = (message, type) => { 
    if(type == 'toast') {
       return  ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else{
       return  Alert.alert(
          'Alert',
          message,
        );
     }
}
