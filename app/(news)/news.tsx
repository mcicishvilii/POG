import HeaderRow from "@/components/HeaderRow"; // Import the HeaderRow component
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
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomDivider from "@/components/CustomDivider";
import HeaderForList from "@/components/HeaderForList";
import HTMLView from "react-native-htmlview";
import { useDrawer } from "./news-details/DrawerContext";
import { useTranslation } from "react-i18next";

export default function NewsFeedScreen() {
  const router = useRouter();
  const { searchQuery } = useLocalSearchParams();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, setIsOpen } = useDrawer();
  const [totalPages, setTotalPages] = useState(0);
  const { t, i18n } = useTranslation();

  const truncateText = (htmlText, maxChars = 70) => {
    if (!htmlText) {
      return "";
    }
    const plainText = htmlText.replace(/<[^>]+>/g, "");
    return plainText.length > maxChars
      ? plainText.slice(0, maxChars) + "..."
      : plainText;
  };
  const fetchSelectedLanguage = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
      const language = storedLanguage || "ge"; // Default to "ge"
      setSelectedLanguage(language);
      i18n.changeLanguage(language);
    } catch (error) {
      console.error("Failed to fetch selected language:", error);
      setSelectedLanguage("ge"); // Fallback to default
    }
  };
  useEffect(() => {
    fetchSelectedLanguage();
  }, [i18n]);

  const navigateToNewsDetails = (recId) => {
    router.push(`/news-details/${recId}`);
  };

  const fetchNews = async (page = 1) => {
    if (!selectedLanguage) return; // Wait until the language is loaded

    try {
      setLoading(true);

      const endpoint =
        selectedLanguage === "ge"
          ? "https://dev.proservice.ge/pog.ge/api/news.php"
          : "https://dev.proservice.ge/pog.ge/api/news_en.php";

      const response = await fetch(`${endpoint}?page=${page}`);
      const json = await response.json();

      setTotalPages(parseInt(json.pagination.total_pages, 10));
      setNewsItems(json.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load the language first
    fetchSelectedLanguage();
  }, []);

  useEffect(() => {
    // Fetch news only when the language is ready
    if (selectedLanguage) {
      setCurrentPage(1); // Reset page to 1 when language changes
      fetchNews(1);
    }
  }, [selectedLanguage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchNews(page);
  };

  useEffect(() => {
    console.log("xdeba");
    if (!isOpen) {
      fetchNews(currentPage);
      fetchSelectedLanguage();
    }
  }, [isOpen]);

  const filteredNews = searchQuery
    ? newsItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : newsItems;

  const Pagination = () => {
    const pages = [];
    const maxDisplayedPages = 5;
    const halfMaxPages = Math.floor(maxDisplayedPages / 2);

    let startPage = Math.max(1, currentPage - halfMaxPages);
    let endPage = Math.min(totalPages, currentPage + halfMaxPages);

    if (currentPage <= halfMaxPages) {
      endPage = Math.min(totalPages, maxDisplayedPages);
    } else if (currentPage + halfMaxPages >= totalPages) {
      startPage = Math.max(1, totalPages - maxDisplayedPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          onPress={() => handlePageChange(i)}
          style={styles.pageButton}
        >
          <Text
            style={[
              styles.pageText,
              currentPage === i && styles.pageTextActive,
            ]}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={styles.arrowButton}
        >
          <Ionicons name="arrow-back" size={20} style={styles.arrowIcon} />
        </TouchableOpacity>

        <View style={styles.pageNumbers}>{pages}</View>

        <TouchableOpacity
          onPress={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          style={styles.arrowButton}
        >
          <Ionicons name="arrow-forward" size={20} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToNewsDetails(item.rec_id)}>
      <View style={styles.newsItem}>
        <Image
          source={{ uri: `https://dev.proservice.ge/pog.ge/${item.img}` }}
          style={styles.newsImage}
        />
        <Text style={styles.newsTitle}>
          {item.title || "No Title Available"}
        </Text>
        <CustomDivider />
        <HTMLView value={`<p>${truncateText(item.text, 100)}</p>`} />
        <Text style={styles.newsDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
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
      <View style={styles.justPadding}></View>

      <HeaderRow
        onLogoPress={() => router.push("/")}
        onClosePress={() => setIsOpen(true)}
        mainText={t("mainText")}
        subText={t("comainText")}
      />

      <FlatList
        data={filteredNews}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.rec_id}-${index}`}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={<HeaderForList />}
        ListFooterComponent={<Pagination />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  justPadding: {
    backgroundColor: "#608d77",
    paddingBottom: 16,
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
    marginTop: 32,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#628F6F",
    fontFamily: "ProkuraturaFont",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },

  arrowIcon: {
    color: "#FFFFFF",
  },

  arrowButton: {
    backgroundColor: "#d3d3d3",
    borderRadius: 20,
    padding: 8,
    marginHorizontal: 8,
  },
  pageNumbers: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  pageButton: {
    padding: 8,
    marginHorizontal: 2,
  },
  pageTextActive: {
    fontSize: 16,
    color: "#628F6F",
  },
  pageText: {
    fontSize: 16,
    color: "#929395",
  },
});
