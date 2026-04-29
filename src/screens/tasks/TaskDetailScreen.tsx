import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../context/ThemeContext';
import { StatusBadge, PriorityBadge } from '../../components/StatusBadge';
import { CustomButton } from '../../components/CustomButton';
import { formatDate } from '../../utils/formatDate';
import { TaskStackParamList } from '../../types/navigation';

type TaskDetailScreenProps = NativeStackScreenProps<TaskStackParamList, 'TaskDetail'>;

export function TaskDetailScreen({ route, navigation }: TaskDetailScreenProps) {
  const { taskId } = route.params;
  const { theme } = useTheme();
  const { getTaskById, deleteTask } = useTasks();

  const task = getTaskById(taskId);

  if (!task) {
    return (
      <View style={[styles.screen, styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.notFound, { color: theme.textSecondary }]}>Tarefa não encontrada.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.back, { color: theme.primary }]}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Excluir tarefa',
      `Deseja excluir "${task.title}"? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteTask(task.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      {/* Nav */}
      <View style={[styles.navBar, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[styles.backIcon, { color: theme.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.navTitle, { color: theme.text }]}>Detalhes</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('TaskForm', { taskId: task.id })}
          style={styles.editBtn}
        >
          <Text style={[styles.editText, { color: theme.primary }]}>✏️ Editar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category header */}
        <View style={[styles.categoryHeader, { backgroundColor: theme.primaryLight }]}>
          <Text style={styles.categoryIconLg}>{task.categoryIcon}</Text>
          <Text style={[styles.categoryName, { color: theme.primary }]}>{task.category}</Text>
        </View>

        {/* Title */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>Título</Text>
          <Text style={[styles.title, { color: theme.text }]}>{task.title}</Text>
        </View>

        {/* Description */}
        {task.description ? (
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>Descrição</Text>
            <Text style={[styles.description, { color: theme.text }]}>{task.description}</Text>
          </View>
        ) : null}

        {/* Status & Priority */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.badgeRow}>
            <View style={styles.badgeCol}>
              <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>Status</Text>
              <StatusBadge status={task.status} />
            </View>
            <View style={styles.badgeCol}>
              <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>Prioridade</Text>
              <PriorityBadge priority={task.priority} />
            </View>
          </View>
        </View>

        {/* Dates */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.dateRow}>
            <View style={styles.dateCol}>
              <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>📅 Criado em</Text>
              <Text style={[styles.dateValue, { color: theme.text }]}>{formatDate(task.createdAt)}</Text>
            </View>
            <View style={styles.dateCol}>
              <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>🔄 Atualizado</Text>
              <Text style={[styles.dateValue, { color: theme.text }]}>{formatDate(task.updatedAt)}</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <CustomButton
            title="✏️  Editar tarefa"
            onPress={() => navigation.navigate('TaskForm', { taskId: task.id })}
            style={styles.actionBtn}
          />
          <CustomButton
            title="🗑️  Excluir tarefa"
            onPress={handleDelete}
            variant="danger"
            style={styles.actionBtn}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },
  notFound: { fontSize: 16, marginBottom: 16 },
  back: { fontSize: 16 },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backBtn: { width: 40, alignItems: 'flex-start' },
  backIcon: { fontSize: 24 },
  navTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700' },
  editBtn: { width: 80, alignItems: 'flex-end' },
  editText: { fontSize: 14, fontWeight: '600' },
  content: { padding: 16, paddingBottom: 40 },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    gap: 10,
  },
  categoryIconLg: { fontSize: 32 },
  categoryName: { fontSize: 18, fontWeight: '700' },
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  fieldLabel: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.5 },
  title: { fontSize: 20, fontWeight: '700', lineHeight: 28 },
  description: { fontSize: 15, lineHeight: 22 },
  badgeRow: { flexDirection: 'row', gap: 16 },
  badgeCol: { flex: 1 },
  dateRow: { flexDirection: 'row', gap: 16 },
  dateCol: { flex: 1 },
  dateValue: { fontSize: 13, fontWeight: '500' },
  actions: { gap: 12, marginTop: 8 },
  actionBtn: {},
});
