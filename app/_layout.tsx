import React from "react";
import { Stack } from "expo-router";

const App = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="news" options={{ headerShown: false }} />
    </Stack>
  );
};

export default App;
