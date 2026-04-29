import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  style?: ViewStyle;
}

export function CustomButton({
  title, onPress, variant = 'primary', size = 'md',
  loading = false, disabled = false, icon, style,
}: CustomButtonProps) {
  const { theme } = useTheme();

  const heights: Record<ButtonSize, number> = { sm: 40, md: 52, lg: 58 };
  const fontSizes: Record<ButtonSize, number> = { sm: 13, md: 15, lg: 17 };

  const backgrounds: Record<ButtonVariant, string> = {
    primary: theme.primary, secondary: theme.surface,
    danger: theme.error, ghost: 'transparent',
  };
  const textColors: Record<ButtonVariant, string> = {
    primary: '#FFFFFF', secondary: theme.text,
    danger: '#FFFFFF', ghost: theme.primary,
  };
  const borderColors: Record<ButtonVariant, string> = {
    primary: 'transparent', secondary: theme.border,
    danger: 'transparent', ghost: theme.primary,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.82}
      style={[
        styles.button,
        {
          height: heights[size],
          backgroundColor: backgrounds[variant],
          borderColor: borderColors[variant],
          opacity: disabled ? 0.45 : 1,
          shadowColor: variant === 'primary' ? theme.primary : 'transparent',
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColors[variant]} size="small" />
      ) : (
        <>
          {icon ? <Text style={[styles.icon, { fontSize: fontSizes[size] + 2 }]}>{icon}</Text> : null}
          <Text style={[styles.text, { color: textColors[variant], fontSize: fontSizes[size] }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderWidth: 1.5,
    flexDirection: 'row',
    gap: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  icon: { lineHeight: 22 },
  text: { fontWeight: '700', letterSpacing: 0.2 },
});