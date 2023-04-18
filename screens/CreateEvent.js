import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { selectImageEvent } from "../slices/navSlice";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

//REDUX
import { useDispatch } from "react-redux";
import { setIsActiveNavigate } from "../slices/navSlice.js";
import { setImageEvent } from "../slices/navSlice";

const CreateEvent = () => {
  const imageEvent = useSelector(selectImageEvent);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(imageEvent);
  }, [imageEvent]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingTop: 10,
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfilMain", { shouldAnimate: true });
            dispatch(setIsActiveNavigate("Profil"));
            dispatch(setImageEvent(null));
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
            fontSize: 18,
            transform: [{ translateX: 24 }],
          }}
        >
          Creer évenement
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: "#007BFF",
              fontSize: 18,
              transform: [{ translateX: 10 }],
            }}
          >
            Suivant
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          gap: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageEvent !== null && (
            <Image
              source={{ uri: imageEvent }}
              // source={imageEvent}
              style={{ width: "80%", height: 300 }}
            />
          )}
        </View>

        <View
          style={{
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#333333",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                paddingLeft: 10,
              }}
            >
              Image de notre bibliothéque
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 2,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.containerImgText}>
              <Image
                source={require("../assets/Beach_voley.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Beach volley</Text>
            </View>

            <View style={styles.containerImgText}>
              <Image
                source={require("../assets/Plage_Friend.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Beach & Friend</Text>
            </View>

            <View style={styles.containerImgText}>
              <Image
                source={require("../assets/Concert_Festival.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Concert & Festival</Text>
            </View>

            <View style={styles.containerImgText}>
              <Image
                source={require("../assets/BarCocktail.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Bar & Cocktail</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 2,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.containerImgText}>
              <Image
                source={require("../assets/padel.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Padel</Text>
            </View>

            <View style={styles.containerImgText}>
              <Image
                source={require("../assets/Gorge_mountain.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Gorge & Mountain</Text>
            </View>

            <View style={styles.containerImgText}>
              <Image
                source={require("../assets/foot_volley.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Foot volley</Text>
            </View>
            <View style={styles.containerImgText}>
              <Image
                source={require("../assets/rando.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Randonnée</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  imageSmall: {
    width: "100%",
    height: 74,
    resizeMode: "cover",
  },
  textImage: {
    fontSize: 10,
    color: "#fff",
  },
  containerImgText: {
    width: "24.5%",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
});
