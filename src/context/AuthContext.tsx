import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Treatment } from '../types/user';

const AUTH_KEY = '@taskflow:user';
const TREATMENT_KEY = '@taskflow:treatment';

const USERS: User[] = [
  { id: 1, username: 'admin', password: '123', role: 'admin', name: 'Administrador' },
  { id: 2, username: 'user', password: '123', role: 'user', name: 'Usuário Comum' },
];

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  treatment: Treatment;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setTreatment: (t: Treatment) => Promise<void>;
}

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [treatment, setTreatmentState] = useState<Treatment>('');

  useEffect(() => {
    (async () => {
      try {
        const [savedUser, savedTreatment] = await Promise.all([
          AsyncStorage.getItem(AUTH_KEY),
          AsyncStorage.getItem(TREATMENT_KEY),
        ]);
        if (savedUser) setUser(JSON.parse(savedUser) as User);
        if (savedTreatment) setTreatmentState(savedTreatment as Treatment);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    const found = USERS.find((u) => u.username === username && u.password === password);
    if (!found) return false;
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(found));
    setUser(found);
    return true;
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  const setTreatment = useCallback(async (t: Treatment) => {
    await AsyncStorage.setItem(TREATMENT_KEY, t);
    setTreatmentState(t);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, treatment, login, logout, setTreatment }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
