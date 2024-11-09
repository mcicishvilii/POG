import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NewsTextWithUnderline = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.newsTextStatic}>სიახლეები</Text>
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
    textAlign: "center",
  },
  customUnderline: {
    width: "10%",
    height: 3,
    backgroundColor: "#B89B5E",
    marginTop: -5,
  },
});

export default NewsTextWithUnderline;
