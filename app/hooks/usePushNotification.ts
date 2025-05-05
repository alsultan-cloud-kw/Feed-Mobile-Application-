// // hooks/usePushNotification.ts
// import { useState, useEffect } from "react";
// import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";
// import { Platform } from "react-native";
// import { router } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import analytics from "@react-native-firebase/analytics";

// interface NotificationData {
//   title: string;
//   body: string;
//   sound?: string;
//   imageUrl?: string;
//   deepLink?: string;
//   buttons?: Array<{
//     text: string;
//     action: string;
//   }>;
//   targetUserIds?: string[];
//   scheduledTime?: Date;
// }

// export const usePushNotification = () => {
//   const [expoPushToken, setExpoPushToken] = useState<string>("");
//   const [notification, setNotification] =
//     useState<Notifications.Notification>();

//   useEffect(() => {
//     try {
//       registerForPushNotificationsAsync();
//       setupNotificationHandlers();
//     } catch (err) {
//       console.log(err);
//     }

//     return () => {
//       Notifications.removeNotificationSubscription(notification);
//     };
//   }, []);

//   const registerForPushNotificationsAsync = async () => {
//     if (!Device.isDevice) {
//       console.warn("Must use physical device for Push Notifications");
//       return;
//     }

//     try {
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;

//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }

//       if (finalStatus !== "granted") {
//         throw new Error("Failed to get push token for push notification!");
//       }

//       const token = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId: process.env.EXPO_PUBLIC_PROJECT_ID, // Add to your app.config.js
//         })
//       ).data;

//       setExpoPushToken(token);
//       // Log the token for testing
//       console.log("----------Expo Push Token:", token);

//       await AsyncStorage.setItem("pushToken", token);

//       const savedToken = await AsyncStorage.getItem("pushToken");
//       console.log("Saved Token in AsyncStorage:", savedToken);

//       if (Platform.OS === "android") {
//         await setupAndroidChannel();
//       }
//     } catch (error) {
//       console.error("Error registering for push notifications:", error);
//     }
//   };

//   const setupAndroidChannel = async () => {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   };

//   const setupNotificationHandlers = () => {
//     // Handle notifications when app is in foreground
//     Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: true,
//       }),
//     });

//     // Handle notification received
//     const receivedSubscription = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         setNotification(notification);
//         logNotificationReceived(notification);
//       }
//     );

//     // Handle notification response (user tap)
//     const responseSubscription =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         handleNotificationResponse(response);
//       });

//     return () => {
//       receivedSubscription.remove();
//       responseSubscription.remove();
//     };
//   };

//   const handleNotificationResponse = async (
//     response: Notifications.NotificationResponse
//   ) => {
//     const data = response.notification.request.content.data;

//     // Handle deep linking
//     if (data.deepLink) {
//       router.push(data.deepLink);
//     }

//     // Log interaction
//     await analytics().logEvent("notification_opened", {
//       notification_id: data.id,
//       action: response.actionIdentifier,
//     });
//   };

//   const logNotificationReceived = async (
//     notification: Notifications.Notification
//   ) => {
//     await analytics().logEvent("notification_received", {
//       notification_id: notification.request.identifier,
//       title: notification.request.content.title,
//     });
//   };

//   const sendNotification = async (notificationData: NotificationData) => {
//     try {
//       const message = {
//         to: notificationData.targetUserIds
//           ? await getTargetTokens(notificationData.targetUserIds)
//           : expoPushToken,
//         sound: notificationData.sound || "default",
//         title: notificationData.title,
//         body: notificationData.body,
//         data: {
//           deepLink: notificationData.deepLink,
//           id: Date.now().toString(),
//         },
//         categoryId: notificationData.buttons ? "actions" : undefined,
//       };

//       if (notificationData.imageUrl) {
//         message.data.imageUrl = notificationData.imageUrl;
//       }

//       if (notificationData.buttons) {
//         await setupNotificationActions(notificationData.buttons);
//       }

//       const response = await fetch("https://exp.host/--/api/v2/push/send", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Accept-encoding": "gzip, deflate",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });

