import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  const initial = user?.name?.[0]?.toUpperCase() || '?';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderBottomColor: theme.border,
        },
      ]}
    >
      {/* LEFT */}
      <View style={styles.left}>
        <Text style={[styles.title, { color: theme.text }]}>
          {title}
        </Text>

        <View style={styles.userRow}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: theme.primary },
            ]}
          >
            <Text style={styles.avatarText}>{initial}</Text>
          </View>

          <Text style={[styles.userName, { color: theme.textSecondary }]}>
            {user?.name}
          </Text>
        </View>
      </View>

      {/* RIGHT */}
      <View style={styles.right}>
        <View
          style={[
            styles.roleBadge,
            {
              backgroundColor: theme.primaryLight,
            },
          ]}
        >
          <Text
            style={[
              styles.roleText,
              { color: theme.primary },
            ]}
          >
            {user?.role === 'admin' ? 'Admin' : 'User'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          style={[
            styles.logoutBtn,
            { backgroundColor: theme.card },
          ]}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutIcon}>⎋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  left: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },

  userName: {
    fontSize: 13,
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  roleText: {
    fontSize: 11,
    fontWeight: '600',
  },

  logoutBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutIcon: {
    fontSize: 16,
  },
});