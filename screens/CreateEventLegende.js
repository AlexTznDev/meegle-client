import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setEventStep,
  setIsActiveNavigate,
  selectImageAppli,
  selectImage,
  selectImageEvent,
  selectIsImageFromAppli,
} from "../slices/navSlice";

const CreateEventLegende = () => {
  const dispatch = useDispatch();
  const imageEvent = useSelector(selectImageEvent);
  const SelectImage = useSelector(selectImage);
  const ImageAppli = useSelector(selectImageAppli);
  const IsImageFromAppli = useSelector(selectIsImageFromAppli);
  const [text, setText] = useState("");
  const windowHeight = Dimensions.get("window").height; //! equivaut a un 100vh
  




  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
    <TouchableWithoutFeedback
    onPress={Keyboard.dismiss}
    >
    <View
    style={{flex:1}}
    >
    <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setEventStep(0));
            dispatch(setIsActiveNavigate("CreateMain"));
          }}
        >
          <View
            style={{
              marginLeft: -10,
            }}
          >
            <AntDesign name="left" size={25} color="#222222" />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            color: "#222222",
            fontSize: 18,
            transform: [{ translateX: 24 }],
          }}
        >
          Creer évenement
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: "#007BFF",
              fontSize: 18,
              transform: [{ translateX: 10 }],
            }}
          >
            Suivant
          </Text>
        </TouchableOpacity>
      </View>
      <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingBottom:10
          }}
        >
          {IsImageFromAppli ? (
            <Image
              source={ImageAppli[SelectImage]}
              style={{ width: "80%", height: 300 }}
            />
          ) : (
            <Image
              source={{ uri: imageEvent }}
              style={{ width: "80%", height: 300 }}
            />
          )}
        </View>

      <View style={styles.mainContent}>
        <TextInput
          style={styles.textInput}
          onChangeText={setText}
          value={text}
          placeholder="Ajoutez une légende .."
          multiline={true}
        />


      </View>


    </View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};


export default CreateEventLegende;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 20,
  },
  mainContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  textInput: {
    paddingLeft: 20,
    paddingTop: 30,
    paddingRight: 30,
  }

});