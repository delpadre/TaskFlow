import { useMemo, useState } from 'react';
import { Task, TaskFilter } from '../types/task';
import { useTaskContext } from '../context/TaskContext';
import { generateId } from '../utils/generateId';

interface UseTasksReturn {
  tasks: Task[];
  filteredTasks: Task[];
  filter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
  isLoading: boolean;
  addTask: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
}

export function useTasks(): UseTasksReturn {
  const { tasks, isLoading, addTask: ctxAdd, updateTask: ctxUpdate, deleteTask: ctxDelete } = useTaskContext();
  const [filter, setFilter] = useState<TaskFilter>('todas');

  const filteredTasks = useMemo(() => {
    if (filter === 'todas') return tasks;
    return tasks.filter((t) => t.status === filter);
  }, [tasks, filter]);

  const addTask = async (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const task: Task = { ...data, id: generateId(), createdAt: now, updatedAt: now };
    await ctxAdd(task);
  };

  const updateTask = async (task: Task) => {
    const updated: Task = { ...task, updatedAt: new Date().toISOString() };
    await ctxUpdate(updated);
  };

  const deleteTask = async (id: string) => {
    await ctxDelete(id);
  };

  const getTaskById = (id: string) => tasks.find((t) => t.id === id);

  return { tasks, filteredTasks, filter, setFilter, isLoading, addTask, updateTask, deleteTask, getTaskById };
}
