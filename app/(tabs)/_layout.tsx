import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';

import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <NativeTabs tintColor={'#FF5F1F'}>
        <NativeTabs.Trigger name='(diary)'>
          <NativeTabs.Trigger.Icon sf={'fork.knife'} />
          <NativeTabs.Trigger.Label>Щоденник</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name='(calendar)'>
          <NativeTabs.Trigger.Icon sf={'calendar'}/>
          <NativeTabs.Trigger.Label>Календар</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name='(programs)'>
          <NativeTabs.Trigger.Icon sf={'dumbbell.fill'}/>
          <NativeTabs.Trigger.Label>Програми</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name='(profile)'>
          <NativeTabs.Trigger.Icon sf={'person.fill'}/>
          <NativeTabs.Trigger.Label>Профіль</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.headerBackground,
  }
});

{/* <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs> */}