//       const result = await response.json();
//       console.log("Push notification sent:", result);

//       await analytics().logEvent("notification_sent", {
//         notification_id: message.data.id,
//       });

//       return result;
//     } catch (error) {
//       console.error("Error sending push notification:", error);
//       throw error;
//     }
//   };

//   const setupNotificationActions = async (
//     buttons: Array<{ text: string; action: string }>
//   ) => {
//     await Notifications.setNotificationCategoryAsync(
//       "actions",
//       buttons.map((button) => ({
//         identifier: button.action,
//         buttonTitle: button.text,
//         options: {
//           opensAppToForeground: true,
//         },
//       }))
//     );
//   };

//   const getTargetTokens = async (userIds: string[]) => {
//     // Implement your logic to fetch tokens for target users
//     // This would typically involve a backend API call
//     return [];
//   };

//   return {
//     expoPushToken,
//     notification,
//     sendNotification,
//   };
// };
/************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */
/************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */ /************************************************** */
//Works baisc notifications

// hooks/usePushNotification.ts
import { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { router } from "expo-router";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const usePushNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync();

    // Set up notification listeners
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
        const data = response.notification.request.content.data;

        // Handle deep linking
        if (data?.url) {
          router.push(data.url);
        }
      });

    // Cleanup
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (!Device.isDevice) {
      console.log("Must use physical device for Push Notifications");
      return;
    }

    try {
      // Request permission
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      console.log("Existing permission status:", existingStatus);

      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        console.log("New permission status:", status);
      }

      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }

      // Get Expo push token
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "b7f5b17f-5fa3-4f5b-92da-b69f5c585ebc", // Your Expo project ID
        })
      ).data;

      console.log("Push token:", token);
      setExpoPushToken(token);

      // Set up Android channel
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
          sound: "notification.mp3", // Must match the filename in app.json
        });
      }
    } catch (error) {
      console.error("Error getting push token:", error);
    }
  };

  // Function to send a local notification (for testing)
  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification",
        body: "This is a test notification",
        data: { url: "/home" },
        sound: "notification.mp3",
      },
      trigger: null, // null means send immediately
    });
  };

  return {
    expoPushToken,
    notification,
    sendTestNotification,
  };
};

/******************************************************/

// Image and buttons Integrations

// import { useState, useEffect, useRef } from "react";
// import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";
// import { Platform } from "react-native";
// import { router } from "expo-router";

// // Configure notification behavior
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

// interface NotificationButton {
//   text: string;
//   id: string;
// }

// export const usePushNotification = () => {
//   const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
//   const [notification, setNotification] =
//     useState<Notifications.Notification>();
//   const notificationListener = useRef<Notifications.Subscription>();
//   const responseListener = useRef<Notifications.Subscription>();

//   useEffect(() => {
//     registerForPushNotificationsAsync();

//     // Set up notification listeners
//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         console.log("Notification received:", notification);
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log("Notification response:", response);
//         const { data, actionIdentifier } =
//           response.notification.request.content;

//         // Handle button actions
//         if (
//           actionIdentifier &&
//           actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER
//         ) {
//           console.log("Button pressed:", actionIdentifier);
//           if (data?.url) {
//             router.push(data.url);
//           }
//         }
//         // Handle regular tap
//         else if (data?.url) {
//           router.push(data.url);
//         }
//       });

//     // Cleanup
//     return () => {
//       if (notificationListener.current) {
//         Notifications.removeNotificationSubscription(
//           notificationListener.current
//         );
//       }
//       if (responseListener.current) {
//         Notifications.removeNotificationSubscription(responseListener.current);
//       }
//     };
//   }, []);

//   const registerForPushNotificationsAsync = async () => {
//     let token;

//     if (!Device.isDevice) {
//       console.log("Must use physical device for Push Notifications");
//       return;
//     }

//     try {
//       // Request permission
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       console.log("Existing permission status:", existingStatus);

//       let finalStatus = existingStatus;
//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//         console.log("New permission status:", status);
//       }

//       if (finalStatus !== "granted") {
//         console.log("Failed to get push token for push notification!");
//         return;
//       }

