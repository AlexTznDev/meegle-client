import React, { useState, useEffect } from "react";
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
  Modal,
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
  SelectPadelCourtUnknown,
  resetPadelCourtUnknown,
  resetOrigin
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
  const PadelCourtUnknown = useSelector(SelectPadelCourtUnknown);
  const windowHeight = Dimensions.get("window").height; //! equivaut a un 100vh
  const [selectedPlayers, setSelectedPlayers] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);


  const NameChoose =[  
     "Padel horta nord",
     "Polideportivo Virgen del carmen",
     "Tù padel",
     "7 padel",
     "Poliesportiu MARXALENES-SAIDIA",
    ]

  

  const handlePlayerSelection = (numPlayers) => {
    setSelectedPlayers(numPlayers);
    setModalVisible(false);
  };

  const renderModalContent = () => {
    return (
      <View style={styles.modalContent}>
        {[1, 2, 3].map((numPlayers) => (
          <TouchableOpacity
            key={numPlayers}
            onPress={() => handlePlayerSelection(numPlayers)}
          >
            <Text style={styles.optionText}>
              {numPlayers} player{numPlayers > 1 ? "s" : ""}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

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
                  dispatch(resetPadelCourtUnknown());
                  dispatch(resetOrigin());
                  navigation.navigate("CreateEvent")
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
                  dispatch(setIsActiveNavigate("CreateMain"))
                  navigation.navigate("FinalizeEventCreate");
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
              {PadelCourtUnknown.location.lat === null ? (
                <View
                style={{
                  width:"100%",
                  alignItems:"center"
                }}
                >
                <Image
                  source={ImageAppli[SelectImage].name}
                  style={{ width: "95%", height: 200 }}
                />
                <Text
                style={{paddingTop:10, fontSize:15,paddingBottom:10, fontWeight:"600"}}
                >{NameChoose[SelectImage]}</Text>
                </View>

              ) : (
                <Image
                  source={PadelCourtUnknown.name}
                  style={{ width: "95%", height: 200 }}
                />
              )}
            </View>

            <View style={styles.mainContent}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.modalContainer}>
                  {renderModalContent()}
                </View>
              </Modal>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => setModalVisible(true)}
              >
                <View>
                  {selectedPlayers ? (
                    <Text style={{ color: "#fff", fontSize: 25, fontWeight:"400" }}>
                      {selectedPlayers} player
                      {selectedPlayers > 1 ? "s" : ""}
                    </Text>
                  ) : (
                    <Text style={{ color: "#fff", fontSize: 20 }}>
                      How many people you need?
                    </Text>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0}
                style={styles.mapButton}
                onPress={() => {
                  navigation.navigate("Profil");
                }}
              >
                <MapEventLocalization />
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
    alignItems: "center",
    gap: 20,
    paddingTop: 10,
  },
  textInput: {
    paddingLeft: 20,
    paddingTop: 30,
    paddingRight: 30,
  },
  button: {
    backgroundColor: "#52C234",
    width: "90%",
    alignItems: "center",
    height: "15%",
    justifyContent: "center",
    borderRadius: 10,
  },
  mapButton: {
    backgroundColor: "#52C234",
    width: "90%",
    alignItems: "center",
    height: "30%",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#222222",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom:50
  },
  optionText: {
    fontSize: 18,
    marginVertical: 15,
    color: "#fff",
  },
});
