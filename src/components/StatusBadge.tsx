import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TaskPriority, TaskStatus } from '../types/task';

const STATUS_CONFIG: Record<TaskStatus, { label: string; bg: string; text: string; dot: string }> = {
  pendente:     { label: 'Pendente',     bg: '#F1F5F9', text: '#64748B', dot: '#94A3B8' },
  em_andamento: { label: 'Em andamento', bg: '#FFFBEB', text: '#B45309', dot: '#F59E0B' },
  concluida:    { label: 'Concluída',    bg: '#F0FDF4', text: '#15803D', dot: '#22C55E' },
};

const PRIORITY_CONFIG: Record<TaskPriority, { label: string; bg: string; text: string; dot: string }> = {
  baixa: { label: 'Baixa', bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
  media: { label: 'Média', bg: '#FFFBEB', text: '#B45309', dot: '#F59E0B' },
  alta:  { label: 'Alta',  bg: '#FFF1F2', text: '#BE123C', dot: '#F43F5E' },
};

export function StatusBadge({ status, size = 'md' }: { status: TaskStatus; size?: 'sm' | 'md' }) {
  const c = STATUS_CONFIG[status];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }, size === 'sm' && styles.sm]}>
      <View style={[styles.dot, { backgroundColor: c.dot }]} />
      <Text style={[styles.text, { color: c.text }, size === 'sm' && styles.textSm]}>{c.label}</Text>
    </View>
  );
}

export function PriorityBadge({ priority, size = 'md' }: { priority: TaskPriority; size?: 'sm' | 'md' }) {
  const c = PRIORITY_CONFIG[priority];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }, size === 'sm' && styles.sm]}>
      <View style={[styles.dot, { backgroundColor: c.dot }]} />
      <Text style={[styles.text, { color: c.text }, size === 'sm' && styles.textSm]}>{c.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 5 },
  sm: { paddingHorizontal: 8, paddingVertical: 3 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  text: { fontSize: 12, fontWeight: '700' },
  textSm: { fontSize: 11 },
});