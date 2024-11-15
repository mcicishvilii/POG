import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomTextWithUnderline from "./CustomTextWithUnderline";

const HeaderForList = () => {
  const showAlert = () => {
    Alert.alert("Alert", "Horn button pressed!");
  };

  return (
    <View>
      <View style={styles.outerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.image}
          />
          <TouchableOpacity style={styles.hornButton} onPress={showAlert}>
            <Text style={styles.hornText}>📢</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.simpleText}>ვიდეო</Text>

        <Text style={styles.whiteText}>
          არასრულწლოვანთა მართლმსაჯულება საქართველოს პროკურატურის ერთ-ერთი
          პრიორიტეტული მიმართუ...
        </Text>

        <Text style={styles.dateText}>17.02.2024</Text>

        <View style={styles.squareRow}>
          <View style={styles.square}>
            <Text style={styles.squareText}>1</Text>
          </View>
          <View style={styles.square}>
            <Text style={styles.squareText}>2</Text>
          </View>
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
  squareText: {
    color: "#000",
    fontSize: 18,
  },
});

export default HeaderForList;
