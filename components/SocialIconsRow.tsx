import {
  View,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

const SocialIconsRow = () => {
  return (
    <View style={styles.iconRow}>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.facebook.com/OfficialPOG /")
        }
      >
        <Image
          style={styles.icon}
          source={require("../assets/images/icons8-facebook-50.png")}
          accessibilityLabel="Facebook logo"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => Linking.openURL("https://x.com/OfficialPOG?mx=2")}
      >
        <Image
          style={styles.icon}
          source={require("../assets/images/icons8-x-50.png")}
          accessibilityLabel="X logo"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "https://www.youtube.com/channel/UC8rnaboNC0B1NgBNGWhRl1A?view_as=subscriber"
          )
        }
      >
        <Image
          style={styles.icon}
          source={require("../assets/images/icons8-youtube-50.png")}
          accessibilityLabel="YouTube logo"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 30,
  },
  icon: {
    width: 41,
    height: 43,
    marginHorizontal: 10,
    marginBottom: 20,
  },
});

export default SocialIconsRow;
