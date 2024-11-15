import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import SocialIconsRow from "@/components/SocialIconsRow";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import HeaderRow from "@/components/HeaderRow";

interface CustomDrawerContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomDrawerContent({
  isOpen,
  onClose,
}: CustomDrawerContentProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const { t } = useTranslation();

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
            <SocialIconsRow />
            <View style={styles.languageButtons}>
              <Text style={styles.languageText}>GE</Text>
              <Text style={styles.languageText}>EN</Text>
            </View>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="ძიება..."
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
            <Text style={styles.newsText}>სიახლეები</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  row1: {
    flexDirection: "row",
    backgroundColor: "#608d77",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  logo: {
    width: 90,
    height: 90,
    marginTop: 18,
    marginHorizontal: 18,
    marginBottom: 18,
  },
  textSaqartvelos: {
    color: "white",
    textAlign: "justify",
    fontFamily: "SaqartveloFont",
    fontSize: 14,
  },
  textProkuratura: {
    color: "white",
    textAlign: "justify",
    fontFamily: "ProkuraturaFont",
    fontSize: 32,
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  subTitle: {
    fontSize: 14,
    color: "white",
  },
  closeButton: {
    fontSize: 30,
    color: "white",
    paddingHorizontal: 8,
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
