import { SettingsProvider, useSettings } from '@/app/contexts/SettingsContext';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

function TabLayoutContent() {
  const { effectiveTheme } = useSettings();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[effectiveTheme].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: effectiveTheme === 'dark' ? '#1a1a1a' : '#fff',
          borderTopColor: effectiveTheme === 'dark' ? '#333' : '#ccc',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <MaterialIcons name="favorite" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

export function TabLayout() {
  return (
    <SettingsProvider>
      <TabLayoutContent />
    </SettingsProvider>
  );
}

export default TabLayout;