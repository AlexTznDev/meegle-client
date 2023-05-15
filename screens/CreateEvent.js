import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

//REDUX
import { useDispatch, useSelector } from "react-redux";

import {
  setIsActiveNavigate,
  setIsImageFromAppli,
  setEventStep,
  setImageEvent,
  setSelectImage,
  selectImageAppli,
  SelectPadelCourtUnknown,
} from "../slices/navSlice.js";



const CreateEvent = () => {
  const ImageAppli = useSelector(selectImageAppli);
  const selectPadelCourtUnknown = useSelector(SelectPadelCourtUnknown);

  const navigation = useNavigation();
  const dispatch = useDispatch();



  return (
    <SafeAreaView style={{ backgroundColor: "#040738" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 10,
          paddingBottom: 20,
          paddingLeft: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfilMain", { shouldAnimate: true });
            dispatch(setIsActiveNavigate("Profil"));
            dispatch(setImageEvent(null));
            dispatch(setIsImageFromAppli(true));
            dispatch(setSelectImage(0));
          }}
        >
          <View
            style={{
              marginLeft: -10,
            }}
          >
            <AntDesign name="close" size={25} color="#FFF" />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            transform: [{ translateX: 100 }],
          }}
        >
          Padel court
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: "#007BFF",
              fontSize: 18,
              transform: [{ translateX: 10 }],
            }}
          ></Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View
          style={{
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(setEventStep(1));
              dispatch(setIsActiveNavigate("CreateMain2"));
              dispatch(setSelectImage(0));
              navigation.navigate("CreateEventLegende")
            }}
            style={styles.ContainerLocationCard}
          >
            <View style={styles.card}>
              <Image
                source={ImageAppli[0].name}
                style={{ width: "40%", height: "100%", borderRadius: 10 }}
              />

              <View
                style={{
                  flexShrink: 1,
                  width: "60%",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  Padel Horta Nord
                </Text>
                <Text
                  style={{
                    color: "#ffffff50",
                    fontSize: 15,
                    fontWeight: "500",
                    marginTop: 30,
                  }}
                >
                  Alboraya
                </Text>
                <View style={styles.containerNote}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 15,
                    }}
                  >
                    4.1
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("LocalizationCourtMain", {
                      origin: ImageAppli[0],
                    });
                  }}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Ionicons
                    name="ios-navigate-sharp"
                    size={15}
                    color="#007bff"
                  />
                  <Text style={{ color: "#007BFF" }}>Localisation</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(setEventStep(1));
              dispatch(setIsActiveNavigate("CreateMain2"));
              dispatch(setSelectImage(1));
              navigation.navigate("CreateEventLegende")
            }}
            style={styles.ContainerLocationCard}
          >
            <View style={styles.card}>
              <Image
                source={ImageAppli[1].name}
                style={{ width: "40%", height: "100%", borderRadius: 10 }}
              />
              <View
                style={{
                  flexShrink: 1,
                  width: "60%",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  Polideportivo Carmen
                </Text>
                <Text
                  style={{
                    color: "#ffffff50",
                    fontSize: 15,
                    fontWeight: "500",
                    marginTop: 30,
                  }}
                >
                  Betero
                </Text>
                <View style={styles.containerNote}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 15,
                    }}
                  >
                    4.5
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("LocalizationCourtMain", {
                      origin: ImageAppli[1],
                    });
                  }}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Ionicons
                    name="ios-navigate-sharp"
                    size={15}
                    color="#007bff"
                  />
                  <Text style={{ color: "#007BFF" }}>Localisation</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(setEventStep(1));
              dispatch(setIsActiveNavigate("CreateMain2"));
              dispatch(setSelectImage(2));
              navigation.navigate("CreateEventLegende")
            }}
            style={styles.ContainerLocationCard}
          >
            <View style={styles.card}>
              <Image
                source={ImageAppli[2].name}
                style={{ width: "40%", height: "100%", borderRadius: 10 }}
              />
              <View
                style={{
                  flexShrink: 1,
                  width: "60%",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  Tu Padel
                </Text>
                <Text
                  style={{
                    color: "#ffffff50",
                    fontSize: 15,
                    fontWeight: "500",
                    marginTop: 30,
                  }}
                >
                  Vara de quart
                </Text>
                <View style={styles.containerNote}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 15,
                    }}
                  >
                    4.2
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("LocalizationCourtMain", {
                      origin: ImageAppli[2],
                    });
                  }}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Ionicons
                    name="ios-navigate-sharp"
                    size={15}
                    color="#007bff"
                  />
                  <Text style={{ color: "#007BFF" }}>Localisation</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(setEventStep(1));
              dispatch(setIsActiveNavigate("CreateMain2"));
              dispatch(setSelectImage(3));
              navigation.navigate("CreateEventLegende")
            }}
            style={styles.ContainerLocationCard}
          >
            <View style={styles.card}>
              <Image
                source={ImageAppli[3].name}
                style={{ width: "40%", height: "100%", borderRadius: 10 }}
              />
              <View
                style={{
                  flexShrink: 1,
                  width: "60%",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  7 padel
                </Text>
                <Text
                  style={{
                    color: "#ffffff50",
                    fontSize: 15,
                    fontWeight: "500",
                    marginTop: 30,
                  }}
                >
                  Vara de quart
                </Text>
                <View style={styles.containerNote}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 15,
                    }}
                  >
                    4.7
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("LocalizationCourtMain", {
                      origin: ImageAppli[3],
                    });
                  }}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Ionicons
                    name="ios-navigate-sharp"
                    size={15}
                    color="#007bff"
                  />
                  <Text style={{ color: "#007BFF" }}>Localisation</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(setEventStep(1));
              dispatch(setIsActiveNavigate("CreateMain2"));
              dispatch(setSelectImage(4));
            }}
            style={styles.ContainerLocationCard}
          >
            <View style={styles.card}>
              <Image
                source={ImageAppli[4].name}
                style={{ width: "40%", height: "100%", borderRadius: 10 }}
              />
              <View
                style={{
                  flexShrink: 1,
                  width: "60%",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  Poliesportiu Marxalenes
                </Text>
                <Text
                  style={{
                    color: "#ffffff50",
                    fontSize: 15,
                    fontWeight: "500",
                    marginTop: 30,
                  }}
                >
                  Marxalenes
                </Text>
                <View style={styles.containerNote}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 15,
                    }}
                  >
                    4.6
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("LocalizationCourtMain", {
                      origin: ImageAppli[4],
                    });
                  }}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Ionicons
                    name="ios-navigate-sharp"
                    size={15}
                    color="#007bff"
                  />
                  <Text style={{ color: "#007BFF" }}>Localisation</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <Text style={{color:"#fff", marginBottom:-10}}>
              put anounce to Unknow court:
            </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MapEvent");
            }}
            style={{
              overflow: "hidden",
              width: "90%",
              height: 180,
              backgroundColor: "#00000040",
              borderRadius: 10,
            }}
          >

            <Image
              source={selectPadelCourtUnknown.name}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  ContainerLocationCard: {
    width: "90%",
    height: 180,
    backgroundColor: "#00000040",
    borderRadius: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#52C23480",
  },
  card: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
    gap: 10,
  },
  containerNote: {
    flexDirection: "row",
    width: "80%",
    gap: 10,
    alignItems: "center",
    marginTop: 20,
  },
});
