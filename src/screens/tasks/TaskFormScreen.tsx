import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../context/ThemeContext';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { Header } from '../../components/Header';
import { api } from '../../services/api';

import { Category, TaskPriority, TaskStatus } from '../../types/task';
import { TaskStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskForm'>;

export function TaskFormScreen({ route, navigation }: Props) {
  const { taskId } = route.params ?? {};
  const isEditing = !!taskId;

  const { theme } = useTheme();
  const { addTask, updateTask, getTaskById } = useTasks();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('pendente');
  const [priority, setPriority] = useState<TaskPriority>('media');
  const [category, setCategory] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('📦');

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (!isEditing) return;

    const task = getTaskById(taskId);
    if (task) {
      setTitle(task.title ?? '');
      setDescription(task.description ?? '');
      setStatus(task.status ?? 'pendente');
      setPriority(task.priority ?? 'media');
      setCategory(task.category ?? '');
      setCategoryIcon(task.categoryIcon ?? '📦');
    }
  }, [taskId]);

  useEffect(() => {
    api.getCategories().then((cats) => {
      setCategories(cats);
      setCategoriesLoading(false);

      if (!isEditing && cats.length > 0) {
        setCategory(cats[0].name);
        setCategoryIcon(cats[0].icon);
      }
    });
  }, []);

  const validate = () => {
    if (!title.trim()) {
      setTitleError('O título é obrigatório.');
      return false;
    }
    setTitleError('');
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);

    try {
      const existing = isEditing ? getTaskById(taskId) : null;

      const updatedTask = {
        id: taskId ?? Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        category,
        categoryIcon,
        createdAt: existing?.createdAt ?? new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (isEditing) {
        await updateTask(updatedTask);
      } else {
        await addTask(updatedTask);
      }

      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Header title={isEditing ? 'Editar tarefa' : 'Nova tarefa'} />

        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: insets.bottom + 24 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* HERO */}
          <View
            style={[
              styles.hero,
              {
                backgroundColor: theme.primary,
                marginTop: 8,
                paddingTop: 24,
              },
            ]}
          >
            <Text style={styles.heroTitle}>
              {isEditing ? 'Editando tarefa' : 'Criando nova tarefa'}
            </Text>

            <Text style={styles.heroSubtitle}>
              Organize melhor seu dia 🚀
            </Text>
          </View>

          {/* INPUTS */}
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <CustomInput
              label="Título *"
              value={title}
              onChangeText={(v) => {
                setTitle(v);
                setTitleError('');
              }}
              error={titleError}
            />

            <CustomInput
              label="Descrição"
              value={description}
              onChangeText={setDescription}
              multiline
              style={{ height: 100 }}
            />
          </View>

          {/* STATUS */}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Status
          </Text>

          <View style={styles.row}>
            {['pendente', 'em_andamento', 'concluida'].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setStatus(s as TaskStatus)}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      status === s ? theme.primary : theme.card,
                  },
                ]}
              >
                <Text style={{ color: status === s ? '#fff' : theme.text }}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>


          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Prioridade
          </Text>

          <View style={styles.row}>
            {['baixa', 'media', 'alta'].map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPriority(p as TaskPriority)}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      priority === p ? theme.primary : theme.card,
                  },
                ]}
              >
                <Text style={{ color: priority === p ? '#fff' : theme.text }}>
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>


          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Categoria
          </Text>

          {categoriesLoading ? (
            <ActivityIndicator color={theme.primary} />
          ) : (
            <View style={styles.row}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.name}
                  onPress={() => {
                    setCategory(cat.name);
                    setCategoryIcon(cat.icon);
                  }}
                  style={[
                    styles.chip,
                    {
                      backgroundColor:
                        category === cat.name
                          ? theme.primaryLight
                          : theme.card,
                    },
                  ]}
                >
                  <Text style={{ color: theme.text }}>
                    {cat.icon} {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* BUTTON */}
          <CustomButton
            title={isEditing ? 'Salvar' : 'Criar tarefa'}
            onPress={handleSave}
            loading={saving}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    gap: 16,
    paddingTop: 8,
  },

  hero: {
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  heroTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
  },

  heroSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    marginTop: 6,
    fontSize: 13,
  },

  card: {
    borderRadius: 22,
    padding: 16,
    gap: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
});