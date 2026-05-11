import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => router.back()}
      activeOpacity={0.7}
    >
      <IconSymbol name="chevron.left" size={24} color="#000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    paddingVertical: 8,
    paddingRight: 8,
  }
});