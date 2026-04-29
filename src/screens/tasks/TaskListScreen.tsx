import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';


import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';
import { FilterBar } from '../../components/FilterBar';
import { TaskCard } from '../../components/TaskCard';
import { EmptyState } from '../../components/EmptyState';
import { Task } from '../../types/task';

type Props = NativeStackScreenProps<any, 'TaskList'>;

export function TaskListScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const { filteredTasks, filter, setFilter, isLoading } = useTasks();

  const total = filteredTasks.length;

  const renderItem = ({ item }: { item: Task }) => (
    <TaskCard
      task={item}
      onPress={() =>
        navigation.navigate('TaskDetail', { taskId: item.id })
      }
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.screen}>

        {/* HEADER */}
        <Header title="Tarefas" />

        {/* HERO */}
        <View style={[styles.hero, { backgroundColor: theme.primary }]}>
          <View style={styles.heroCircle1} />
          <View style={styles.heroCircle2} />

          <Text style={styles.heroTitle}>Suas tarefas</Text>
          <Text style={styles.heroSubtitle}>
            {total === 0
              ? 'Nenhuma tarefa encontrada'
              : `${total} ${total === 1 ? 'tarefa' : 'tarefas'} disponíveis`}
          </Text>
        </View>

        {/* FILTER */}
        <View style={styles.filterWrapper}>
          <FilterBar
            activeFilter={filter}
            onFilterChange={setFilter}
          />
        </View>

        {/* CONTENT */}
        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
              Carregando tarefas...
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={[
              styles.list,
              filteredTasks.length === 0 && styles.emptyContainer,
            ]}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* EMPTY */}
        {!isLoading && filteredTasks.length === 0 && (
          <View style={styles.emptyOverlay}>
            <EmptyState
              icon="📭"
              title="Nenhuma tarefa"
              description={
                filter === 'todas'
                  ? 'Crie sua primeira tarefa'
                  : `Nenhuma tarefa em "${filter}"`
              }
              actionLabel={filter === 'todas' ? 'Criar tarefa' : undefined}
              onAction={
                filter === 'todas'
                  ? () => navigation.navigate('TaskForm', {})
                  : undefined
              }
            />
          </View>
        )}

        {/* FAB */}
        <TouchableOpacity
          style={[
            styles.fab,
            {
              backgroundColor: theme.primary,
              shadowColor: theme.primary,
            },
          ]}
          onPress={() => navigation.navigate('TaskForm', {})}
          activeOpacity={0.9}
        >
          <Text style={styles.fabIcon}>＋</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },

  /* HERO */
  hero: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 24,
    padding: 20,
    overflow: 'hidden',
  },

  heroCircle1: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  heroCircle2: {
    position: 'absolute',
    bottom: -10,
    right: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  heroTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
  },

  heroSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginTop: 4,
  },

  /* FILTER */
  filterWrapper: {
    paddingHorizontal: 16,
    marginTop: 12,
  },

  /* LIST */
  list: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 120,
    gap: 12,
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  /* LOADING */
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
  },

  /* EMPTY */
  emptyOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  /* FAB */
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',

    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  fabIcon: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '600',
  },
});