// // components/NotificationAdminPanel.tsx
// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   Button,
//   Image,
//   ScrollView,
//   StyleSheet,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import * as ImagePicker from "expo-image-picker";
// import { usePushNotification } from "../../hooks/usePushNotification";

// export const NotificationAdminPanel = () => {
//   const { sendNotification } = usePushNotification();
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [sound, setSound] = useState("default");
//   const [imageUrl, setImageUrl] = useState("");
//   const [deepLink, setDeepLink] = useState("");
//   const [scheduledTime, setScheduledTime] = useState(new Date());
//   const [buttons, setButtons] = useState([{ text: "", action: "" }]);

//   const handleSend = async () => {
//     try {
//       await sendNotification({
//         title,
//         body,
//         sound,
//         imageUrl,
//         deepLink,
//         buttons: buttons.filter((b) => b.text && b.action),
//         scheduledTime,
//       });

//       // Reset form
//       setTitle("");
//       setBody("");
//       setSound("default");
//       setImageUrl("");
//       setDeepLink("");
//       setButtons([{ text: "", action: "" }]);
//     } catch (error) {
//       console.error("Error sending notification:", error);
//     }
//   };

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [16, 9],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImageUrl(result.assets[0].uri);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Notification Title"
//         value={title}
//         onChangeText={setTitle}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Notification Body"
//         value={body}
//         onChangeText={setBody}
//         multiline
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Sound (default, custom.wav)"
//         value={sound}
//         onChangeText={setSound}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Deep Link URL"
//         value={deepLink}
//         onChangeText={setDeepLink}
//       />

//       <Button title="Pick Image" onPress={pickImage} />
//       {imageUrl && <Image source={{ uri: imageUrl }} style={styles.preview} />}

//       <DateTimePicker
//         value={scheduledTime}
//         mode="datetime"
//         onChange={(event, date) => date && setScheduledTime(date)}
//       />

//       {buttons.map((button, index) => (
//         <View key={index} style={styles.buttonRow}>
//           <TextInput
//             style={styles.buttonInput}
//             placeholder="Button Text"
//             value={button.text}
//             onChangeText={(text) => {
//               const newButtons = [...buttons];
//               newButtons[index].text = text;
//               setButtons(newButtons);
//             }}
//           />
//           <TextInput
//             style={styles.buttonInput}
//             placeholder="Action"
//             value={button.action}
//             onChangeText={(action) => {
//               const newButtons = [...buttons];
//               newButtons[index].action = action;
//               setButtons(newButtons);
//             }}
//           />
//         </View>
//       ))}

//       <Button
//         title="Add Button"
//         onPress={() => setButtons([...buttons, { text: "", action: "" }])}
//       />

//       <Button title="Send Notification" onPress={handleSend} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 5,
//   },
//   preview: {
//     width: "100%",
//     height: 200,
//     marginVertical: 10,
//     resizeMode: "cover",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     marginVertical: 5,
//   },
//   buttonInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginHorizontal: 5,
//     borderRadius: 5,
//   },
// });
// export default NotificationAdminPanel;
