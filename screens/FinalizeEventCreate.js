import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import MapEventLocalization from "./MapEventLocalization";
import axios from "axios";

import * as Application from "expo-application";
import * as Linking from "expo-linking";

import {
  setIsBtnAmisAndDateOn,
  setIsActiveNavigate,
  SelectPadelCourtUnknown,
  selectImage,
  selectImageAppli,
  selectTimeEvent,
  selectDateEvent,
  SelectListFriendAdded,
} from "../slices/navSlice";

const FinalizeEventCreate = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get("window").height; //! equivaut a un 100vh
  const windowWidth = Dimensions.get("window").width; //! equivaut a un 100vw

  const PadelCourtUnknown = useSelector(SelectPadelCourtUnknown);
  const SelectImage = useSelector(selectImage);
  const ImageAppli = useSelector(selectImageAppli);
  const SelectTimeEvent = useSelector(selectTimeEvent);
  const SelectDateEvent = useSelector(selectDateEvent);
  const selectListFriendAdded = useSelector(SelectListFriendAdded);
  const [DayData, setDayData] = useState(null);
  const { userDBMONGO, authToken } = useAuth(); //! context auth
  const [LinkLatLng, setLinkLatLng] = useState(null);
  const [numberSendToBack, setnumberSendToBack] = useState(null);

  function formatDate(dateString) {
    const days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
    const months = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];
    const date = new Date(dateString);

    const dayIndex = date.getDay();
    const dayOfWeek = days[dayIndex];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const year = date.getFullYear();

    return `${dayOfWeek} ${day} ${month} ${year}`;
  }

  useEffect(() => {
    const dayOfWeek = formatDate(SelectDateEvent);
    setDayData(dayOfWeek);
  }, [SelectDateEvent]);

  useEffect(() => {
    if (PadelCourtUnknown.location.lat === null) {
      setLinkLatLng(ImageAppli[SelectImage].origin);
    } else {
      setLinkLatLng(PadelCourtUnknown);
    }
  }, []);

  useEffect(() => {
    if (PadelCourtUnknown.location.lat === null) {
      setnumberSendToBack(SelectImage);
    } else {
      setnumberSendToBack(-1);
    }
  }, []);

  //! recuperer les data de navigation
  const route = useRoute();
  const numberPlayer = route.params.numberPlayer;

  const NameChoose = [
    { name: "Padel horta nord", note: 4.1 },
    { name: "Polideportivo carmen", note: 4.5 },
    { name: "Tù padel", note: 4.2 },
    { name: "7 padel", note: 4.7 },
    { name: "Poliesportiu Marxalenes", note: 4.6 },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(setIsBtnAmisAndDateOn(true));
    });
    const subscribe = navigation.addListener("blur", () => {
      dispatch(setIsActiveNavigate("CreateMain2"));
      setTimeout(() => {
        dispatch(setIsBtnAmisAndDateOn(false));
      }, 50);
    });

    return () => {
      //demontage des composants
      unsubscribe();
      subscribe();
    };
  }, [navigation]);

  const openMaps = async (address, lat, lng) => {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps?q=${encodedAddress}`;
    const appleMapsUrl = `http://maps.apple.com/?address=${encodedAddress}`;

    // Si vous n'avez pas d'adresse, utilisez la latitude et la longitude
    const googleMapsUrlFallback = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    const appleMapsUrlFallback = `http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;

    const isGoogleMapsInstalled = await Linking.canOpenURL(googleMapsUrl);
    const urlToOpen = isGoogleMapsInstalled
      ? googleMapsUrl
      : Application.applicationId === "ios"
      ? appleMapsUrl
      : `geo:${lat},${lng}?q=${lat},${lng}`;

    // Utilisez les URL de repli si vous n'avez pas d'adresse
    if (!address) {
      urlToOpen = isGoogleMapsInstalled
        ? googleMapsUrlFallback
        : Application.applicationId === "ios"
        ? appleMapsUrlFallback
        : `geo:${lat},${lng}?q=${lat},${lng}`;
    }

    Alert.alert(
      "Open Directions",
      "Would you like to open the mapping application to display the route?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Open",
          onPress: () => Linking.openURL(urlToOpen),
        },
      ],
      { cancelable: true }
    );
  };

  const handleSubmitEvent = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const data = {
      date: SelectDateEvent,
      hour: SelectTimeEvent,
      localisation: {
        location: {
          lat: LinkLatLng.location.lat,
          lng: LinkLatLng.location.lat,
        },
        adress: LinkLatLng.adress,
      },
      NumberImage: numberSendToBack,
      numberPlayerNeed: numberPlayer,
      datePrecise: DayData
    };

    try {
      await axios.post("http://localhost:5005/api/event", data, config);

      navigation.navigate("ProfilMain");
      dispatch(setIsActiveNavigate("Profil"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: windowWidth,
          height: windowHeight * 0.35,
          overflow: "hidden",
        }}
      >
        {PadelCourtUnknown.location.lat === null ? (
          <View
            style={{
              height: "100%",
              alignItems: "center",
            }}
          >
            <Image
              source={ImageAppli[SelectImage].name}
              style={{
                width: windowWidth,
                height: windowHeight * 0.4,
                resizeMode: "cover",
              }}
            />
          </View>
        ) : (
          <Image
            source={PadelCourtUnknown.name}
            style={{
              width: windowWidth,
              height: windowHeight * 0.4,
              resizeMode: "cover",
            }}
          />
        )}
      </View>
      <ScrollView>
        {PadelCourtUnknown.location.lat === null ? (
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
                fontSize: 17,
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
        ) : null}

        <View style={{ width: windowWidth, paddingLeft: 0, marginTop: 15 }}>
          <Text
            style={{
              paddingTop: 10,
              fontSize: 15,
              paddingLeft: 10,
              paddingBottom: 10,
              fontWeight: "600",
            }}
          >
            Information match announcement
          </Text>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={[styles.shadowBox, { width: 90, height: 90 }]}>
                <MaterialIcons
                  name="supervised-user-circle"
                  size={26}
                  color="#52C234"
                />
                <Text style={{ fontSize: 10, marginTop: 5 }}>Looking for:</Text>
                <Text style={{}}>
                  {numberPlayer} player{numberPlayer > 1 ? "s" : ""}
                </Text>
              </View>

              <View style={[styles.shadowBox, { width: 90, height: 90 }]}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 30,
                  }}
                  source={{ uri: userDBMONGO.imageProfile }}
                />
                <Text style={{ fontSize: 10, marginTop: 5, fontWeight: "600" }}>
                  Create by:
                </Text>
                <Text style={{ fontSize: 10, color: "blue", marginTop: 2 }}>
                  {userDBMONGO.username}
                </Text>
              </View>
              <View
                style={[styles.shadowBox, { width: "35%", height: 90 }]}
              ></View>
            </View>

            <View style={{ flexDirection: "row", gap: 15 }}>
              <View
                style={[
                  styles.shadowBox,
                  { width: "42%", height: 60, flexDirection: "row" },
                ]}
              >
                <View style={{ width: "30%", paddingLeft: 10 }}>
                  <Ionicons name="calendar-outline" size={26} color="#52C234" />
                </View>
                <View
                  style={{
                    width: "70%",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: 10,
                  }}
                >
                  <Text style={{ textAlign: "center" }}>{DayData}</Text>
                </View>
              </View>

              <View
                style={[
                  styles.shadowBox,
                  { width: "42%", height: 60, flexDirection: "row" },
                ]}
              >
                <View style={{ width: "30%", paddingLeft: 10 }}>
                  <Ionicons name="time-outline" size={26} color="#52C234" />
                </View>
                <View
                  style={{
                    width: "70%",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: 10,
                  }}
                >
                  <Text>{SelectTimeEvent}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ width: windowWidth, paddingTop: 30 }}>
          <Text
            style={{
              paddingTop: 10,
              fontSize: 15,
              paddingLeft: 10,
              paddingBottom: 10,
              fontWeight: "600",
            }}
          >
            Go to the field
          </Text>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                openMaps(
                  LinkLatLng.adress,
                  LinkLatLng.location.lat,
                  LinkLatLng.location.lng
                )
              }
              style={[styles.shadowBox, { width: "90%", height: 90, gap: 10 }]}
            >
              <MaterialCommunityIcons
                name="google-maps"
                size={26}
                color="#52C234"
              />
              <Text style={{ textAlign: "center" }}>{LinkLatLng?.adress}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingBottom: 130, marginTop: 30 }}>
          <Text
            style={{
              paddingTop: 10,
              fontSize: 15,
              paddingLeft: 10,
              paddingBottom: 10,
              fontWeight: "600",
            }}
          >
            court localization
          </Text>
          <View style={{ width: windowWidth, alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0}
              style={[styles.mapButton, { marginBottom: 120 }]}
            >
              <MapEventLocalization />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          backgroundColor: "#ffffff",
          borderTopWidth: 0.5,
          height: 110,
          paddingBottom: 10,
          width: windowWidth,
          position: "absolute",
          bottom: 0,
          borderColor: "#00000030",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: windowWidth * 0.9,
            height: "50%",
            backgroundColor: "#52C234",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            handleSubmitEvent();
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FinalizeEventCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerNote: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  shadowBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  mapButton: {
    backgroundColor: "#fff",
    width: "95%",
    alignItems: "center",
    height: "40%",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
});
