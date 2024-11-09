import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomDivider = () => {
  return <View style={styles.customUnderline} />;
};

const styles = StyleSheet.create({
  customUnderline: {
    width: "50%",
    height: 3,
    backgroundColor: "#DDE0E6",
    marginBottom: 16,
    marginTop: 16,
  },
});

export default CustomDivider;
