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
import React from "react";

const FindEvent = () => {
  return (

    <SafeAreaView
      style={{
        backgroundColor: "#1D2328",
        color: "#fff",
        borderBottomRightRadius: 37,
        borderBottomLeftRadius: 37,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

<View>


</View>


      <View
        style={{
          paddingTop: 10,
          width: "82%",
        }}
      >
        <TextInput
          style={{
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#fff",
            color: "#fff",
          }}
        >
          Quel ?
        </TextInput>
      </View>

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
              borderWidth: 1,
              borderColor: "#fff",
              color: "#fff",
            }}
          >
            Localisation ?
          </TextInput>
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
              borderWidth: 1,
              borderColor: "#fff",
              color: "#fff",
              marginBottom: 15,
            }}
          >
            Date ?
          </TextInput>
        </View>
      </View>

      <ScrollView 
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      style={{
        display:"flex",
        paddingLeft:20,
        paddingRight:20
      }}
      >
        <TouchableOpacity
          style={{
            width:80,
            height:80, 
            alignItems:"center",
            justifyContent:"center",
            gap:5,
            borderRadius:50,
            backgroundColor:"#7A7A7A18",
            marginBottom:15,
            marginRight:10,
            borderWidth:1,
            borderColor:"#FF9D33"
          }}
        >
          <Image 
          source={require("../assets/friendWhite.png")} 
          style={{
            width:30,
            height:30,
            resizeMode:"contain",
            
          }} />
          <Text
            style={{
              color: "#fff",
              fontSize:10
            }}
          >
            Meeting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width:80,
            height:80, 
            alignItems:"center",
            justifyContent:"center",
            gap:5,
            borderRadius:50,
            backgroundColor:"#7A7A7A18",
            marginBottom:15,
            marginRight:10,

          }}
        >
          <Image 
          source={require("../assets/sport.png")} 
          style={{
            width:30,
            height:30,
            resizeMode:"contain",
            
          }} />
          <Text
            style={{
              color: "#fff",
              fontSize:10
            }}
          >
            Sport
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width:80,
            height:80, 
            alignItems:"center",
            justifyContent:"center",
            gap:5,
            borderRadius:50,
            backgroundColor:"#7A7A7A18",
            marginBottom:15,
            marginRight:10,
          }}
        >
          <Image 
          source={require("../assets/coffee.png")} 
          style={{
            width:30,
            height:30,
            resizeMode:"contain",
            
          }} />
          <Text
            style={{
              color: "#fff",
              fontSize:10
            }}
          >
            Coffee
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width:80,
            height:80, 
            alignItems:"center",
            justifyContent:"center",
            gap:5,
            borderRadius:50,
            backgroundColor:"#7A7A7A18",
            marginBottom:15,
            marginRight:10,
          }}
        >
          <Image 
          source={require("../assets/friendWhite.png")} 
          style={{
            width:30,
            height:30,
            resizeMode:"contain",
            
          }} />
          <Text
            style={{
              color: "#fff",
              fontSize:10
            }}
          >
            Meeting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width:80,
            height:80, 
            alignItems:"center",
            justifyContent:"center",
            gap:5,
            borderRadius:50,
            backgroundColor:"#7A7A7A18",
            marginBottom:15,
            marginRight:10,
            justifyContent:"center"

          }}
        >
          <Image 
          source={require("../assets/friendWhite.png")} 
          style={{
            width:30,
            height:30,
            resizeMode:"contain",
            
          }} />
          <Text
            style={{
              color: "#fff",
              fontSize:10
            }}
          >
            Meeting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width:80,
            height:80, 
            alignItems:"center",
            justifyContent:"center",
            gap:5,
            borderRadius:50,
            backgroundColor:"#7A7A7A18",
            marginBottom:15,
            marginRight:40,
            justifyContent:"center"

          }}
        >
          <Image 
          source={require("../assets/friendWhite.png")} 
          style={{
            width:30,
            height:30,
            resizeMode:"contain",
            
          }} />
          <Text
            style={{
              color: "#fff",
              fontSize:10
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
