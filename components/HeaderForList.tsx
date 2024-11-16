import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import HTMLView from "react-native-htmlview";
import CustomTextWithUnderline from "./CustomTextWithUnderline";

const HeaderForList = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectedNewsIndex, setSelectedNewsIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const truncateText = (htmlText, maxChars = 70) => {
    if (!htmlText) {
      return "";
    }
    const plainText = htmlText.replace(/<[^>]+>/g, "");
    return plainText.length > maxChars
      ? plainText.slice(0, maxChars) + "..."
      : plainText;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://dev.proservice.ge/pog.ge/api/news.php"
        );
        const result = await response.json();
        if (result?.data) {
          setNewsData(result.data.slice(0, 2)); // Get only the first two items
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const showAlert = () => {
    Alert.alert("Alert", "Horn button pressed!");
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#608d77" />
      </View>
    );
  }

  const selectedNews = newsData[selectedNewsIndex];

  return (
    <View>
      <View style={styles.outerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://dev.proservice.ge/pog.ge/${selectedNews.img}`,
            }}
            style={styles.image}
          />
          <TouchableOpacity style={styles.hornButton} onPress={showAlert}>
            <Text style={styles.hornText}>📢</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.simpleText}>ვიდეო</Text>
        <HTMLView
          style={styles.whiteText}
          value={`<p>${truncateText(selectedNews.text, 100)}</p>`}
          stylesheet={htmlStyles}
        />

        <Text style={styles.dateText}>{selectedNews.date}</Text>

        <View style={styles.squareRow}>
          <TouchableOpacity
            style={[
              styles.square,
              selectedNewsIndex === 0 && styles.activeSquare,
            ]}
            onPress={() => setSelectedNewsIndex(0)}
          >
            <Text style={styles.squareText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.square,
              selectedNewsIndex === 1 && styles.activeSquare,
            ]}
            onPress={() => setSelectedNewsIndex(1)}
          >
            <Text style={styles.squareText}>2</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomTextWithUnderline />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#608d77",
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 32,
    marginHorizontal: 16,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  hornButton: {
    position: "absolute",
    top: -20,
    right: 10,
    backgroundColor: "rgba(204, 167, 88,1)",
    padding: 10,
    borderRadius: 20,
  },
  hornText: {
    color: "#fff",
    fontSize: 16,
  },
  simpleText: {
    color: "#ECBC55",
    fontSize: 22,
    lineHeight: 25,
    marginLeft: 16,
    marginTop: 32,
    textTransform: "uppercase",
  },
  whiteText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 16,
    marginTop: 42,
    maxWidth: "100%",
  },
  dateText: {
    color: "#ECBC55",
    fontSize: 22,
    marginLeft: 16,
    marginTop: 42,
  },
  squareRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 10,
  },
  square: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    backgroundColor: "#ccc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 36,
  },
  activeSquare: {
    backgroundColor: "#ECBC55", // Highlight active square
  },
  squareText: {
    color: "#000",
    fontSize: 18,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#608d77",
  },
});

const htmlStyles = {
  p: {
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
  strong: {
    fontWeight: "bold",
    color: "#ECBC55",
  },
  em: {
    fontStyle: "italic",
  },
  a: {
    color: "#FFDD44",
    textDecorationLine: "underline",
  },
};

export default HeaderForList;
