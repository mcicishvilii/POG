import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../i18n";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { useTranslation } from "react-i18next";
import SocialIconsRow from "@/components/SocialIconsRow";

const loadFonts = async () => {
  await Font.loadAsync({
    SaqartveloFont: require("../assets/fonts/bpg_mrgvlovani_caps_2010.ttf"),
    ProkuraturaFont: require("../assets/fonts/gl-tatishvili-12-normal.ttf"),
  });
};

const FirstScreen = () => {
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState("ge");
  const { t } = useTranslation();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  const handleButtonClick = async (lang) => {
    setSelectedButton(lang);
    i18n.changeLanguage(lang);
    await AsyncStorage.setItem("selectedLanguage", lang);
  };

  const navigateToNewsScreen = () => {
    router.push("/news");
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#FFCCA7" />;
  }

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
        <Text style={styles.textSaqartvelos}>{t("mainText")}</Text>
        <Text style={styles.textSaqartvelos}>{t("comainText")}</Text>
      </View>

      <SocialIconsRow justifyContent="center" tintColor="white" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#628F6F",
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
    marginTop: 30,
    borderRadius: 8,
    backgroundColor: "transparent",
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: "#CCA758",
  },
  unselectedBorder: {
    borderWidth: 1,
    borderColor: "#CCA758",
  },
  buttonText: {
    textTransform: "uppercase",
    textAlign: "center",
    color: "white",
    fontSize: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 120,
  },
  logo: {
    marginBottom: 40,
    width: 220,
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
