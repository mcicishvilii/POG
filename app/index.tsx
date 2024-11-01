import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
  ActivityIndicator,
} from "react-native";

import "../i18n";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { useTranslation } from "react-i18next";

const loadFonts = async () => {
  await Font.loadAsync({
    SaqartveloFont: require("../assets/fonts/bpg_mrgvlovani_caps_2010.ttf"),
    ProkuraturaFont: require("../assets/fonts/gl-tatishvili-12-normal.ttf"),
  });
};

const FirstScreen = () => {
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState(null);

  const { t } = useTranslation();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#FFCCA7" />;
  }

  const handleButtonClick = (lang) => {
    setSelectedButton(lang);
  };

  const navigateToNewsScreen = () => {
    router.push("/news");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonRow}>
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
      </View>

      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={navigateToNewsScreen}>
          <Image
            style={styles.logo}
            source={require("../assets/images/main-logo.png")}
            accessibilityLabel="main logo"
          />
        </TouchableOpacity>
        <Text style={styles.textSaqartvelos}>
          {t("home.welcome", { appName: t("appName") })}
        </Text>
        <Text style={styles.textProkuratura}>asdasd</Text>
      </View>

      <View style={styles.iconRow}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.facebook.com/OfficialPOG/")
          }
        >
          <Image
            style={styles.icon}
            source={require("../assets/images/icons8-facebook-50.png")}
            accessibilityLabel="Facebook logo"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL("https://x.com/OfficialPOG?mx=2")}
        >
          <Image
            style={styles.icon}
            source={require("../assets/images/icons8-x-50.png")}
            accessibilityLabel="X logo"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://www.youtube.com/channel/UC8rnaboNC0B1NgBNGWhRl1A?view_as=subscriber"
            )
          }
        >
          <Image
            style={styles.icon}
            source={require("../assets/images/icons8-youtube-50.png")}
            accessibilityLabel="YouTube logo"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(98, 143, 111, 0.85)",
    justifyContent: "space-between",
    padding: 0,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 70,
  },
  button: {
    width: 100,
    padding: 10,
    borderRadius: 8,
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
    textTransform: "uppercase",
    textAlign: "center",
    color: "white",
    fontSize: 30,
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

  textSaqartvelos: {
    color: "white",
    textAlign: "center",
    fontFamily: "SaqartveloFont",
    fontSize: 20,
  },

  textProkuratura: {
    color: "white",
    textAlign: "center",
    fontFamily: "ProkuraturaFont",
    fontSize: 45,
  },

  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 30,
  },
  icon: {
    width: 41,
    height: 43,
    marginHorizontal: 10,
    marginBottom: 20,
  },
});

export default FirstScreen;
