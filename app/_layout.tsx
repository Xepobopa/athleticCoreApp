
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { Lexend_300Light, Lexend_400Regular, Lexend_700Bold, useFonts } from '@expo-google-fonts/lexend';
import { useEffect } from 'react';
import RootWrapper from './wrapper';

export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const { isReady } = useAuth();
  const [loaded, error] = useFonts({
    'Lexend-Regular': Lexend_400Regular,
    'Lexend-Bold': Lexend_700Bold,
    'Lexend-Light': Lexend_300Light,
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  useEffect(() => {
    console.log('Fonts loaded:', loaded);
    console.log('Font loading error:', error);
    if ((loaded) || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  } else {
    return (
      <RootWrapper>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </RootWrapper>
    );
  }
}
