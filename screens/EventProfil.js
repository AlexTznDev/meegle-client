import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import React, {useEffect} from "react";

import { useSelector } from "react-redux";
import { selectIsActiveNavigate , selectImageAppli} from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const EventProfil = () => {
  const isActiveNavigate = useSelector(selectIsActiveNavigate);
  const navigation = useNavigation();
  const ImageAppli = useSelector(selectImageAppli)

  

  const containerStyle = {
    ...styles.container,
    paddingTop:
      isActiveNavigate === "Profil" ? 60 : styles.container.paddingTop,
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
              backgroundColor: "#52C234",
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
      )}

      <ScrollView style={containerStyle}>
        <TouchableOpacity
          onPress={() => {
            {
              isActiveNavigate === "Profil"
                ? navigation.navigate("EventInfo", { origin: "ProfilMain" })
                : navigation.navigate("EventInfo", { origin: "FindEventMain" });
            }
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
              source={ImageAppli[0].name}
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
              source={ImageAppli[3].name}
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
              source={ImageAppli[2].name}
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
              source={ImageAppli[4].name}
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
              source={ImageAppli[1].name}
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

        {isActiveNavigate === "Profil" && (
          <View
            testID="ajustView"
            style={{
              height: 120,
            }}
          ></View>
        )}
        {isActiveNavigate === "FindEvent" && (
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
