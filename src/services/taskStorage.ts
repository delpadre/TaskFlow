import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const TASKS_KEY = '@taskflow:tasks';

export const taskStorage = {
  async getTasks(): Promise<Task[]> {
    try {
      const data = await AsyncStorage.getItem(TASKS_KEY);
      return data ? (JSON.parse(data) as Task[]) : [];
    } catch {
      return [];
    }
  },

  async saveTasks(tasks: Task[]): Promise<void> {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  async addTask(task: Task): Promise<void> {
    const tasks = await this.getTasks();
    tasks.push(task);
    await this.saveTasks(tasks);
  },

  async updateTask(updatedTask: Task): Promise<void> {
    const tasks = await this.getTasks();
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      await this.saveTasks(tasks);
    }
  },

  async deleteTask(taskId: string): Promise<void> {
    const tasks = await this.getTasks();
    const filtered = tasks.filter((t) => t.id !== taskId);
    await this.saveTasks(filtered);
  },
};
