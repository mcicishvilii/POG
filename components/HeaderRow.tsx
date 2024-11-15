import React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";

interface HeaderRowProps {
  onLogoPress: () => void;
  onClosePress: () => void;
  mainText: string;
  subText: string;
}

export default function HeaderRow({
  onLogoPress,
  onClosePress,
  mainText,
  subText,
}: HeaderRowProps) {
  return (
    <View style={styles.row1}>
      <TouchableOpacity onPress={onLogoPress}>
        <Image
          source={require("../assets/images/main-logo.png")}
          style={styles.logo}
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.textSaqartvelos}>{mainText}</Text>
        <Text style={styles.textProkuratura}>{subText}</Text>
      </View>

      <TouchableOpacity onPress={onClosePress}>
        <Text style={styles.closeButton}>☰</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row1: {
    flexDirection: "row",
    backgroundColor: "#608d77",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 90,
    height: 90,
    marginTop: 18,
    marginHorizontal: 18,
    marginBottom: 18,
  },
  textSaqartvelos: {
    color: "white",
    textAlign: "justify",
    fontFamily: "SaqartveloFont",
    fontSize: 14,
  },
  textProkuratura: {
    color: "white",
    textAlign: "justify",
    fontFamily: "ProkuraturaFont",
    fontSize: 32,
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  closeButton: {
    fontSize: 30,
    color: "white",
    paddingHorizontal: 8,
  },
});
