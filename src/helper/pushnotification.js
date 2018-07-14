import firebaseRN from "react-native-firebase";
import DeviceInfo from "react-native-device-info";

export const pushnotification = async () => {
  console.log(DeviceInfo.getDeviceId(), "deviceId");
  const enabled = await firebaseRN.messaging().hasPermission();
  if (enabled) {
    // user has permissions
    console.log("enabled");
  } else {
    // user doesn't have permission
    try {
      await firebaseRN.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
      alert("You won't be able to receive any notification");
    }
  }

  const fcmToken = await firebaseRN.messaging().getToken();
  if (fcmToken) {
    // user has a device token
    console.log(fcmToken);
  } else {
    // user doesn't have a device token yet
    console.log("sadhbkj");
  }
  this.onTokenRefreshListener = firebaseRN
    .messaging()
    .onTokenRefresh(fcmToken => {
      // Process your token as required
      console.log(fcmToken);
    });
  const channel = new firebaseRN.notifications.Android.Channel(
    "channelId",
    "Channel Name",
    firebaseRN.notifications.Android.Importance.Max
  ).setDescription("A natural description of the channel");
  firebaseRN.notifications().android.createChannel(channel);

  this.notificationListener = firebaseRN
    .notifications()
    .onNotification(notification => {
      console.log(notfication, "notification");
      //   if (Platform.OS === "android") {
      //     const localNotification = new firebaseRN.notifications.Notification({
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
      //       .android.setPriority(firebaseRN.notifications.Android.Priority.High);

      //     firebaseRN
      //       .notifications()
      //       .displayNotification(localNotification)
      //       .catch(err => console.error(err));
      //   }
    });
  const notificationOpen = await firebaseRN
    .notifications()
    .getInitialNotification();
  if (notificationOpen) {
    // App was opened by a notification
    // Get the action triggered by the notification being opened
    console.log(notificationOpen, "opennotification");
    const action = notificationOpen.action;
    // Get information about the notification that was opened
    const notification = notificationOpen.notification;
  }

  firebaseRN.notifications().onNotificationOpened(notification => {
    console.log(notification.notification.data, "open notif");
  });
};
