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
import { createStackNavigator } from "@react-navigation/stack";

import * as Application from "expo-application";
import * as Linking from "expo-linking";

import {
  setIsBtnAmisAndDateOn,
  setIsActiveNavigate,
  SelectPadelCourtUnknown,
  selectImageAppli,
  SelecteventListUserDB,
} from "../slices/navSlice";

const EventInfo = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get("window").height; //! equivaut a un 100vh
  const windowWidth = Dimensions.get("window").width; //! equivaut a un 100vw
  const PadelCourtUnknown = useSelector(SelectPadelCourtUnknown);
  const eventListUserDB = useSelector(SelecteventListUserDB);
  const ImageAppli = useSelector(selectImageAppli);

  const [isFetching, setisFetching] = useState(true);

  const [dataEventToRender, setdataEventToRender] = useState(null);

  //! recuperer les data de navigation
  const route = useRoute();
  const _id = route.params._id;

  const findEventById = (eventId, eventsArray) => {
    return eventsArray.find((event) => event._id === eventId);
  };

  useEffect(() => {
    const eventId = _id;
    const eventsArray = eventListUserDB;

    const foundEvent = findEventById(eventId, eventsArray);

    setdataEventToRender(foundEvent);
    setisFetching(false);
  }, [route]);

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

  if (isFetching) {
    return (
      <View>
        <Text>... is fetching</Text>
      </View>
    );
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
        {dataEventToRender?.NumberImage !== -1 ? (
          <View
            style={{
              height: "100%",
              alignItems: "center",
            }}
          >
            <Image
              source={ImageAppli[dataEventToRender?.NumberImage].name}
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
      <View
        style={{
          width: windowWidth * 1,
          height: 25,
          flexDirection: "row",
          justifyContent: "center",
          gap: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EventInfoDataRender");
          }}
        >
          <Text>info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EventInfoDiscusion");
          }}
        >
          <Text>Discusions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
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
