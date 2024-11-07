import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewsFeedScreen() {
  const navigation = useNavigation();
  const { searchQuery } = useLocalSearchParams();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to "en" or whatever is your default

  useEffect(() => {
    const fetchSelectedLanguage = async () => {
      const lang = await AsyncStorage.getItem("selectedLanguage");
      setSelectedLanguage(lang || "en"); // fallback to "en" if no language is saved
    };

    fetchSelectedLanguage();
  }, []);

  useEffect(() => {
    // Fetch news data from the API
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://dev.proservice.ge/pog.ge/api/news.php"
        );
        const json = await response.json();

        // Filter news items by the selected language
        const filteredNews = json.data.filter(
          (item) => item.lang === (selectedLanguage === "ge" ? "geo" : "eng")
        );

        setNewsItems(filteredNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedLanguage]);

  const filteredNews = searchQuery
    ? newsItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : newsItems;

  const renderItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Image
        source={{ uri: `https://dev.proservice.ge/pog.ge/${item.img}` }}
        style={styles.newsImage}
      />
      <Text style={styles.newsTitle}>{item.title}</Text>
      <View style={styles.divider} />
      <Text style={styles.newsDate}>{item.date}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

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
        keyExtractor={(item) => item.rec_id}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  newsDate: {
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
