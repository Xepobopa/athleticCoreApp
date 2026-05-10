import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Text as TextStyles } from '@/constants/theme';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'defaultThin' | 'subtitle' | 'link' | 'small' | 'big';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'defaultThin' ? styles.defaultThin : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'small' ? styles.small : undefined,
        type === 'big' ? styles.big : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: "Inter-Regular",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontFamily: TextStyles.big.fontFamily,
    fontSize: 34,
    fontWeight: 'bold',
    lineHeight: 41,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  small: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  big: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: -0.45,
  },
  defaultThin: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '300',
  },
});
