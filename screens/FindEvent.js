import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import React, { useState } from "react";

const FindEvent = () => {
  const [IndexFindEvent, setIndexFindEvent] = useState(0);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#040738",
        color: "#fff",
        borderBottomRightRadius: 37,
        borderBottomLeftRadius: 37,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View
          style={{
            paddingTop: 10,
            width: "50%",
          }}
        >
          <TextInput
            style={{
              paddingTop: 15,
              paddingBottom: 15,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 10,
              borderWidth:.5,
              borderColor: "#fff",
              color: "#fff",
            }}
            placeholder="Localisation ?"
            placeholderTextColor="#ffffff80"
          ></TextInput>
        </View>
        <View
          style={{
            paddingTop: 10,
            width: "30%",
          }}
        >
          <TextInput
            style={{
              paddingTop: 15,
              paddingBottom: 15,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 10,
              borderWidth: .5,
              borderColor: "#fff",
              color: "#fff",
              marginBottom: 15,
            }}
            placeholder="Date ?"
            placeholderTextColor="#ffffff80"
          ></TextInput>
        </View>
      </View>

      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        style={{
          display: "flex",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            borderRadius: 50,
            backgroundColor: "#7A7A7A18",
            marginBottom: 15,
            marginRight: 10,

            ...(IndexFindEvent === 0
              ? { borderWidth: 1, borderColor: "#52C234" }
              : {}),
          }}
          onPress={()=>{setIndexFindEvent(0)}}
        >
          <Image
            source={require("../assets/friendWhite.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 10,
            }}
          >
            Meeting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            borderRadius: 50,
            backgroundColor: "#7A7A7A18",
            marginBottom: 15,
            marginRight: 10,
            ...(IndexFindEvent === 1
              ? { borderWidth: 1, borderColor: "#52C234" }
              : {}),

          }}
          onPress={()=>{setIndexFindEvent(1)}}
        >
          <Image
            source={require("../assets/sport.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 10,
            }}
          >
            Sport
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            borderRadius: 50,
            backgroundColor: "#7A7A7A18",
            marginBottom: 15,
            marginRight: 10,
            ...(IndexFindEvent === 2
              ? { borderWidth: 1, borderColor: "#52C234" }
              : {})
          }}
          onPress={()=>{setIndexFindEvent(2)}}
        >
          <Image
            source={require("../assets/coffee.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 10,
            }}
          >
            Coffee
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            borderRadius: 50,
            backgroundColor: "#7A7A7A18",
            marginBottom: 15,
            marginRight: 10,
            ...(IndexFindEvent === 3
              ? { borderWidth: 1, borderColor: "#52C234" }
              : {}),
          }}
          onPress={()=>{setIndexFindEvent(3)}}
        >
          <Image
            source={require("../assets/friendWhite.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 10,
            }}
          >
            Meeting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            borderRadius: 50,
            backgroundColor: "#7A7A7A18",
            marginBottom: 15,
            marginRight: 10,
            justifyContent: "center",
            ...(IndexFindEvent === 4
              ? { borderWidth: 1, borderColor: "#52C234" }
              : {}),
          }}
          onPress={()=>{setIndexFindEvent(4)}}
        >
          <Image
            source={require("../assets/friendWhite.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 10,
            }}
          >
            Meeting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            borderRadius: 50,
            backgroundColor: "#7A7A7A18",
            marginBottom: 15,
            marginRight: 40,
            justifyContent: "center",
            ...(IndexFindEvent === 5
              ? { borderWidth: 1, borderColor: "#52C234" }
              : {}),
          }}
          onPress={()=>{setIndexFindEvent(5)}}
        >
          <Image
            source={require("../assets/friendWhite.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 10,
            }}
          >
            Meeting
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FindEvent;

const styles = StyleSheet.create({});
