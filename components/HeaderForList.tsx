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
  ImageBackground,
  Platform,
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
    <View style={{ flex: 1 }}>
      {/* Background Image with overlay content */}
      <ImageBackground
        source={require("../assets/images/swiper-bg.png")} // Adjust the path to your image
        style={styles.outerContainer}
      >
        <View style={styles.overlay}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
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

      {/* CustomTextWithUnderline outside everything */}
      <CustomTextWithUnderline />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(98, 143, 111, 0.9)",
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
    backgroundColor: "rgba(204, 204, 204, 0.5)", // 90% opacity
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 36,
  },
  activeSquare: {
    backgroundColor: "rgba(184 , 155 , 94, 0.9)", // 90% opacity
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
