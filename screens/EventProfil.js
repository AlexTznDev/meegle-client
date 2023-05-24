import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsActiveNavigate,
  selectImageAppli,
  setEventListUserDB,
  SelecteventListUserDB,
  SelectPadelCourtUnknown,
  setIsActiveNavigate,
} from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const EventProfil = () => {
  const isActiveNavigate = useSelector(selectIsActiveNavigate);
  const selecteventListUserDB = useSelector(SelecteventListUserDB);
  const navigation = useNavigation();
  const ImageAppli = useSelector(selectImageAppli);
  const [iFetching, setiFetching] = useState(true);
  const { authToken, userDBMONGO } = useAuth(); //! context auth
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get("window").height; //! equivaut a un 100vh
  const windowWidth = Dimensions.get("window").width; //! equivaut a un 100vw
  const PadelCourtUnknown = useSelector(SelectPadelCourtUnknown);
  const [eventToRender, seteventToRender] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(setIsActiveNavigate("Profil"));
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const getDataFromDB = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/event/All");
      dispatch(setEventListUserDB(response.data));


      let filteredEvents = response.data.filter(
        (event) => event.owner._id === userDBMONGO._id
      );
      seteventToRender(filteredEvents)
      setiFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      testID="Container"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30,
        backgroundColor: "transparent",
      }}
    >
      <View
        testID="containerButtonEventProfil"
        style={{
          flexDirection: "row",
          gap: 10,
          position: "absolute",
          zIndex: 10,
          top: 10,
          backgroundColor: "transparent",
          width: windowWidth * 0.9,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "#52C234",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            width: "50%",
          }}
        >
          <Text>EVENT I GO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "50%",
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "#52C23450",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              opacity: 0.5,
            }}
          >
            EVENT CREATED
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {iFetching ? (
          <Text>is...fetching</Text>
        ) : (
          <View
            style={{
              marginTop: 60,
              width: windowWidth,
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
              data={eventToRender}
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

        {isActiveNavigate === "Profil" && (
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

export default EventProfil;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 10,
    gap: 10,
    paddingTop: 10,
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
