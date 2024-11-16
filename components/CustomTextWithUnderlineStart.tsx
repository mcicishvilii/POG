import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface NewsTextWithUnderlineStartProps {
  text: string;
}

const NewsTextWithUnderlineStart: React.FC<NewsTextWithUnderlineStartProps> = ({
  text,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.newsTextStatic}>{text}</Text>
      <View style={styles.customUnderline} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
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
    width: "50%",
    height: 3,
    marginBottom: 25,
    backgroundColor: "#B89B5E",
    marginTop: -5,
  },
});

export default NewsTextWithUnderlineStart;
