import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../types/task';
import { useTheme } from '../context/ThemeContext';
import { StatusBadge, PriorityBadge } from './StatusBadge';
import { formatDateShort } from '../utils/formatDate';

export function TaskCard({ task, onPress }: { task: Task; onPress: () => void }) {
  const { theme } = useTheme();

  const priorityAccent: Record<string, string> = {
    alta: theme.error,
    media: theme.warning,
    baixa: theme.info,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, shadowColor: theme.shadow }]}
    >
      {/* Priority stripe */}
      <View style={[styles.stripe, { backgroundColor: priorityAccent[task.priority] }]} />

      <View style={styles.body}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={[styles.categoryPill, { backgroundColor: theme.primaryLight }]}>
            <Text style={styles.categoryIcon}>{task.categoryIcon}</Text>
            <Text style={[styles.categoryName, { color: theme.primary }]}>{task.category}</Text>
          </View>
          <Text style={[styles.date, { color: theme.textMuted }]}>{formatDateShort(task.createdAt)}</Text>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>{task.title}</Text>

        {/* Description */}
        {task.description ? (
          <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={2}>
            {task.description}
          </Text>
        ) : null}

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: theme.borderLight }]}>
          <View style={styles.badges}>
            <StatusBadge status={task.status} size="sm" />
            <PriorityBadge priority={task.priority} size="sm" />
          </View>
          <Text style={[styles.updatedAt, { color: theme.textMuted }]}>
            🕐 {formatDateShort(task.updatedAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  stripe: { width: 4 },
  body: { flex: 1, padding: 16 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  categoryPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, gap: 5 },
  categoryIcon: { fontSize: 14 },
  categoryName: { fontSize: 12, fontWeight: '700' },
  date: { fontSize: 11, fontWeight: '500' },
  title: { fontSize: 16, fontWeight: '800', lineHeight: 22, marginBottom: 6, letterSpacing: -0.2 },
  description: { fontSize: 13, lineHeight: 19, marginBottom: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTopWidth: 1 },
  badges: { flexDirection: 'row', gap: 6 },
  updatedAt: { fontSize: 11, fontWeight: '500' },
});