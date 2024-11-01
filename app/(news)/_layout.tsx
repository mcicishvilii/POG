import { Drawer } from "expo-router/drawer";
import { Text, View } from "react-native";
import CustomDrawerContent from "./CustomDrawerContent";

export default function DrawerLayout() {
  return (
    <Drawer
      defaultStatus="closed"
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: "white",
          width: "70%",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="news"
        options={{
          drawerLabel: "News",
          title: "News",
        }}
      />
    </Drawer>
  );
}
