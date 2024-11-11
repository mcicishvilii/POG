import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import SocialIconsRow from "@/components/SocialIconsRow";

export default function CustomDrawerContent(props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSubmitEditing = (event) => {
    const query = event.nativeEvent.text;
    router.push({
      pathname: "/(news)/news",
      params: { searchQuery: query },
    });
    props.navigation.closeDrawer();
  };

  const navigateToNews = () => {
    router.push("/(news)/news");
    props.navigation.closeDrawer();
  };

  return (
    <View style={styles.outerContainer}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.container}
      >
        <View style={styles.row1}>
          <Image
            source={require("../../assets/images/main-logo.png")}
            style={styles.logo}
          />

          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>Sample Title</Text>
            <Text style={styles.subTitle}>Subtitle text here</Text>
          </View>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Text style={styles.closeButton}>☰</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row2}>
          <SocialIconsRow />
          <View style={styles.languageButtons}>
            <Text style={styles.languageText}>EN</Text>
            <Text style={styles.languageText}>KA</Text>
          </View>
        </View>

        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSubmitEditing}
        />

        <TouchableOpacity onPress={navigateToNews} style={styles.newsLink}>
          <Text style={styles.newsText}>სიახლეები</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#628F6F",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  row1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
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
    fontSize: 20,
    color: "white",
    paddingHorizontal: 8,
  },

  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  languageButtons: {
    flexDirection: "row",
  },
  languageText: {
    color: "white",
    fontSize: 16,
    marginHorizontal: 8,
  },

  searchBar: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    marginVertical: 16,
  },

  newsLink: {
    paddingVertical: 8,
    alignItems: "center",
  },
  newsText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
