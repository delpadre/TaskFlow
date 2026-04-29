import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackRoutes } from './HomeStackRoutes';
import { SettingsStackRoutes } from './SettingsStackRoutes';
import { TaskStackRoutes } from './TaskStackRoutes';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { TabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

const HomeIcon = ({ color }: { color: string }) => (
  <Text style={{ fontSize: 20, color }}>⌂</Text>
);

const TasksIcon = ({ color }: { color: string }) => (
  <Text style={{ fontSize: 20, color }}>▤</Text>
);

const SettingsIcon = ({ color }: { color: string }) => (
  <Text style={{ fontSize: 20, color }}>◎</Text>
);

export function TabRoutes() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const initialTab: keyof TabParamList = user?.role === 'admin' ? 'Settings' : 'Home';

  return (
    <Tab.Navigator
      initialRouteName={initialTab}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          paddingBottom: 10,
          paddingTop: 8,
          height: 64,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackRoutes}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskStackRoutes}
        options={{
          tabBarLabel: 'Tarefas',
          tabBarIcon: ({ color }) => <TasksIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackRoutes}
        options={{
          tabBarLabel: 'Config.',
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}