import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import React from "react";

import { useSelector } from "react-redux";
import { selectIsActiveNavigate } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const EventProfil = () => {
  const isActiveNavigate = useSelector(selectIsActiveNavigate);
  const navigation = useNavigation();

  const containerStyle = {
    ...styles.container,
    paddingTop: isActiveNavigate === "Profil"  ? 60 : styles.container.paddingTop,
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
      {isActiveNavigate === "Profil" && ( //! le && pour remplacer l interogation et pas besoin de mettre de "null"
        <View
          testID="containerButtonEventProfil"
          style={{
            flexDirection: "row",
            gap: 10,
            position: "absolute",
            zIndex: 10,
            top: 10,
            backgroundColor: "transparent",
          }}
        >
          <TouchableOpacity
            style={{
              width: 150,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: "#FFB25F",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text>EVENT I GO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 150,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: "#FFEBD6",
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
      )}

      <ScrollView style={containerStyle}>
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate("EventInfo")
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 13,
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 10,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 160,
                height: 130,
                borderRadius: 20,
              }}
              source={{
                uri: "https://www.muhealth.org/sites/default/files/2019-04/shutterstock_385301440-1040.jpg",
              }}
            />
            <View
              style={{
                gap: 20,
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Image
                  source={require("../assets/localisation.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />

                <Text>Port saplaya</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Image
                  source={require("../assets/date.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />

                <Text>03/04, 17:30</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Image
                  source={require("../assets/friend.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />

                <View
                  testID="wrappertext"
                  style={{
                    width: 140,
                  }}
                >
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    Anthony, alex, andrea, camila, piere
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 13,
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 10,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 160,
                height: 130,
                borderRadius: 20,
              }}
              source={{
                uri: "https://cdn.sortiraparis.com/images/80/1665/613916-top-20-des-concerts-les-plus-attendus-a-paris-en-2021.jpg",
              }}
            />
            <View
              style={{
                gap: 20,
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Image
                  source={require("../assets/localisation.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />

                <Text>Port saplaya</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Image
                  source={require("../assets/date.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />

                <Text>03/04, 17:30</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Image
                  source={require("../assets/friend.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />

                <View
                  testID="wrappertext"
                  style={{
                    width: 140,
                  }}
                >
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    Anthony, alex, andrea, camila, piere
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 13,
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 10,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 160,
                height: 130,
                borderRadius: 20,
              }}
              source={{
                uri: "https://lacanausurfclub.com/wp-content/uploads/2020/08/Capture-d%E2%80%99e%CC%81cran-2020-08-11-a%CC%80-10.23.52.png",
              }}
            />
            <View
              style={{
                gap: 20,
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Image
                  source={require("../assets/localisation.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />

                <Text>Port saplaya</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Image
                  source={require("../assets/date.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />

                <Text>03/04, 17:30</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Image
                  source={require("../assets/friend.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />

                <View
                  testID="wrappertext"
                  style={{
                    width: 140,
                  }}
                >
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    Anthony, alex, andrea, camila, piere
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 13,
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 10,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 160,
                height: 130,
                borderRadius: 20,
              }}
              source={{
                uri: "https://thumbs.dreamstime.com/b/illustrative-editorial-corona-beer-bottles-beach-sand-genichesk-ukraine-june-illustrative-editorial-corona-beer-223906060.jpg",
              }}
            />
            <View
              style={{
                gap: 20,
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Image
                  source={require("../assets/localisation.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />

                <Text>Port saplaya</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Image
                  source={require("../assets/date.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />

                <Text>03/04, 17:30</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Image
                  source={require("../assets/friend.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />

                <View
                  testID="wrappertext"
                  style={{
                    width: 140,
                  }}
                >
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    Anthony, alex, andrea, camila, piere
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {!isActiveNavigate ? (
          <View
            testID="ajustView"
            style={{
              height: 120,
            }}
          ></View>
        ) : (
          <View
            testID="ajustView"
            style={{
              height: 70,
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
});
