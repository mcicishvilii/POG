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
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchSelectedLanguage = async () => {
      const lang = await AsyncStorage.getItem("selectedLanguage");
      setSelectedLanguage(lang || "en");
    };

    fetchSelectedLanguage();
  }, []);

  const fetchNews = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dev.proservice.ge/pog.ge/api/news.php?page=${page}`
      );
      const json = await response.json();

      const filteredNews = json.data.filter(
        (item) => item.lang === (selectedLanguage === "ge" ? "geo" : "eng")
      );

      setTotalPages(parseInt(json.pagination.total_pages));
      setNewsItems(filteredNews);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchNews(1);
  }, [selectedLanguage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchNews(page);
  };

  const filteredNews = searchQuery
    ? newsItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : newsItems;

  const Pagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          onPress={() => handlePageChange(i)}
          style={[
            styles.pageButton,
            currentPage === i && styles.pageButtonActive,
          ]}
        >
          <Text style={styles.pageText}>{i}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.pageNumbers}>{pages.slice(0, 10)}</View>

        <TouchableOpacity
          onPress={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          <Ionicons name="arrow-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };

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
        keyExtractor={(item, index) => `${item.rec_id}-${index}`}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={<Pagination />}
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
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  pageNumbers: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  pageButton: {
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    backgroundColor: "#e0e0e0",
  },
  pageButtonActive: {
    backgroundColor: "#6200ea",
  },
  pageText: {
    fontSize: 14,
    color: "white",
  },
});
