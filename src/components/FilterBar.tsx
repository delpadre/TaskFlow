import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TaskFilter } from '../types/task';
import { useTheme } from '../context/ThemeContext';

const FILTERS = [
  { key: 'todas' as TaskFilter, label: 'Todas', icon: '◉' },
  { key: 'pendente' as TaskFilter, label: 'Pendente', icon: '○' },
  { key: 'em_andamento' as TaskFilter, label: 'Andamento', icon: '◑' },
  { key: 'concluida' as TaskFilter, label: 'Concluída', icon: '●' },
];

export function FilterBar({ activeFilter, onFilterChange, counts }: {
  activeFilter: TaskFilter;
  onFilterChange: (f: TaskFilter) => void;
  counts?: Partial<Record<TaskFilter, number>>;
}) {
  const { theme } = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {FILTERS.map((f) => {
        const isActive = f.key === activeFilter;
        const count = counts?.[f.key];
        return (
          <TouchableOpacity
            key={f.key}
            onPress={() => onFilterChange(f.key)}
            activeOpacity={0.7}
            style={[
              styles.chip,
              {
                backgroundColor: isActive ? theme.primary : theme.surface,
                borderColor: isActive ? theme.primary : theme.border,
                shadowColor: isActive ? theme.primary : 'transparent',
              },
            ]}
          >
            <Text style={[styles.chipIcon, { color: isActive ? '#fff' : theme.textMuted }]}>{f.icon}</Text>
            <Text style={[styles.chipLabel, { color: isActive ? '#FFFFFF' : theme.textSecondary }]}>{f.label}</Text>
            {count !== undefined && (
              <View style={[styles.countBadge, { backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : theme.primaryLight }]}>
                <Text style={[styles.countText, { color: isActive ? '#fff' : theme.primary }]}>{count}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 14, gap: 8, flexDirection: 'row' },
  chip: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 22, borderWidth: 1.5, gap: 6,
    shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 3,
  },
  chipIcon: { fontSize: 12, fontWeight: '900' },
  chipLabel: { fontSize: 13, fontWeight: '700' },
  countBadge: { paddingHorizontal: 7, paddingVertical: 1, borderRadius: 10 },
  countText: { fontSize: 11, fontWeight: '800' },
});