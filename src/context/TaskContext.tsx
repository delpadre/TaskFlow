import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Task } from '../types/task';
import { taskStorage } from '../services/taskStorage';

interface TaskContextData {
  tasks: Task[];
  isLoading: boolean;
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextData | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    taskStorage.getTasks().then((loaded) => {
      setTasks(loaded);
      setIsLoading(false);
    });
  }, []);

  const addTask = useCallback(async (task: Task) => {
    await taskStorage.addTask(task);
    setTasks((prev) => [...prev, task]);
  }, []);

  const updateTask = useCallback(async (task: Task) => {
    await taskStorage.updateTask(task);
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await taskStorage.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, isLoading, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextData {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskContext must be used within TaskProvider');
  return ctx;
}
