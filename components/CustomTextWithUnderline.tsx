import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const NewsTextWithUnderline = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchSelectedLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
        if (storedLanguage) {
          i18n.changeLanguage(storedLanguage); // Change the language dynamically
        }
      } catch (error) {
        console.error("Failed to fetch selected language:", error);
      }
    };

    fetchSelectedLanguage();
  }, [i18n]);

  return (
    <View style={styles.container}>
      <Text style={styles.newsTextStatic}>{t("news")}</Text>
      <View style={styles.customUnderline} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  newsTextStatic: {
    fontSize: 16,
    fontFamily: "SaqartveloFont",
    lineHeight: 22,
    marginBottom: 5,
    marginTop: 64,
    textAlign: "center",
  },
  customUnderline: {
    width: "10%",
    height: 3,
    marginBottom: 25,
    backgroundColor: "#B89B5E",
    marginTop: -5,
  },
});

export default NewsTextWithUnderline;
