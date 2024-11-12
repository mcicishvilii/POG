import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomTextWithUnderline from "./CustomTextWithUnderline";

const HeaderForList = () => {
  return (
    <View>
      <View style={styles.grayContainer}>
        <Text style={styles.grayText}>Gray Container</Text>
      </View>
      <CustomTextWithUnderline />
    </View>
  );
};

const styles = StyleSheet.create({
  grayContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 36,
  },
  grayText: {
    fontSize: 16,
    color: "#000",
  },
});

export default HeaderForList;
