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
} from "react-native";
import React, { useEffect } from "react";

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

  const friend = [
    {
      _id: "643057d24f7cc1cc638935cd",
      name: "Angela electra",
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
  ];

  //! sera a enlever avec le uri plus tard
  const imagePaths = {
    girlAngela: require("../assets/girlAngela.png"),
    boy: require("../assets/boy.png"),
    Girl2: require("../assets/Girl2.png"),
  };

  const toggleFriend = (id) => {
    // Vérifier si ami dans la liste
    const friendInList = addedFriendList.includes(id);

    if (!friendInList) {
      // Si l'ami n'est pas présent
      dispatch(addFriend(id));
    } else {
      // Si l'ami est présent et que je souhaite supprimer
      dispatch(removeFriend(id));
    }
  };

  const checkBoxImage = (id) => {
    if (addedFriendList.includes(id)) {
      return require("../assets/validate.png");
    } else {
      return require("../assets/checkBox.png");
    }
  };

  useEffect(() => {
    console.log(addedFriendList);
  }, [addedFriendList]);

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
        ></TextInput>
      </View>

      <FlatList
        contentContainerStyle={{
          paddingTop: 20,
          gap: 20,
        }}
        data={friend}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View style={styles.containerCardsFriend}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "70%",
                }}
              >
                <Image
                  style={{
                    width: 50,
                    height: 50,
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
                  <TouchableWithoutFeedback
                    onPress={() => toggleFriend(item._id)}
                  >
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      source={checkBoxImage(item._id)}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default AddFriendEvent;

const styles = StyleSheet.create({
  containerCardsFriend: {
    flexDirection: "row",
    paddingLeft: 20,
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
    fontSize: 20,
    fontWeight: 400,
    paddingLeft: 20,
  },
  containerCheckBox: {
    width: 25,
    height: 25,
  },
});
