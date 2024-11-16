import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Platform,
  SafeAreaView,
} from "react-native";
import HTMLView from "react-native-htmlview";
import CustomTextWithUnderline from "./CustomTextWithUnderline";
import MyImage from "../assets/images/announcement-img.png";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HeaderForList = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectedNewsIndex, setSelectedNewsIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  const hornButtonRef = useRef(null);

  const handleButtonPress = () => {
    if (overlayVisible) {
      setOverlayVisible(false);
      return;
    }

    hornButtonRef.current.measure((fx, fy, width, height, px, py) => {
      const overlayWidth = 380;
      const overlayHeight = 350;
      const { width: screenWidth, height: screenHeight } =
        Dimensions.get("window");
      const centerX = px + width / 2;
      const centerY = py + height / 2;
      const safeX = Math.min(
        Math.max(centerX - overlayWidth / 2, 0),
        screenWidth - overlayWidth
      );
      const safeY = Math.min(
        Math.max(centerY - overlayHeight / 2, 0),
        screenHeight - overlayHeight
      );
      setOverlayPosition({ x: safeX, y: safeY });
      setOverlayVisible(true);
    });
  };
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
          <TouchableOpacity
            ref={hornButtonRef}
            style={styles.hornButton}
            onPress={handleButtonPress}
          >
            <Text style={styles.hornText}>📢</Text>
          </TouchableOpacity>

          {overlayVisible && (
            <View
              style={[
                styles.overlay,
                {
                  top: overlayPosition.y,
                  left: overlayPosition.x,
                },
              ]}
            >
              <Image source={MyImage} style={styles.overlayImage} />
            </View>
          )}
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
  container: { justifyContent: "center", alignItems: "center" },
  hornButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 20,
  },
  hornText: { color: "#fff", fontSize: 16 },

  overlay: {
    position: "absolute",
    width: 300,
    height: 480,
    backgroundColor: "rgba(255, 255, 255, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    zIndex: 9999,
    elevation: 10,
  },
  overlayImage: {
    width: "85%",
    height: "85%",
    borderRadius: 10,
    zIndex: 9999,
    margin: 10,
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
