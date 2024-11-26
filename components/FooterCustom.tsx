import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTranslation } from "react-i18next";
import SocialIconsRow from "./SocialIconsRow";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Dynamic Texts */}
      <Text style={styles.text}>{t("footer.news")}</Text>
      <View style={styles.divider} />
      <Text style={styles.text}>{t("footer.contact")}</Text>
      <Text style={styles.text}>{t("footer.address")}</Text>
      <Text style={styles.text}>{t("footer.kancelaria")}</Text>
      <Text style={styles.text}>+995 32 240 53 43</Text>
      <Text style={styles.text}>+995 32 240 53 44</Text>
      <Text style={styles.text}>+995 32 240 53 45</Text>
      <Text style={styles.text}>{t("footer.email")}</Text>
      <SocialIconsRow />
      <View style={styles.divider} />

      {/* Logo and Texts */}
      <View style={styles.row}>
        <Image
          source={require("../assets/images/main-logo.png")}
          style={styles.logo}
        />
        <View style={styles.column}>
          <Text style={styles.text}>{t("footer.logoText1")}</Text>
          <Text style={styles.text}>{t("footer.logoText2")}</Text>
        </View>
      </View>

      {/* Accessibility Info */}
      <View style={styles.row}>
        <Image
          source={require("../assets/images/main-logo.png")}
          style={styles.smallLogo}
        />
        <Text style={styles.text}>{t("footer.disabledInfo")}</Text>
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
    backgroundColor: "rgba(98, 143, 111, 0.85)",
  },
  text: {
    color: "#333",
    fontSize: 14,
    marginVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
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
    height: 30,
  },
});
