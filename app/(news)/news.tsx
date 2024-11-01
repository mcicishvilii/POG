import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const newsItems = Array.from({ length: 20 }, (_, index) => ({
  id: index.toString(),
  title: `News Title ${index + 1}`,
  description: `This is a short description of news item ${index + 1}.`,
  date: `17 February 2024`,
}));

const NewsFeedScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Image
        source={{
          uri: "file:///absolute-path-to-your-project/assets/images/main-logo.png",
        }}
        style={{ width: 100, height: 100 }}
      />

      <Text style={styles.newsTitle}>{item.title}</Text>
      <View style={styles.divider} />
      <Text style={styles.newsDescription}>{item.description}</Text>
      <Text style={styles.newsDate}>{item.date}</Text>
    </View>
  );

  return (
    <FlatList
      data={newsItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  newsItem: {
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  newsImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
  divider: {
    height: 1,
    width: "80%",
    backgroundColor: "gray",
    marginVertical: 8,
  },
  newsDescription: {
    textAlign: "center",
    marginBottom: 8,
  },
  newsDate: {
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default NewsFeedScreen;
