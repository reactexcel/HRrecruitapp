import firebaseRN from "react-native-firebase";

export const pushnotification = async () => {
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

  const notificationOpen = await firebaseRN
    .notifications()
    .getInitialNotification();
  if (notificationOpen) {
    // App was opened by a notification
    // Get the action triggered by the notification being opened
    alert("notification open closed");
    console.log(notificationOpen, "opennotification");
    const action = notificationOpen.action;
    // Get information about the notification that was opened
    const notification = notificationOpen.notification;
  }
};
