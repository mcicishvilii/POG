import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";

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

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.title}>Drawer Menu</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSubmitEditing}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchBar: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
  },
});
