import { View } from "react-native";
import { Stack } from "expo-router";
import CustomDrawerContent from "./CustomDrawerContent";
import { useState, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { DrawerContext } from "./news-details/DrawerContext";

export default function DrawerLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const translateY = useSharedValue(-1000);

  const drawerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    translateY.value = withSpring(isOpen ? 0 : -1000, {
      damping: 20,
      stiffness: 90,
    });
  }, [isOpen]);

  return (
    <DrawerContext.Provider value={{ isOpen, setIsOpen }}>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />

        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "90%",
              backgroundColor: "white",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              zIndex: 1000,
            },
            drawerStyle,
          ]}
        >
          <CustomDrawerContent
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </Animated.View>
      </View>
    </DrawerContext.Provider>
  );
}
