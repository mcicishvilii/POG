// app/(drawer)/news.tsx
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

const newsItems = Array.from({ length: 20 }, (_, index) => ({
  id: index.toString(),
  title: `News Title ${index + 1}`,
  description: `This is a short description of news item ${index + 1}.`,
  date: "17 February 2024",
  image: require("../../assets/images/main-logo.png"),
}));

export default function NewsFeedScreen() {
  const navigation = useNavigation();
  const { searchQuery } = useLocalSearchParams();

  // If you want to filter news based on searchQuery
  const filteredNews = searchQuery
    ? newsItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : newsItems;

  const renderItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Image source={item.image} style={styles.newsImage} />
      <Text style={styles.newsTitle}>{item.title}</Text>
      <View style={styles.divider} />
      <Text style={styles.newsDescription}>{item.description}</Text>
      <Text style={styles.newsDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        {searchQuery ? (
          <Text style={styles.searchInfo}>
            Search results for: {searchQuery}
          </Text>
        ) : null}
      </View>
      <FlatList
        data={filteredNews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 16,
  },
  searchInfo: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  listContainer: {
    paddingBottom: 16,
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