//       // Get Expo push token
//       token = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId: "b7f5b17f-5fa3-4f5b-92da-b69f5c585ebc", // Your Expo project ID
//         })
//       ).data;

//       console.log("Push token:", token);
//       setExpoPushToken(token);

//       // Set up Android channel
//       if (Platform.OS === "android") {
//         await Notifications.setNotificationChannelAsync("default", {
//           name: "default",
//           importance: Notifications.AndroidImportance.MAX,
//           vibrationPattern: [0, 250, 250, 250],
//           lightColor: "#FF231F7C",
//           sound: "notification.mp3",
//         });
//       }
//     } catch (error) {
//       console.error("Error getting push token:", error);
//     }
//   };

//   // Enhanced test notification function with optional image and buttons
//   const sendTestNotification = async ({
//     title = "Test Notification",
//     body = "This is a test notification",
//     url = "/home",
//     imageUrl,
//     buttons,
//   }: {
//     title?: string;
//     body?: string;
//     url?: string;
//     imageUrl?: string;
//     buttons?: NotificationButton[];
//   } = {}) => {
//     const notificationContent: any = {
//       title,
//       body,
//       data: { url },
//       sound: "notification.mp3",
//     };

//     // Add image if provided
//     if (imageUrl) {
//       if (Platform.OS === "ios") {
//         notificationContent.attachments = [
//           {
//             url: imageUrl,
//             identifier: "image",
//           },
//         ];
//       } else {
//         notificationContent.icon = imageUrl;
//       }
//     }

//     // Add buttons if provided
//     if (buttons?.length) {
//       if (Platform.OS === "ios") {
//         await Notifications.setNotificationCategoryAsync("actions", {
//           buttons: buttons.map((button) => ({
//             identifier: button.id,
//             buttonTitle: button.text,
//             options: {
//               opensAppToForeground: true,
//             },
//           })),
//         });
//         notificationContent.categoryIdentifier = "actions";
//       }
//     }

//     await Notifications.scheduleNotificationAsync({
//       content: notificationContent,
//       trigger: null, // null means send immediately
//     });
//   };

//   return {
//     expoPushToken,
//     notification,
//     sendTestNotification,
//   };
// };

/************************************************ */

// Firebase Integrated

// import { useState, useEffect, useRef } from "react";
// import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";
// import { Platform } from "react-native";
// import { router } from "expo-router";
// import messaging from "@react-native-firebase/messaging";

// // Configure notification behavior
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

// interface NotificationButton {
//   text: string;
//   id: string;
// }

// export const usePushNotification = () => {
//   const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
//   const [fcmToken, setFcmToken] = useState<string | undefined>();
//   const [notification, setNotification] =
//     useState<Notifications.Notification>();
//   const notificationListener = useRef<Notifications.Subscription>();
//   const responseListener = useRef<Notifications.Subscription>();

//   useEffect(() => {
//     setupNotifications();
//     return cleanupListeners;
//   }, []);

//   const setupNotifications = async () => {
//     await registerForPushNotificationsAsync();
//     await setupFCM();
//     setupNotificationListeners();
//   };

//   const setupFCM = async () => {
//     try {
//       if (Platform.OS === "ios") {
//         const authStatus = await messaging().requestPermission();
//         const enabled =
//           authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//           authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//         if (!enabled) {
//           console.log("iOS FCM authorization status:", authStatus);
//           return;
//         }
//       }

//       // Get FCM token
//       const token = await messaging().getToken();
//       console.log("FCM Token:", token);
//       setFcmToken(token);

//       // Listen to FCM token refresh
//       messaging().onTokenRefresh((token) => {
//         console.log("FCM Token refreshed:", token);
//         setFcmToken(token);
//       });

//       // Handle FCM messages
//       messaging().onMessage(async (remoteMessage) => {
//         console.log("Received FCM message:", remoteMessage);
//         handleFCMMessage(remoteMessage);
//       });

//       // Handle background messages
//       messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//         console.log("Background FCM message:", remoteMessage);
//         handleFCMMessage(remoteMessage);
//       });
//     } catch (error) {
//       console.error("Error setting up FCM:", error);
//     }
//   };

