import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';

export function LoginScreen() {
  const { login } = useAuth();
  const { theme } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Preencha todos os campos.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const ok = await login(username.trim(), password);
      if (!ok) setError('Usuário ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.logo, { color: theme.primary }]}>
            ✦ TaskFlow
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Organize seu dia com eficiência
          </Text>
        </View>

        {/* CARD */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.title, { color: theme.text }]}>
            Entrar
          </Text>

          <View style={styles.inputs}>
            <CustomInput
              label="Usuário"
              placeholder="Digite seu usuário"
              value={username}
              onChangeText={(v) => {
                setUsername(v);
                setError('');
              }}
              autoCapitalize="none"
              autoCorrect={false}
              icon="👤"
            />

            <CustomInput
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChangeText={(v) => {
                setPassword(v);
                setError('');
              }}
              isPassword
              icon="🔒"
            />
          </View>

          {error ? (
            <Text style={[styles.errorText, { color: theme.error }]}>
              {error}
            </Text>
          ) : null}

          <CustomButton
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            size="lg"
            style={styles.button}
          />
        </View>

        {/* FOOTER / TEST */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textMuted }]}>
            Teste rápido:
          </Text>
          <Text style={{ color: theme.primary }}>
          user / 123 | admin / 123  
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 10,
  },

  logo: {
    fontSize: 28,
    fontWeight: '700',
  },

  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },

  card: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },

  inputs: {
    gap: 14,
  },

  errorText: {
    fontSize: 13,
    marginTop: 10,
  },

  button: {
    marginTop: 20,
  },

  footer: {
    alignItems: 'center',
    marginTop: 10,
    gap: 4,
  },

  footerText: {
    fontSize: 12,
  },
});