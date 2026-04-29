import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CustomButton } from './CustomButton';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon = '📭', title, description, actionLabel, onAction }: EmptyStateProps) {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: theme.primaryLight }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {description ? <Text style={[styles.description, { color: theme.textSecondary }]}>{description}</Text> : null}
      {actionLabel && onAction ? (
        <CustomButton title={actionLabel} onPress={onAction} style={styles.button} icon="+" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  iconContainer: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  icon: { fontSize: 48 },
  title: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 10, letterSpacing: -0.3 },
  description: { fontSize: 14, textAlign: 'center', lineHeight: 21, marginBottom: 28 },
  button: { minWidth: 180 },
});