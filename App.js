import { StyleSheet, View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";

import NavBar from "./screens/NavBar";

import { SafeAreaProvider } from "react-native-safe-area-context";
import ProfilMain from "./screens/mainComponent/ProfilMain";
import FindEventMain from "./screens/mainComponent/FindEventMain";

import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";

//1 setup redux

export default function App() {
  const Stack = createStackNavigator();
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Provider store={store}>
            <StatusBar backgroundColor="#ff0000" barStyle="light-content" />

            <Stack.Navigator>
              <Stack.Screen
                name="ProfilMain"
                component={ProfilMain}
                options={{
                headerShown: false,
                animationEnabled: false
                }}
              />
              <Stack.Screen 
              name="FindEventMain" 
              component={FindEventMain} 
              options={{
                  headerShown: false,
                  animationEnabled: false
                }}
              />
            </Stack.Navigator>

            <NavBar />
          </Provider>
        </SafeAreaProvider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
