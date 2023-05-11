import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const EventInfo = ({ navigation, route }) => {
  const onGestureEvent = ({ nativeEvent }) => {
    const { translationX } = nativeEvent;

    if (translationX > 50) {
      if (navigation.canGoBack()) {
        const originScreen = route.params?.origin;
        if (originScreen) {
          navigation.navigate(originScreen);
        } else {
          navigation.goBack();
        }
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <View style={styles.container}>
        <ScrollView style={{}}>
          <Image
            style={{
              width: "100%",
              height: 270,
            }}
            source={{
              uri: "https://www.muhealth.org/sites/default/files/2019-04/shutterstock_385301440-1040.jpg",
            }}
          />
          <View
            style={{
              backgroundColor: "#fff",
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              borderRadius: 10,
              marginBottom: 100,
              padding: 20,
              gap: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: 10,
              }}
            >
              <Fontisto name="date" size={25} color="#000000" />

              <Text style={styles.h2}>03/04, 17:30</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: 10,
                paddingBottom: 30,
              }}
            >
              <FontAwesome name="users" size={25} color="#000000" />
              <View
                testID="wrappertext"
                style={{
                  width: 200,
                }}
              >
                <Text style={styles.h2} numberOfLines={1} ellipsizeMode="tail">
                  Anthony, alex, andrea, camila, piere
                </Text>
              </View>
            </View>
            <Text style={styles.descriptionText}>
              Rejoignez-nous pour une soirée détendue et chaleureuse entre amis
              ! Cet événement est l'occasion parfaite pour décompresser après
              une longue semaine de travail, rencontrer de nouvelles personnes
              et renforcer les liens avec vos amis actuels. Nous nous
              retrouverons dans un bar local avec une atmosphère décontractée,
              où vous pourrez déguster une variété de boissons, des cocktails
              créatifs aux bières artisanales et aux vins sélectionnés. Venez
              partager des rires, des conversations intéressantes et créer des
              souvenirs inoubliables avec nous. Que vous soyez un habitué des
              soirées entre amis ou que vous cherchiez simplement à élargir
              votre cercle social, cet événement est fait pour vous. N'hésitez
              pas à inviter d'autres personnes pour rendre cette soirée encore
              plus mémorable. Nous avons hâte de vous voir pour trinquer
              ensemble et célébrer l'amitié !
            </Text>

            <TouchableOpacity
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  borderColor: "#007bff",
                }}
              >
                <Ionicons name="ios-navigate-sharp" size={25} color="#007bff" />

                <Text style={[styles.h2, { color: "#007bff" }]}>
                  Port saplaya
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{ paddingTop: 50 }} testID="DemandeAjout">
              <Text style={[styles.h2, { paddingBottom: 20 }]}>
                Demande d'ajout:
              </Text>
              <View testID="ContainerDemande">
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 0.5,
                    borderColor: "#00000015",
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                      }}
                      source={require("../assets/moi.jpg")}
                    />
                    <Text
                      style={{
                        paddingLeft: 10,
                        color: "#00000095",
                      }}
                      testID="nameDemandeAjout"
                    >
                      Alexandre Tuysuzian
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                    }}
                  >
                    <TouchableOpacity>
                      <View
                        style={[
                          styles.ViewBtnAwesome,
                          { borderColor: "#52C234" },
                        ]}
                      >
                        <Ionicons name="checkmark" size={25} color="#52C234" />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <View
                        style={[
                          styles.ViewBtnAwesome,
                          { borderColor: "#00000090" },
                        ]}
                      >
                        <Ionicons
                          name="close-outline"
                          size={25}
                          color="#00000090"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderColor: "#00000015",
                    paddingBottom: 20,
                    paddingTop: 20,
                    borderBottomWidth: 0.5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                      }}
                      source={require("../assets/girlAngela.png")}
                    />
                    <Text
                      style={{
                        paddingLeft: 10,
                        color: "#00000095",
                      }}
                      testID="nameDemandeAjout"
                    >
                      Angela electra
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                    }}
                  >
                    <TouchableOpacity>
                      <View
                        style={[
                          styles.ViewBtnAwesome,
                          { borderColor: "#52C234" },
                        ]}
                      >
                        <Ionicons name="checkmark" size={25} color="#52C234" />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <View
                        style={[
                          styles.ViewBtnAwesome,
                          { borderColor: "#00000090" },
                        ]}
                      >
                        <Ionicons
                          name="close-outline"
                          size={25}
                          color="#00000090"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </PanGestureHandler>
  );
};

export default EventInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h2: {
    fontSize: 20,
  },
  descriptionText: {
    letterSpacing: 1,
  },
  ViewBtnAwesome: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 2,
  },
});
