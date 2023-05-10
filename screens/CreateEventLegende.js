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
  Keyboard,
  SafeAreaView,
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
  setTimeEvent,
  setDateEvent,
} from "../slices/navSlice";


import { useNavigation } from "@react-navigation/native";
import MapEventLocalization from "./MapEventLocalization";

const CreateEventLegende = () => {
  const dispatch = useDispatch();
  const imageEvent = useSelector(selectImageEvent);
  const SelectImage = useSelector(selectImage);
  const ImageAppli = useSelector(selectImageAppli);
  const IsImageFromAppli = useSelector(selectIsImageFromAppli);
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height; //! equivaut a un 100vh

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setEventStep(0));
                  dispatch(setDateEvent(null));
                  dispatch(setTimeEvent(null));
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
                  fontSize: 20,
                  transform: [{ translateX: 10 }],
                }}
              >
                create your anounce
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MapEvent");
                }}
              >
                <Text
                  style={{
                    color: "#007BFF",
                    fontSize: 18,
                    transform: [{ translateX: 10 }],
                  }}
                >
                  next
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 10,
              }}
            >
              <Image
                source={ImageAppli[SelectImage].name}
                style={{ width: "95%", height: 300 }}
              />
            </View>

            <View style={styles.mainContent}>
              <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              >
                <View>
                  <Text style={{color:"#fff", fontSize:20}}>How many people you need?</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
              activeOpacity={0}
              style={styles.mapButton}
              onPress={()=>{
                navigation.navigate("Profil")
              }}
              >
                
                  <MapEventLocalization/>
                
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    alignItems:"center",
    gap:20,
    paddingTop:10
  },
  textInput: {
    paddingLeft: 20,
    paddingTop: 30,
    paddingRight: 30,
  },
  button:{
    backgroundColor:"#52C234",
    width:"90%",
    alignItems:"center",
    height:"15%",
    justifyContent:"center",
    borderRadius:10

  },
  mapButton:{
    backgroundColor:"#52C234",
    width:"90%",
    alignItems:"center",
    height:"30%",
    justifyContent:"center",
    borderRadius:10,
    overflow:"hidden"
  }
});
