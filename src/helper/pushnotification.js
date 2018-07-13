import firebaseNot from "react-native-firebase";
import DeviceInfo from "react-native-device-info";

export const pushnotification = async () => {
  console.log(DeviceInfo.getDeviceId(),"deviceId");
  const enabled = await firebaseNot.messaging().hasPermission();
  if (enabled) {
    // user has permissions
    console.log("enabled");
  } else {
    // user doesn't have permission
    try {
      await firebaseNot.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
      alert("You won't be able to receive any notification");
    }
  }

  const fcmToken = await firebaseNot.messaging().getToken();
  if (fcmToken) {
    // user has a device token
    console.log(fcmToken);
  } else {
    // user doesn't have a device token yet
    console.log("sadhbkj");
  }
  this.onTokenRefreshListener = firebaseNot
    .messaging()
    .onTokenRefresh(fcmToken => {
      // Process your token as required
      console.log(fcmToken);
    });
  const channel = new firebaseNot.notifications.Android.Channel(
    "channelId",
    "Channel Name",
    firebaseNot.notifications.Android.Importance.Max
  ).setDescription("A natural description of the channel");
  firebaseNot.notifications().android.createChannel(channel);

  this.notificationListener = firebaseNot
    .notifications()
    .onNotification(notification => {
      console.log(notfication, "notification");
      //   if (Platform.OS === "android") {
      //     const localNotification = new firebaseNot.notifications.Notification({
      //       sound: "default",
      //       show_in_foreground: true
      //     })
      //       .setNotificationId(notification.notificationId)
      //       .setTitle(notification.title)
      //       .setSubtitle(notification.subtitle)
      //       .setBody(notification.body)
      //       .setData(notification.data)
      //       .android.setChannelId("channelId") // e.g. the id you chose above
      //       .android.setSmallIcon("ic_stat_notification") // create this icon in Android Studio
      //       .android.setColor("#000000") // you can set a color here
      //       .android.setPriority(firebaseNot.notifications.Android.Priority.High);

      //     firebaseNot
      //       .notifications()
      //       .displayNotification(localNotification)
      //       .catch(err => console.error(err));
      //   }
    });
};
