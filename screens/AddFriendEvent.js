import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import {
  setIsBtnAmisAndDateOn,
  addFriend,
  removeFriend,
  SelectListFriendAdded,
} from "../slices/navSlice";
import { useDispatch, useSelector } from "react-redux";

const AddFriendEvent = () => {
  const addedFriendList = useSelector(SelectListFriendAdded);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [searchUser, setSearchUser] = useState("");
  const [userToDisplay, setUserToDisplay] = useState([]);

  const handleSearchChange = (text) => {
    if (text !== "") {
      setSearchUser(text);
    } else {
      setSearchUser(text);
      setUserToDisplay([]);
    }
  };
  const searchingUser = () => {
    if (searchUser === "") {
      setUserToDisplay([]);
    } else {
      const foundUser = friend.filter((eachUser) => {
        const userToSearch = searchUser.toLowerCase();
        const eachUsername = eachUser.name.toLowerCase();

        if (eachUsername.includes(userToSearch)) {
          return true;
        } else {
          return false;
        }
      });
      setUserToDisplay(foundUser);
    }
  };

  useEffect(() => {
    searchingUser();
  }, [searchUser]);

  const friend = [
    {
      _id: "643057d24f7cc1cc638935cd",
      name: "angela electra",
      imageProfil: "girlAngela",
    },
    {
      _id: "643057d24f7cc1cc638935ce",
      name: "Alex new",
      imageProfil: "boy",
    },
    {
      _id: "643057d24f7cc1cc638935cf",
      name: "Aurelie laurga",
      imageProfil: "Girl2",
    },
    {
      _id: "643057d24f7cc1cc638935cg",
      name: "Angela electra",
      imageProfil: "girlAngela",
    },
    {
      _id: "643057d24f7cc1cc638935ch",
      name: "Alex new",
      imageProfil: "boy",
    },
    {
      _id: "643057d24f7cc1cc638935ci",
      name: "Aurelie laurga",
      imageProfil: "Girl2",
    },
    {
      _id: "643057d24f7cc1cc638935cj",
      name: "Angela electra",
      imageProfil: "girlAngela",
    },
    {
      _id: "643057d24f7cc1cc638935ck",
      name: "Alex new",
      imageProfil: "boy",
    },
    {
      _id: "643057d24f7cc1cc638935cl",
      name: "Aurelie laurga",
      imageProfil: "Girl2",
    },
    {
      _id: "643057d24f7cc1cc638935cm",
      name: "Angela electra",
      imageProfil: "girlAngela",
    },
    {
      _id: "643057d24f7cc1cc638935cn",
      name: "Alex new",
      imageProfil: "boy",
    },
    {
      _id: "643057d24f7cc1cc638935co",
      name: "Aurelie laurga",
      imageProfil: "Girl2",
    },
  ];

  //! sera a enlever avec le uri plus tard
  const imagePaths = {
    girlAngela: require("../assets/girlAngela.png"),
    boy: require("../assets/boy.png"),
    Girl2: require("../assets/Girl2.png"),
  };

  const toggleFriend = (user) => {
    // Check if the friend is in the list
    const friendInList = addedFriendList.some(
      (eachUser) => eachUser._id === user._id
    );

    if (!friendInList) {
      // If the friend is not in the list, add them
      dispatch(addFriend(user));
    } else {
      // If the friend is in the list and should be removed
      dispatch(removeFriend(user));
    }
  };

  useEffect(() => {
    console.log(userToDisplay.length);
  }, [userToDisplay]);

  const checkBoxImage = (id) => {
    if (addedFriendList.some((friend) => friend._id === id)) {
      return require("../assets/validate.png");
    } else {
      return require("../assets/checkBox.png");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(setIsBtnAmisAndDateOn(true));
      //   console.log("Le composant est maintenant focalisé");
    });
    const subscribe = navigation.addListener("blur", () => {
      dispatch(setIsBtnAmisAndDateOn(false));
      //   console.log("Le composant est maintenant defocalisé");
    });

    return () => {
      // Nettoyez le listener lorsque le composant est démonté
      unsubscribe();
      subscribe();
    };
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <TouchableOpacity
        style={[
          styles.btn,
          {
            position: "absolute",
            bottom: "15%",
            alignSelf: "center", //! centrer un element
            zIndex: 1,
          },
        ]}
        onPress={() => {
          console.log("amis ajouté");
          navigation.navigate("CreateEventLegende");
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>Ajouter amis</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CreateEventLegende");
        }}
      >
        <Text
          style={{
            color: "#007BFF",
            fontSize: 16,
            transform: [{ translateY: -10 }],
            marginLeft: 15,
            width: "18%",
          }}
        >
          Annuler
        </Text>
      </TouchableOpacity>

      <View style={styles.containerTextInput}>
        <TextInput
          style={{
            backgroundColor: "#F5F5F5",
            width: "90%",
            padding: 10,
            borderRadius: 5,
          }}
          placeholder=" Rechercher"
          onChangeText={handleSearchChange}
        />
      </View>

      {addedFriendList.length !== 0 ? (
        <FlatList
          contentContainerStyle={{
            paddingTop: 10,
            gap: 12,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={addedFriendList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  toggleFriend(item);
                }}
                style={{
                  flexDirection: "column",
                  marginTop: 20,
                  alignItems: "center",
                  gap: 10,
                  width: 50,
                }}
                key={item._id}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    position: "absolute",
                    zIndex: 2,
                    top: -8,
                    right: 0,
                  }}
                >
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={require("../assets/remove.png")}
                  />
                </View>
                <Image
                  style={{ width: 50, height: 50, resizeMode: "cover" }}
                  source={imagePaths[item.imageProfil]}
                />
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                    fontSize: 10,
                    marginBottom: 40,
                    lineHeight: 12,
                  }}
                  numberOfLines={2}
                  lineBreakMode="strict"
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          horizontal={true}
        />
      ) : null}

      <View
        style={{
          borderWidth: 0.5,
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 20,
          borderColor: "#00000020",
        }}
      ></View>
      {userToDisplay.length === 0 ? (
        <FlatList
          contentContainerStyle={{
            paddingTop: 30,
            gap: 20,
            paddingBottom: 140,
          }}
          data={friend}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => toggleFriend(item)}
                style={styles.containerCardsFriend}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "70%",
                    }}
                  >
                    <Image
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 30,
                      }}
                      source={imagePaths[item.imageProfil]}
                    />
                    <Text style={styles.h2}>{item.name}</Text>
                  </View>
                  <View
                    style={{
                      width: "30%",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      paddingRight: 20,
                    }}
                  >
                    <View style={styles.containerCheckBox}>
                      <TouchableWithoutFeedback>
                        <Image
                          style={{ width: "100%", height: "100%" }}
                          source={checkBoxImage(item._id)}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      ) : (
        <FlatList
          contentContainerStyle={{
            paddingTop: 30,
            gap: 20,
            paddingBottom: 140,
          }}
          data={userToDisplay}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => toggleFriend(item)}
                style={styles.containerCardsFriend}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "70%",
                    }}
                  >
                    <Image
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 30,
                      }}
                      source={imagePaths[item.imageProfil]}
                    />
                    <Text style={styles.h2}>{item.name}</Text>
                  </View>
                  <View
                    style={{
                      width: "30%",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      paddingRight: 20,
                    }}
                  >
                    <View style={styles.containerCheckBox}>
                      <TouchableWithoutFeedback>
                        <Image
                          style={{ width: "100%", height: "100%" }}
                          source={checkBoxImage(item._id)}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default AddFriendEvent;

const styles = StyleSheet.create({
  containerCardsFriend: {
    alignItems: "center",
    marginBottom: 10,
  },
  containerTextInput: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 4,
  },
  h2: {
    fontSize: 15,
    fontWeight: 600,
    paddingLeft: 20,
  },
  containerCheckBox: {
    width: 25,
    height: 25,
  },
  btn: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFB25F",
    borderRadius: 10,
  },
});