//   const handleFCMMessage = async (message: any) => {
//     const notification = {
//       title: message.notification?.title,
//       body: message.notification?.body,
//       data: message.data,
//       imageUrl:
//         message.notification?.android?.imageUrl ||
//         message.notification?.ios?.imageUrl,
//     };

//     await showNotification(notification);
//   };

//   const setupNotificationListeners = () => {
//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         console.log("Notification received:", notification);
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log("Notification response:", response);
//         const { data, actionIdentifier } =
//           response.notification.request.content;

//         if (
//           actionIdentifier &&
//           actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER
//         ) {
//           console.log("Button pressed:", actionIdentifier);
//           if (data?.url) {
//             router.push(data.url);
//           }
//         } else if (data?.url) {
//           router.push(data.url);
//         }
//       });
//   };

//   const cleanupListeners = () => {
//     if (notificationListener.current) {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//     }
//     if (responseListener.current) {
//       Notifications.removeNotificationSubscription(responseListener.current);
//     }
//   };

//   const registerForPushNotificationsAsync = async () => {
//     if (!Device.isDevice) {
//       console.log("Must use physical device for Push Notifications");
//       return;
//     }

//     try {
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;

//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }

//       if (finalStatus !== "granted") {
//         console.log("Failed to get push token for push notification!");
//         return;
//       }

//       const token = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId: "b7f5b17f-5fa3-4f5b-92da-b69f5c585ebc",
//         })
//       ).data;

//       console.log("Expo Push token:", token);
//       setExpoPushToken(token);

//       if (Platform.OS === "android") {
//         await Notifications.setNotificationChannelAsync("default", {
//           name: "default",
//           importance: Notifications.AndroidImportance.MAX,
//           vibrationPattern: [0, 250, 250, 250],
//           lightColor: "#FF231F7C",
//           sound: "notification.mp3",
//         });
//       }
//     } catch (error) {
//       console.error("Error getting push token:", error);
//     }
//   };

//   const showNotification = async ({
//     title,
//     body,
//     data = {},
//     imageUrl,
//     buttons,
//   }: {
//     title: string;
//     body: string;
//     data?: any;
//     imageUrl?: string;
//     buttons?: NotificationButton[];
//   }) => {
//     const notificationContent: any = {
//       title,
//       body,
//       data,
//       sound: "notification.mp3",
//     };

//     if (imageUrl) {
//       if (Platform.OS === "android") {
//         notificationContent.android = {
//           ...notificationContent.android,
//           largeIcon: imageUrl,
//           style: {
//             type: messaging.AndroidStyle.BIGPICTURE,
//             picture: imageUrl,
//           },
//         };
//       } else {
//         notificationContent.ios = {
//           ...notificationContent.ios,
//           attachments: [
//             {
//               url: imageUrl,
//               thumbnailClipArea: { x: 0, y: 0, width: 1, height: 1 },
//             },
//           ],
//         };
//       }
//     }

//     if (buttons?.length) {
//       if (Platform.OS === "ios") {
//         await Notifications.setNotificationCategoryAsync("actions", {
//           buttons: buttons.map((button) => ({
//             identifier: button.id,
//             buttonTitle: button.text,
//             options: {
//               opensAppToForeground: true,
//             },
//           })),
//         });
//         notificationContent.categoryIdentifier = "actions";
//       }
//     }

//     await Notifications.scheduleNotificationAsync({
//       content: notificationContent,
//       trigger: null,
//     });
//   };

//   const sendTestNotification = async ({
//     title = "Test Notification",
//     body = "This is a test notification",
//     url = "/home",
//     imageUrl,
//     buttons,
//   }: {
//     title?: string;
//     body?: string;
//     url?: string;
//     imageUrl?: string;
//     buttons?: NotificationButton[];
//   } = {}) => {
//     await showNotification({
//       title,
//       body,
//       data: { url },
//       imageUrl,
//       buttons,
//     });
//   };

//   return {
//     expoPushToken,
//     fcmToken,
//     notification,
//     sendTestNotification,
//   };
// };
