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
import MapEventInfo from "./MapEventInfo";
import axios from "axios";

import * as Application from "expo-application";
import * as Linking from "expo-linking";

import {
  setIsBtnAmisAndDateOn,
  setIsActiveNavigate,
  SelectPadelCourtUnknown,
  selectImage,
  selectImageAppli,
  selectDateEvent,
  SelecteventListUserDB
} from "../slices/navSlice";

const EventInfo = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get("window").height; //! equivaut a un 100vh
  const windowWidth = Dimensions.get("window").width; //! equivaut a un 100vw
  const PadelCourtUnknown = useSelector(SelectPadelCourtUnknown);
  const eventListUserDB = useSelector(SelecteventListUserDB);
  const ImageAppli = useSelector(selectImageAppli);
  const { userDBMONGO } = useAuth(); //! context auth
  const [LinkLatLng, setLinkLatLng] = useState(null);
  const [isFetching, setisFetching] = useState(true);

const [dataEventToRender, setdataEventToRender] = useState(null);



  //! recuperer les data de navigation
  const route = useRoute();
  const _id = route.params._id;

  const findEventById = (eventId, eventsArray) => {
    return eventsArray.find(event => event._id === eventId);
  };
  

  useEffect(() => {
    const eventId = _id; 
    const eventsArray = eventListUserDB;
  
    const foundEvent = findEventById(eventId, eventsArray);
    setdataEventToRender(foundEvent);
    setisFetching(false)
  }, [route]); 
  


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



if(isFetching){
  return <View><Text>... is fetching</Text></View>
}


  return (
    <View style={styles.container}>
      <View
        style={{
          width: windowWidth,
          height: windowHeight * 0.35,
          overflow: "hidden",
        }}
      >
        {dataEventToRender.NumberImage !== -1 ? (
          <View
            style={{
              height: "100%",
              alignItems: "center",
            }}
          >
            <Image
              source={ImageAppli[dataEventToRender.NumberImage].name}
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
        {dataEventToRender.NumberImage !== -1 ? (
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
              {NameChoose[dataEventToRender.NumberImage].name}
            </Text>
            <View style={styles.containerNote}>
              <Text
                style={{
                  color: "#00000090",
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                {NameChoose[dataEventToRender.NumberImage].note}
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
            Information match organisation
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
                  {dataEventToRender.numberPlayerNeed} player{dataEventToRender.numberPlayerNeed > 1 ? "s" : ""}
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
                  <Text style={{ textAlign: "center" }}>{dataEventToRender.datePrecise}</Text>
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
                  <Text>{dataEventToRender.hour}</Text>
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
              <Text style={{ textAlign: "center" }}>{dataEventToRender?.localisation?.adress}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingBottom: 110, marginTop: 30 }}>
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
              <MapEventInfo dataEventToRender={dataEventToRender} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </View>
  );
};

export default EventInfo;

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
    width: "90%",
    alignItems: "center",
    height: "40%",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
});
