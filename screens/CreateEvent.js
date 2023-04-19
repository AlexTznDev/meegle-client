import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";



//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  selectImageEvent,
  selectImage,
  setIsActiveNavigate,
  setIsImageFromAppli,
  setEventStep,
  setImageEvent,
  setSelectImage,
  selectImageAppli,
  selectIsImageFromAppli,
} from "../slices/navSlice.js";



const CreateEvent = () => {
  const imageEvent = useSelector(selectImageEvent);
  const SelectImage = useSelector(selectImage);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const ImageAppli = useSelector(selectImageAppli);
  const IsImageFromAppli = useSelector(selectIsImageFromAppli);

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
            fontSize: 18,
            transform: [{ translateX: 24 }],
          }}
        >
          Creer évenement
        </Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(setEventStep(1));
            dispatch(setIsActiveNavigate("CreateMain2"));
          }}
        >
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
          {IsImageFromAppli ? (
            <Image
              source={ImageAppli[SelectImage]}
              style={{ width: "80%", height: 300 }}
            />
          ) : (
            <Image
              source={{ uri: imageEvent }}
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
            marginTop: 20,
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
            <TouchableOpacity
              onPress={() => {
                dispatch(setSelectImage(0)),
                  dispatch(setIsImageFromAppli(true));
                dispatch(setImageEvent(null));
              }}
              style={styles.containerImgText}
            >
              <View
                style={
                  SelectImage === 0 && IsImageFromAppli
                    ? {
                        position: "absolute",
                        top: -1,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: "#ffffff60",
                        zIndex: 1,
                      }
                    : null
                }
              ></View>
              <Image
                source={require("../assets/Beach_voley.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Beach volley</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.containerImgText}
              onPress={() => {
                dispatch(setSelectImage(1)),
                  dispatch(setIsImageFromAppli(true)),
                  dispatch(setImageEvent(null));
              }}
            >
              <View
                style={
                  SelectImage === 1 && IsImageFromAppli
                    ? {
                        position: "absolute",
                        top: -1,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: "#ffffff60",
                        zIndex: 1,
                      }
                    : null
                }
              ></View>
              <Image
                source={require("../assets/Plage_Friend.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Beach & Friend</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.containerImgText}
              onPress={() => {
                dispatch(setSelectImage(2)),
                  dispatch(setIsImageFromAppli(true)),
                  dispatch(setImageEvent(null));
              }}
            >
              <View
                style={
                  SelectImage === 2 && IsImageFromAppli
                    ? {
                        position: "absolute",
                        top: -1,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: "#ffffff60",
                        zIndex: 1,
                      }
                    : null
                }
              ></View>
              <Image
                source={require("../assets/Concert_Festival.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Concert & Festival</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.containerImgText}
              onPress={() => {
                dispatch(setSelectImage(3)),
                  dispatch(setIsImageFromAppli(true)),
                  dispatch(setImageEvent(null));
              }}
            >
              <View
                style={
                  SelectImage === 3 && IsImageFromAppli
                    ? {
                        position: "absolute",
                        top: -1,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: "#ffffff60",
                        zIndex: 1,
                      }
                    : null
                }
              ></View>
              <Image
                source={require("../assets/BarCocktail.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Bar & Cocktail</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 2,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.containerImgText}
              onPress={() => {
                dispatch(setSelectImage(4)),
                  dispatch(setIsImageFromAppli(true)),
                  dispatch(setImageEvent(null));
              }}
            >
              <View
                style={
                  SelectImage === 4 && IsImageFromAppli
                    ? {
                        position: "absolute",
                        top: -1,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: "#ffffff60",
                        zIndex: 1,
                      }
                    : null
                }
              ></View>
              <Image
                source={require("../assets/padel.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Padel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.containerImgText}
              onPress={() => {
                dispatch(setSelectImage(5)),
                  dispatch(setIsImageFromAppli(true)),
                  dispatch(setImageEvent(null));
              }}
            >
              <View
                style={
                  SelectImage === 5 && IsImageFromAppli
                    ? {
                        position: "absolute",
                        top: -1,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: "#ffffff60",
                        zIndex: 1,
                      }
                    : null
                }
              ></View>
              <Image
                source={require("../assets/Gorge_mountain.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Gorge & Mountain</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.containerImgText}
              onPress={() => {
                dispatch(setSelectImage(6)),
                  dispatch(setIsImageFromAppli(true)),
                  dispatch(setImageEvent(null));
              }}
            >
              <View
                style={
                  SelectImage === 6 && IsImageFromAppli
                    ? {
                        position: "absolute",
                        top: -1,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: "#ffffff60",
                        zIndex: 1,
                      }
                    : null
                }
              ></View>
              <Image
                source={require("../assets/foot_volley.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Foot volley</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerImgText}
              onPress={() => {
                dispatch(setSelectImage(7)),
                  dispatch(setIsImageFromAppli(true)),
                  dispatch(setImageEvent(null));
              }}
            >
              <View
                style={
                  SelectImage === 7 && IsImageFromAppli
                    ? {
                        position: "absolute",
                        top: -1,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: "#ffffff60",
                        zIndex: 1,
                      }
                    : null
                }
              ></View>
              <Image
                source={require("../assets/rando.jpg")}
                style={styles.imageSmall}
              />
              <Text style={styles.textImage}>Randonnée</Text>
            </TouchableOpacity>
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
