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
  setTimeEvent,
  setDateEvent,
  SelectPadelCourtUnknown,
  resetPadelCourtUnknown,
  resetOrigin,
} from "../slices/navSlice";

import { useNavigation } from "@react-navigation/native";
import MapEventLocalization from "./MapEventLocalization";

const CreateEventLegende = () => {
  const dispatch = useDispatch();
  const SelectImage = useSelector(selectImage);
  const ImageAppli = useSelector(selectImageAppli);
  const navigation = useNavigation();
  const PadelCourtUnknown = useSelector(SelectPadelCourtUnknown);
  const windowHeight = Dimensions.get("window").height; //! equivaut a un 100vh
  const windowWidth = Dimensions.get("window").width; //! equivaut a un 100vw
  const [selectedPlayers, setSelectedPlayers] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const NameChoose = [
    { name: "Padel horta nord", note: 4.1 },
    { name: "Polideportivo carmen", note: 4.5 },
    { name: "Tù padel", note: 4.2 },
    { name: "7 padel", note: 4.7 },
    { name: "Poliesportiu Marxalenes", note: 4.6 },
  ];

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
                  navigation.navigate("CreateEvent");
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
                  dispatch(setIsActiveNavigate("CreateMain"));
                  navigation.navigate("FinalizeEventCreate", {
                    numberPlayer: selectedPlayers,
                  });
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
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={ImageAppli[SelectImage].name}
                    style={{ width: "95%", height: 200 }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: windowWidth,
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        paddingTop: 10,
                        fontSize: 15,
                        paddingBottom: 10,
                        fontWeight: "600",
                      }}
                    >
                      {NameChoose[SelectImage].name}
                    </Text>
                    <View style={styles.containerNote}>
                      <Text
                        style={{
                          color: "#00000090",
                          fontSize: 15,
                          fontWeight: "500",
                        }}
                      >
                        {NameChoose[SelectImage].note}
                      </Text>
                      <View style={{ flexDirection: "row", gap: 3 }}>
                        <Image
                          source={require("../assets/noteLogo.png")}
                          style={{ width: 15, height: 15 }}
                        />
                        <Image
                          source={require("../assets/noteLogo.png")}
                          style={{ width: 15, height: 15 }}
                        />
                        <Image
                          source={require("../assets/noteLogo.png")}
                          style={{ width: 15, height: 15 }}
                        />
                        <Image
                          source={require("../assets/noteLogo.png")}
                          style={{ width: 15, height: 15 }}
                        />
                      </View>
                    </View>
                  </View>
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
                activeOpacity={0}
                style={[styles.mapButton, { marginTop: -12 , backgroundColor:"#fff"}]}
                onPress={() => {
                  navigation.navigate("Profil");
                }}
              >
              <Text style={{paddingTop:15, paddingBottom:2, fontWeight:"600"}} >Court localisation</Text>
                <MapEventLocalization />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { marginTop: 20 }]}
                activeOpacity={0.5}
                onPress={() => setModalVisible(true)}
              >
                <View>
                  {selectedPlayers ? (
                    <Text
                      style={{ color: "#fff", fontSize: 25, fontWeight: "400" }}
                    >
                      {selectedPlayers} player
                      {selectedPlayers > 1 ? "s" : ""}
                    </Text>
                  ) : (
                    <Text style={{ color: "#fff", fontSize: 20 }}>
                      How many player you need?
                    </Text>
                  )}
                </View>
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
    width: "95%",
    alignItems: "center",
    height: "15%",
    justifyContent: "center",
    borderRadius: 10,
  },
  mapButton: {
    backgroundColor: "#fff",
    width: "95%",
    alignItems: "center",
    height: "35%",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#040738",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 50,
  },
  optionText: {
    fontSize: 18,
    marginVertical: 15,
    color: "#fff",
  },
  containerNote: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
