import React, { useEffect, useState } from "react";
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
import HeaderRow from "@/components/HeaderRow";
import { useDrawer } from "./DrawerContext";
import CustomTextWithUnderline from "@/components/CustomTextWithUnderline";
import CustomTextWithUnderlineStart from "@/components/CustomTextWithUnderlineStart";
import BackButton from "@/components/BackButton";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewsTextWithUnderlineStart from "@/components/CustomTextWithUnderlineStart";

const NewsDetailsScreen = () => {
  const { recId } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const { setIsOpen } = useDrawer();
  const [newsDetails, setNewsDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const fetchSelectedLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
        if (storedLanguage) {
          setSelectedLanguage(storedLanguage);
          i18n.changeLanguage(storedLanguage);
        }
      } catch (error) {
        console.error("Failed to fetch selected language:", error);
      }
    };

    fetchSelectedLanguage();
  }, [i18n]);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        setLoading(true);

        // Fetch the selected language from AsyncStorage
        const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
        const endpoint =
          storedLanguage === "en"
            ? "https://dev.proservice.ge/pog.ge/api/news_en.php"
            : "https://dev.proservice.ge/pog.ge/api/news.php";

        const url = `${endpoint}?rec_id=${recId}`;

        const response = await fetch(url);
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
    <View style={styles.container}>
      <View style={styles.justPadding}></View>
      <HeaderRow
        onLogoPress={() => router.push("/")}
        onClosePress={() => setIsOpen(true)}
        mainText={t("mainText")}
        subText={t("comainText")}
      />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.row}>
          <NewsTextWithUnderlineStart text={t("news")} />
          <BackButton onPress={() => router.back()} />
        </View>
        <Image
          source={{
            uri: `https://dev.proservice.ge/pog.ge/${newsDetails.img}`,
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{newsDetails.title}</Text>
        <Text style={styles.date}>{newsDetails.date}</Text>

        <HTMLView
          value={newsDetails.text}
          stylesheet={styles}
          addLineBreaks={true}
        />

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{t("backButtonText")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  justPadding: {
    backgroundColor: "#608d77",
    paddingBottom: 16,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
