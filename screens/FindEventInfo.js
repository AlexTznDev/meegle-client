import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  selectIsActiveNavigate,
  selectImageAppli,
  SelectPadelCourtUnknown,
  setIsActiveNavigate,
} from "../slices/navSlice";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FindEventInfo = () => {
  const [allEvents, setallEvents] = useState(null);
  const [EventToRender, setEventToRender] = useState(null);
  const [isFetching, setisFetching] = useState(true);
  const isActiveNavigate = useSelector(selectIsActiveNavigate);
  const windowHeight = Dimensions.get("window").height; //! equivaut a un 100vh
  const windowWidth = Dimensions.get("window").width; //! equivaut a un 100vw
  const ImageAppli = useSelector(selectImageAppli);
  const PadelCourtUnknown = useSelector(SelectPadelCourtUnknown);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [active, setActive] = useState("this week"); // pour suivre l'état actif
  const position = useRef(new Animated.Value(0)).current; // pour animer le cercle

  const toggleActive = (nextState) => {
    setActive(nextState);

    Animated.timing(position, {
      toValue: nextState === "this week" ? 0 : 1, // déplacer le cercle
      duration: 300, // durée de l'animation
      useNativeDriver: true, // utiliser le pilote natif pour de meilleures performances
    }).start();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(setIsActiveNavigate("FindEvent"));
    });

    return () => {
      //demontage des composants
      unsubscribe();
    };
  }, [navigation]);

  const NameChoose = [
    { name: "Padel horta nord", note: 4.1 },
    { name: "Polideportivo carmen", note: 4.5 },
    { name: "Tù padel", note: 4.2 },
    { name: "7 padel", note: 4.7 },
    { name: "Poliesportiu Marxalenes", note: 4.6 },
  ];

  const playerNeeded = (num) => {
    if (num === 1) {
      return 3;
    }
    if (num === 2) {
      return 2;
    }
    if (num === 3) {
      return 1;
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const isThisWeek = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    // mettre les heures à 0 pour une comparaison correcte
    now.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    // Détermine le début et la fin de la semaine actuelle
    let startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Lundi

    let endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Dimanche

    if (date >= startOfWeek && date <= endOfWeek) {
      return "this week";
    } else {
      return "next week";
    }
  };

  useEffect(() => {
    getAllevents();
  }, []);

  const getAllevents = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/event/All");
      setallEvents(response.data);
      setEventToRender(response.data);
      setisFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const eventThisWeek = () => {
    if (!allEvents) {
      console.log("No events fetched yet");
      return;
    }

    const thisWeekEvents = allEvents.filter(
      (event) => isThisWeek(event.date) === "this week"
    );
    console.log(thisWeekEvents);
    setEventToRender(thisWeekEvents);
  };

  const eventNextWeek = () => {
    if (!allEvents) {
      console.log("No events fetched yet");
      return;
    }

    const nextWeekEvents = allEvents.filter(
      (event) => isThisWeek(event.date) === "next week"
    );
    console.log(nextWeekEvents);
    setEventToRender(nextWeekEvents);
  };

  const currentDate = getCurrentDate();

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            eventThisWeek();
            toggleActive("this week");
          }}
        >
          <Animated.Text
            style={{
              fontWeight: active === "this week" ? "bold" : "normal", // changer la fonte en fonction de l'état
              color: active === "this week" ? "#000000" : "#00000095",
            }}
          >
            This week
          </Animated.Text>
        </TouchableOpacity>
        <View
          style={{
            width: 60,
            marginLeft: 20,
            marginRight: 20,
            padding: 1,
            backgroundColor: "#00000090",
            borderRadius: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (active === "this week") {
                eventNextWeek();
                toggleActive("next week");
              } else {
                eventThisWeek();
                toggleActive("this week");
              }
            }}
          >
            <Animated.View
              style={{
                height: 30,
                width: 30,
                transform: [
                  {
                    translateX: position.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 27], // déplacer le cercle en fonction de la position
                    }),
                  },
                ],
              }}
            >
              <Image
                source={require("../assets/sport.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            eventNextWeek();
            toggleActive("next week");
          }}
        >
          <Animated.Text
            style={{
              fontWeight: active === "next week" ? "bold" : "normal", // changer la fonte en fonction de l'état
              color: active === "next week" ? "#000000" : "#00000095",
            }}
          >
            Next week
          </Animated.Text>
        </TouchableOpacity>
      </View>

      {/* <Text>FindEventInfo</Text>
      <Text>Current Date: {currentDate}</Text>
      <Text>{isThisWeek("2023-05-22")}</Text>
      <TouchableOpacity onPress={()=>{
        eventThisWeek()
      }}><Text>this week</Text></TouchableOpacity>
      <TouchableOpacity
      onPress={()=>{
        eventNextWeek()
      }}
      ><Text>next week</Text></TouchableOpacity> */}
      <ScrollView>
        {isFetching ? (
          <Text>is...fetching</Text>
        ) : (
          <View
            style={{
              // width: windowWidth,
              alignItems: "center",
            }}
          >
            <FlatList
              contentContainerStyle={{
                flexDirection: "column",
                width: windowWidth,
                alignItems: "center",
              }}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              data={EventToRender}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("EventInfo", {
                        _id: item._id,
                      });
                    }}
                    style={styles.containerCard}
                    key={item._id}
                  >
                    <View style={{ flexDirection: "row", width: "100%" }}>
                      <Image
                        style={{
                          width: "35%",
                          height: 160,
                          borderRadius: 5,
                        }}
                        source={
                          item.NumberImage !== -1
                            ? ImageAppli[item.NumberImage].name
                            : PadelCourtUnknown.name
                        }
                      />
                      <View
                        style={{
                          gap: 12,
                          alignItems: "flex-start",
                          width: "65%",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              paddingLeft: 5,
                              fontWeight: "600",
                            }}
                          >
                            {item.datePrecise}
                          </Text>

                          <Text
                            style={{
                              fontSize: 14,
                              paddingLeft: 5,
                              fontWeight: "600",
                            }}
                          >
                            {item.hour}
                          </Text>
                        </View>
                        {item.NumberImage !== -1 ? (
                          <Text
                            style={{
                              fontSize: 14,
                              paddingLeft: 5,
                              marginTop: -5,
                              fontWeight: "600",
                              color: "#00000060",
                            }}
                          >
                            {NameChoose[item.NumberImage].name}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              fontSize: 14,
                              paddingLeft: 5,
                              marginTop: -5,
                              fontWeight: "600",
                              color: "#00000060",
                            }}
                          >
                            Unknown Court
                          </Text>
                        )}
                        <Text style={{ fontSize: 12, paddingLeft: 5 }}>
                          {item.localisation.adress}
                        </Text>
                        <View
                          style={{
                            width: "100%",
                            height: 68,
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            gap: 5,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View style={styles.containerSmallCard}>
                            <MaterialIcons
                              name="supervised-user-circle"
                              size={24}
                              color="#040738"
                            />
                            <Text>{playerNeeded(item.numberPlayerNeed)}/4</Text>
                          </View>
                          <View style={styles.containerSmallCard}>
                            <Feather name="star" size={24} color="#040738" />
                          </View>
                          <View style={styles.containerSmallCard}></View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              horizontal={true}
            />
          </View>
        )}

        {isActiveNavigate === "FindEvent" && (
          <View
            testID="ajustView"
            style={{
              height: 60,
            }}
          ></View>
        )}
      </ScrollView>
    </View>
  );
};

export default FindEventInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
    backgroundColor: "transparent",
  },
  containerCard: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    width: "93%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  containerSmallCard: {
    width: "30%",
    height: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#FFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
});
