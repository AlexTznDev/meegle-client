import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsActiveNavigate } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

import { serverTimestamp } from "firebase/firestore";
import useAuth from "../hooks/useAuth";

const EventInfoDiscusion = ({ eventData }) => {
  const windowHeight = Dimensions.get("window").height; //! equivaut a un 100vh
  const windowWidth = Dimensions.get("window").width; //! equivaut a un 100vw
  const [input, setinput] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [keybordOpen, setkeybordOpen] = useState(false);
  const { userDBMONGO } = useAuth(); //! context auth
  const [messages, setMessages] = useState([]);
  const scrollViewRef = React.useRef();

  //  useEffect(() => {
  //     const unsubscribe = navigation.addListener("focus", () => {
  //       dispatch(setIsActiveNavigate("CreateMain"));
  //     });

  //     return () => {
  //       //demontage des composants
  //       unsubscribe();
  //     };
  //   }, [navigation]);

  useEffect(() => {
    const keyboardWillShowListener =
      Platform.OS === "ios"
        ? Keyboard.addListener("keyboardWillShow", _keyboardWillShow)
        : null;
    const keyboardWillHideListener =
      Platform.OS === "ios"
        ? Keyboard.addListener("keyboardWillHide", _keyboardWillHide)
        : null;

    // nettoyage de la fonction
    return () => {
      keyboardWillShowListener?.remove();
      keyboardWillHideListener?.remove();
    };
  }, [keybordOpen]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const _keyboardWillShow = () => {
    setkeybordOpen(true);
    // console.log('Keyboard will show');
  };

  const _keyboardWillHide = () => {
    setkeybordOpen(false);
    // console.log('Keyboard will hide');
  };

  const sendMessage = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "chats"));

      querySnapshot.forEach(async (doc) => {
        const eventsSnapshot = await getDocs(
          collection(db, "chats", doc.id, "events")
        );

        eventsSnapshot.forEach(async (eventDoc) => {
          if (eventDoc.data().idEvents === eventData._id) {
            const messageRef = collection(
              db,
              "chats",
              doc.id,
              "events",
              eventDoc.id,
              "messages"
            );

            await addDoc(messageRef, {
              message: input,
              timestamp: serverTimestamp(),
              // displayName: ...,
              email: userDBMONGO.email,
              photoUrl: userDBMONGO.imageProfile,
            });
            // Move setinput here
            setinput("");
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }
        });
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du message: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = loadMessages();
    scrollViewRef.current?.scrollToEnd({ animated: true });
    return unsubscribe;
  }, []);

  const loadMessages = () => {
    setinput("");
    const chatCollection = collection(db, "chats");
    const unsubscribeChats = onSnapshot(chatCollection, (chatsSnapshot) => {
      chatsSnapshot.forEach((chatDoc) => {
        const eventCollection = collection(db, "chats", chatDoc.id, "events");
        onSnapshot(eventCollection, (eventsSnapshot) => {
          eventsSnapshot.forEach((eventDoc) => {
            if (eventDoc.data().idEvents === eventData._id) {
              const messageCollection = collection(
                db,
                "chats",
                chatDoc.id,
                "events",
                eventDoc.id,
                "messages"
              );

              // Tri des messages par timestamp (du plus récent au plus ancien)
              const messageQuery = query(
                messageCollection,
                orderBy("timestamp", "asc")
              );

              onSnapshot(messageQuery, (messageSnapshot) => {
                const newMessages = [];
                messageSnapshot.forEach((messageDoc) => {
                  newMessages.push(messageDoc.data());
                });

                setMessages(newMessages);

                scrollViewRef.current?.scrollToEnd({ animated: true });
              });
            }
          });
        });
      });
    });

    // Retourne une fonction de nettoyage pour se désabonner des mises à jour lorsque le composant est démonté.
    return unsubscribeChats;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={windowHeight * 0.4}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView ref={scrollViewRef} style={styles.containerAllMessage}>
            {messages.map((message, index) =>
              message.email === userDBMONGO.email ? (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    flex: 1,
                    alignItems: "flex-end",
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: "#52C23420",
                      borderRadius: 10,
                      marginTop: 10,
                      maxWidth: "70%",
                    }}
                  >
                    <Text>{message.message}</Text>
                  </View>
                  <View
                    style={{
                      width: 27,
                      height: 27,
                      backgroundColor: "green",
                      marginLeft: 10,
                      borderRadius: 30,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      source={{ uri: message.photoUrl }}
                    />
                  </View>
                </View>
              ) : (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    flex: 1,
                    alignItems: "flex-end",
                    gap: 10,
                    marginLeft: -10,
                  }}
                >
                  <View
                    style={{
                      width: 27,
                      height: 27,
                      marginLeft: 10,
                      borderRadius: 30,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      source={{ uri: message.photoUrl }}
                    />
                  </View>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: "#52C23420",
                      borderRadius: 10,
                      marginTop: 10,
                      maxWidth: "70%",
                    }}
                  >
                    <Text>{message.message}</Text>
                  </View>
                </View>
              )
            )}
            <View style={{ height: 30 }}></View>
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
              paddingRight: 10,
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
              paddingBottom: keybordOpen === false ? 100 : 10,
              paddingTop: 10,
            }}
          >
            <TextInput
              value={input}
              onChangeText={(text) => setinput(text)}
              placeholder="Your message..."
              onSubmitEditing={sendMessage}
              style={styles.textInput}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
              <Feather name="send" size={20} color="#52C234" />
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EventInfoDiscusion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
  },
  textInput: {
    backgroundColor: "#00000010",
    padding: 10,
    borderRadius: 20,
    width: "90%",
  },
  containerMessage: {},
  containerAllMessage: {
    paddingTop: 10,
  },
});
