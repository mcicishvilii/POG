import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

const App = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (lang) => {
    setSelectedButton(lang);
  };

  const navigateToNewsScreen = () => {
    // Navigate to news screen logic
    alert("Navigate to news screen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "en" ? styles.selectedButton : null,
            selectedButton !== "en" ? styles.unselectedBorder : null,
          ]}
          onPress={() => handleButtonClick("en")}
        >
          <Text style={styles.buttonText}>en</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "ge" ? styles.selectedButton : null,
            selectedButton !== "ge" ? styles.unselectedBorder : null,
          ]}
          onPress={() => handleButtonClick("ge")}
        >
          <Text style={styles.buttonText}>ge</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={navigateToNewsScreen}>
          <Image
            style={styles.logo}
            source={require("../assets/images/main-logo.png")}
            accessibilityLabel="main logo"
          />
        </TouchableOpacity>
        <Text style={styles.text}>საქართველოს</Text>
        <Text style={styles.text}>პროკურატურა</Text>
      </View>

      <View style={styles.iconRow}>
        <Image
          style={styles.icon}
          source={require("../assets/images/main-logo.png")}
          accessibilityLabel="Facebook logo"
        />
        <Image
          style={styles.icon}
          source={require("../assets/images/main-logo.png")}
          accessibilityLabel="X logo"
        />
        <Image
          style={styles.icon}
          source={require("../assets/images/main-logo.png")}
          accessibilityLabel="YouTube logo"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(143, 111, 111, 0.85)",
    justifyContent: "space-between",
    padding: 0,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 70,
  },
  button: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "transparent",
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: "#FFCCA758",
  },
  unselectedBorder: {
    borderWidth: 1,
    borderColor: "#FFCCA758",
  },
  buttonText: {
    color: "white",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  text: {
    textAlign: "center",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 30,
  },
  icon: {
    width: 31,
    height: 53,
    marginHorizontal: 5,
  },
});

export default App;
