import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HTMLView from "react-native-htmlview";

const NewsDetailsScreen = () => {
  const { recId } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const [newsDetails, setNewsDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("recId:", recId);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await fetch(
          `https://dev.proservice.ge/pog.ge/api/news.php?rec_id=${recId}`
        );
        const json = await response.json();

        if (json && Array.isArray(json) && json.length > 0) {
          setNewsDetails(json[0]);
        } else {
          console.warn("No data available for this recId:", recId);
          setNewsDetails(null);
        }
      } catch (error) {
        console.error("Error fetching news details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (recId) {
      fetchNewsDetails();
    } else {
      console.warn("recId is undefined, cannot fetch news details");
      setLoading(false);
    }
  }, [recId]);

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (!newsDetails) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>No details available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={{
            uri: `https://dev.proservice.ge/pog.ge/${newsDetails.img}`,
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{newsDetails.title}</Text>
        <Text style={styles.date}>{newsDetails.date}</Text>

        <HTMLView value={newsDetails.text} stylesheet={styles} />

        {/* <Text style={styles.text}>{newsDetails.text}</Text> */}

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
  },
  scrollViewContent: {
    paddingBottom: 32,
  },
  image: { width: "100%", height: 200, borderRadius: 8, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  date: { color: "#628F6F", fontWeight: "bold", marginBottom: 16 },
  text: { fontSize: 16, lineHeight: 24, marginBottom: 32 },
  backButton: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#628F6F",
    borderRadius: 4,
    marginTop: 16,
  },
  backButtonText: { color: "#fff", fontSize: 16, textAlign: "center" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red" },
});

export default NewsDetailsScreen;
