import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { TaskProvider } from './src/context/TaskContext';
import { AppRoutes } from './src/routes/AppRoutes';
import { SafeAreaProvider } from 'react-native-safe-area-context';


function Inner() {
  const { isDark, theme } = useTheme();
  return (
    <NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={theme.surface} />
      <AppRoutes />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <Inner />
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
    </SafeAreaProvider>
  );
}
