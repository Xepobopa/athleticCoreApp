import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { AuthProvider } from '@/hooks/use-auth';

export type RootWrapperProps = {
  children: React.ReactNode;
};

export default function RootWrapper({ children }: RootWrapperProps) {
const colorScheme = useColorScheme();

  return (
    <KeyboardProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </KeyboardProvider>
  );

}