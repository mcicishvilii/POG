import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import SocialIconsRow from "@/components/SocialIconsRow";
import { Ionicons } from "@expo/vector-icons";
import HeaderRow from "@/components/HeaderRow";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CustomDrawerContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomDrawerContent({
  isOpen,
  onClose,
}: CustomDrawerContentProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { t, i18n } = useTranslation();

  const handleSubmitEditing = (event) => {
    const query = event.nativeEvent.text;
    router.push({
      pathname: "/(news)/news",
      params: { searchQuery: query },
    });
    onClose();
  };

  const navigateToNews = () => {
    router.push("/(news)/news");
    onClose();
  };

  const navigateToIndex = () => {
    router.push("/");
    onClose();
  };

  const switchLanguage = async (lng: string) => {
    try {
      await AsyncStorage.setItem("selectedLanguage", lng); // Save selected language
      i18n.changeLanguage(lng);
    } catch (error) {
      console.error("Failed to save selected language:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <HeaderRow
            onLogoPress={navigateToIndex}
            onClosePress={onClose}
            mainText={t("mainText")}
            subText={t("comainText")}
          />
          <View style={styles.row2}>
            <SocialIconsRow justifyContent="flex-start" tintColor="white" />

            <View style={styles.languageButtons}>
              <TouchableOpacity onPress={() => switchLanguage("ge")}>
                <Text style={styles.languageText}>GE</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => switchLanguage("en")}>
                <Text style={styles.languageText}>EN</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSubmitEditing}
            />
            <Ionicons
              name="search"
              size={20}
              color="white"
              style={styles.searchIcon}
            />
          </View>

          <TouchableOpacity onPress={navigateToNews} style={styles.newsLink}>
            <Text style={styles.newsText}>{t("news")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Styles remain unchanged
  safeArea: {
    flex: 1,
    paddingTop: 36,
    backgroundColor: "#608d77",
  },
  outerContainer: {
    flex: 1,
    backgroundColor: "#70997c",
  },
  container: {
    flex: 1,
  },
  row2: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
    alignItems: "center-vertical",
  },
  languageButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  languageText: {
    color: "white",
    fontSize: 26,
    fontFamily: "SaqartveloFont",
    marginHorizontal: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 25,
    padding: 8,
    marginVertical: 16,
    marginHorizontal: 20,
  },
  searchBar: {
    flex: 1,
    paddingLeft: 8,
  },
  searchIcon: {
    paddingRight: 10,
  },
  newsLink: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  newsText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
