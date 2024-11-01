// (news)/_layout.tsx
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "./CustomDrawerContent";

export default function DrawerLayout() {
  return (
    <Drawer
      defaultStatus="closed"
      screenOptions={{
        headerShown: false,
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
          headerShown: false,
        }}
      />
    </Drawer>
  );
}
