import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed, Capacitor } from '@capacitor/core';
import {
  getMessaging,
  onMessage,
  isSupported,
  getToken,
} from "@firebase/messaging";
import User from "./User";

const { PushNotifications } = Plugins;
const isAvailable = Capacitor.isPluginAvailable("PushNotifications");

export default class Notifications {
  constructor() {
    if (!isAvailable) {
      this.askForPushNotifications();
      this.foregroundMessages();
    } else {
      PushNotifications.register();

      PushNotifications.addListener(
        "registration",
        (token: PushNotificationToken) => {
          alert("Push registration success, token: " + token.value);
        }
      );

      PushNotifications.addListener("registrationError", (error: any) => {
        alert("Error on registration: " + JSON.stringify(error));
      });

      PushNotifications.addListener(
        "pushNotificationReceived",
        (notification: PushNotification) => {
          alert("Push received: " + JSON.stringify(notification));
        }
      );

      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification: PushNotificationActionPerformed) => {
          alert("Push action performed: " + JSON.stringify(notification));
        }
      );
    }
  }

  get granted() {
    return Notification.permission === "granted";
  }

  static supported() {
    return isAvailable && isSupported();
  }

  foregroundMessages() {
    onMessage(getMessaging(), (payload) => {
      console.log("Message received. ", payload);
    });
  }

  askForPushNotifications = async () => {
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      let token;

      token = await getToken(getMessaging(), { serviceWorkerRegistration });

      if (this.granted) {
        const user = (await User.current()) as User;
        user.pushNotificationKeys = [...user.pushNotificationKeys, token];
        await user.save();
      }

      return token;
    } catch (error) {
      throw error;
    }
  };
}
