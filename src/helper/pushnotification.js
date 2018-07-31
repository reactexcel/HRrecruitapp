
import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';

export const pushnotification = () => {
 PushNotification.configure({

   onRegister: function(token) {
     //process token
     console.log('token',token)
   },

   onNotification: function(notification) {
     // process the notification
     // required on iOS only
     alert('notif')
     notification.finish(PushNotificationIOS.FetchResult.NoData);
   },

   permissions: {
     alert: true,
     badge: true,
     sound: true
   },

   popInitialNotification: true,
   requestPermissions: true,

 });
};

