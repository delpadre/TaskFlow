import { NavigatorScreenParams } from '@react-navigation/native';

export type TaskStackParamList = {
  TaskList: undefined;
  TaskForm: { taskId?: string } | undefined;
  TaskDetail: { taskId: string };
};

export type TabParamList = {
  Home: undefined;
  Tasks: NavigatorScreenParams<TaskStackParamList> | undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<TabParamList> | undefined;
};
