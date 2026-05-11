import { useColorScheme } from "@/hooks/use-color-scheme";
import { Stack } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        {/* Новые экраны онбординга после регистрации */}
        <Stack.Screen 
          name="onboarding-personal" 
          options={{ headerShown: false, gestureEnabled: false }} 
        />
        <Stack.Screen 
          name="onboarding-goals" 
          options={{ headerShown: false, gestureEnabled: false }} 
        />
    </Stack>
  );
}
