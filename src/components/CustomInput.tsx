import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  isPassword?: boolean;
  icon?: string;
}

export function CustomInput({ label, error, hint, isPassword = false, icon, style, ...rest }: CustomInputProps) {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const borderColor = error ? theme.error : focused ? theme.primary : theme.border;

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={[styles.label, { color: focused ? theme.primary : theme.textSecondary }]}>{label}</Text>
      ) : null}
      <View style={[styles.inputWrapper, { backgroundColor: theme.inputBackground, borderColor, borderWidth: focused ? 2 : 1.5 }]}>
        {icon ? <Text style={styles.leftIcon}>{icon}</Text> : null}
        <TextInput
          style={[styles.input, { color: theme.text }, style]}
          placeholderTextColor={theme.textMuted}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword((p) => !p)} style={styles.eyeButton}>
            <Text style={{ fontSize: 16 }}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={[styles.errorText, { color: theme.error }]}>⚠ {error}</Text> : null}
      {hint && !error ? <Text style={[styles.hintText, { color: theme.textMuted }]}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 4 },
  label: { fontSize: 12, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, paddingHorizontal: 16 },
  leftIcon: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, height: 52, fontSize: 15 },
  eyeButton: { padding: 6 },
  errorText: { fontSize: 12, marginTop: 6, fontWeight: '500' },
  hintText: { fontSize: 12, marginTop: 6 },
});