import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  UIManager,
  Platform,
  ImageBackground,
} from "react-native";
import HTMLView from "react-native-htmlview";
import CustomTextWithUnderline from "./CustomTextWithUnderline";
import MyImage from "../assets/images/announcement-img.png";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

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
  const { t, i18n } = useTranslation();

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
        const selectedLanguage = i18n.language;
        const endpoint =
          selectedLanguage === "ge"
            ? "https://dev.proservice.ge/pog.ge/api/slider.php"
            : "https://dev.proservice.ge/pog.ge/api/slider_en.php";

        const response = await fetch(endpoint);
        const result = await response.json();
        setNewsData(result || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [i18n.language]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#608d77" />
      </View>
    );
  }

  const selectedNews = newsData[selectedNewsIndex];
  const title = selectedNews.title || t("noTitleAvailable");
  const intro = selectedNews.intro || t("noDescriptionAvailable");
  const imageUrl = selectedNews.img
    ? `https://dev.proservice.ge/pog.ge/${selectedNews.img.replace("../", "")}`
    : "https://via.placeholder.com/300x200.png?text=No+Image+Available";

  return (
    <View>
      <ImageBackground
        source={require("../assets/images/swiper-bg.png")}
        style={styles.outerContainer}
      >
        <View style={styles.outerContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <TouchableOpacity
              ref={hornButtonRef}
              style={styles.hornButton}
              onPress={handleButtonPress}
            >
              <Image
                source={require("../assets/images/horn-white.png")}
                style={styles.hornIcon}
              />
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
          <Text style={styles.simpleText}>{truncateText(intro, 100)}</Text>
          <HTMLView
            style={styles.whiteText}
            value={`<p>${truncateText(title, 100)}</p>`}
            stylesheet={htmlStyles}
          />
          <View style={styles.squareRow}>
            {newsData.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.square,
                  selectedNewsIndex === index && styles.activeSquare,
                ]}
                onPress={() => setSelectedNewsIndex(index)}
              >
                <Text style={styles.squareText}>{index + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ImageBackground>

      <CustomTextWithUnderline />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "rgba(98, 143, 111, 0.9)",
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
  hornIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  squareRow: {
    flexDirection: "row",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    marginHorizontal: 16,
    marginTop: 10,
  },
  square: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    backgroundColor: "rgba(204, 204, 204, 0.7)", // 90% opacity
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 36,
  },
  activeSquare: {
    backgroundColor: "rgba(236, 188, 85, 0.7)",
  },
  squareText: {
    color: "white",
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
