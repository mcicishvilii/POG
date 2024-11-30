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

      {/* Wrap the two texts in a container */}
      <View style={styles.titleContainer}>
        <Text
          style={styles.textSaqartvelos}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          {mainText}
        </Text>
        <Text
          style={styles.textProkuratura}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          {subText}
        </Text>
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
    backgroundColor: "#628F6F",
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
  titleContainer: {
    flex: 1, // Take up available space in the row
    justifyContent: "center", // Center the text vertically
    marginHorizontal: 8,
  },
  textSaqartvelos: {
    color: "white",
    fontFamily: "SaqartveloFont",
    fontSize: 14,
    width: "100%", // Take the full width of the container
  },
  textProkuratura: {
    color: "white",
    fontFamily: "ProkuraturaFont",
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: 2,
    width: "100%", // Take the full width of the container
  },
  closeButton: {
    fontSize: 30,
    color: "white",
    paddingHorizontal: 32,
  },
});
