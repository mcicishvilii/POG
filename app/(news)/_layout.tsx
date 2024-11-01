// (news)/_layout.tsx
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "./CustomDrawerContent";

export default function DrawerLayout() {
  return (
    <Drawer
      defaultStatus="closed"
      screenOptions={{
        headerShown: false, // Changed this to false since you have a custom header
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
          headerShown: false, // Make sure this is false too
        }}
      />
    </Drawer>
  );
}
