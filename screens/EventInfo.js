import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

const EventInfo = ({ navigation, route }) => {
  const onGestureEvent = ({ nativeEvent }) => {
    const { translationX } = nativeEvent;

    if (translationX > 100) {
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
              height: 1000,
              backgroundColor: "#fff",
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              borderRadius: 10,
              padding: 20,
              gap: 20,
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
              <Image
                source={require("../assets/localisation.png")}
                style={{
                  width: 20,
                  height: 20,
                }}
                resizeMode="contain"
              />

              <Text style={styles.h2}>Port saplaya</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "flex-start",
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

              <Text style={styles.h2}>03/04, 17:30</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: 10,
                paddingBottom:30
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
                  width: 200,
                }}
              >
                <Text numberOfLines={1} ellipsizeMode="tail">
                  Anthony, alex, andrea, camila, piere
                </Text>
              </View>
            </View>
            <Text style={styles.descriptionText}>
          Rejoignez-nous pour une soirée détendue et chaleureuse
          entre amis ! Cet événement est l'occasion parfaite pour décompresser
          après une longue semaine de travail, rencontrer de nouvelles personnes
          et renforcer les liens avec vos amis actuels. Nous nous retrouverons
          dans un bar local avec une atmosphère décontractée, où vous pourrez
          déguster une variété de boissons, des cocktails créatifs aux bières
          artisanales et aux vins sélectionnés. Venez partager des rires, des
          conversations intéressantes et créer des souvenirs inoubliables avec
          nous. Que vous soyez un habitué des soirées entre amis ou que vous
          cherchiez simplement à élargir votre cercle social, cet événement est
          fait pour vous. N'hésitez pas à inviter d'autres personnes pour rendre
          cette soirée encore plus mémorable. Nous avons hâte de vous voir pour
          trinquer ensemble et célébrer l'amitié !
        </Text>
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
  descriptionText:{
    letterSpacing:1
  }
});
