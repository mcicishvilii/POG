import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTranslation } from "react-i18next";
import SocialIconsRow from "./SocialIconsRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FooterRow from "./FooterRow";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const fetchSelectedLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
        if (storedLanguage) {
          setSelectedLanguage(storedLanguage);
          i18n.changeLanguage(storedLanguage);
        }
      } catch (error) {
        console.error("Failed to fetch selected language:", error);
      }
    };

    fetchSelectedLanguage();
  }, [i18n]);

  return (
    <View style={styles.container}>
      {/* Dynamic Texts */}
      <Text style={styles.firstText}>{t("footer.news")}</Text>
      <View style={styles.divider} />
      <Text style={styles.firstContact}>{t("footer.contact")}</Text>
      <Text style={styles.text}>{t("footer.address")}</Text>
      <Text style={styles.text}>{t("footer.kancelaria")}</Text>
      <Text style={styles.text}>+995 32 240 53 43</Text>
      <Text style={styles.text}>+995 32 240 53 44</Text>
      <Text style={styles.text}>+995 32 240 53 45</Text>
      <Text style={styles.text}>{t("footer.email")}</Text>
      <View style={styles.justPadding}></View>
      <SocialIconsRow justifyContent="flex start" tintColor="white" />

      <View style={styles.divider} />

      <FooterRow
        onLogoPress={function (): void {
          throw new Error("Function not implemented.");
        }}
        mainText={t("mainText")}
        subText={t("comainText")}
      />

      {/* Accessibility Info */}
      <View style={styles.row}>
        <Image
          source={require("../assets/images/handicap.png")}
          style={[styles.smallLogo, { tintColor: "white" }]}
        />
        <Text style={styles.textAdapted}>{t("footer.disabledInfo")}</Text>
      </View>

      {/* Footer Notes */}
      <Text style={styles.text}>{t("footer.allRightsReserved")}</Text>
      <Text style={styles.text}>{t("footer.createdBy")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 64,
    marginTop: 64,
    backgroundColor: "rgba(98, 143, 111, 0.85)",
  },
  justPadding: {
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  firstText: {
    color: "white",
    fontSize: 20,
    marginTop: 64,
    textTransform: "uppercase",
    marginVertical: 4,
    marginHorizontal: 16,
  },

  firstContact: {
    color: "white",
    fontSize: 20,
    textTransform: "uppercase",
    marginVertical: 4,
    marginHorizontal: 16,
  },

  titleContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  text: {
    color: "white",
    fontSize: 14,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  textAdapted: {
    color: "white",
    fontSize: 14,
    textTransform: "uppercase",
    marginVertical: 4,
    marginHorizontal: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  column: {
    marginLeft: 16,
  },
  logo: {
    width: 60,
    height: 60,
  },
  smallLogo: {
    width: 30,
    marginStart: 16,
    paddingStart: 16,
    color: "white",
    height: 30,
  },
});
