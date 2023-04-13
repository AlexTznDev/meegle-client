import { StyleSheet, View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import Profil from "./screens/Profil";
import EventProfil from "./screens/EventProfil";
import NavBar from "./screens/NavBar";
import FindEvent from "./screens/FindEvent";
import FindEventResult from "./screens/FindEventResult";
import { SafeAreaProvider } from "react-native-safe-area-context";

//1 setup redux

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <Provider store={store}>
          <StatusBar backgroundColor="#ff0000" barStyle="light-content" />

          {/* <Profil /> */}
          {/* <EventProfil /> */}

          <FindEvent />
          <FindEventResult />

          <NavBar />
        </Provider>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
