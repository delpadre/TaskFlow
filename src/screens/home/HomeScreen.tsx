import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useTaskContext } from '../../context/TaskContext';
import { Header } from '../../components/Header';
import { api } from '../../services/api';
import { Quote } from '../../services/api';
import { Pressable } from 'react-native';


type Props = BottomTabScreenProps<TabParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { user, treatment } = useAuth();
  const { theme } = useTheme();
  const { tasks } = useTaskContext();
  const insets = useSafeAreaInsets();

  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState(false);

  useEffect(() => { loadQuote(); }, []);

  const loadQuote = async () => {
    setQuoteLoading(true);
    setQuoteError(false);
    try {
      setQuote(await api.getMotivationalQuote());
    } catch {
      setQuoteError(true);
    } finally {
      setQuoteLoading(false);
    }
  };

  const done      = tasks.filter(t => t.status === 'concluida').length;
  const pending   = tasks.filter(t => t.status === 'pendente').length;
  const inProgress= tasks.filter(t => t.status === 'em_andamento').length;
  const total     = tasks.length;
  const progress  = total === 0 ? 0 : Math.round((done / total) * 100);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  const greetingEmoji = hour < 12 ? '🌅' : hour < 18 ? '☀️' : '🌙';

  const displayName = `${treatment ? treatment + ' ' : ''}${user?.name ?? ''}`;
  const initials = user?.name.split(' ').map(n => n[0]).slice(0, 2).join('') ?? '';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Header title="Dashboard" />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >

        {/* ── HERO ── */}
        <View style={[styles.hero, { backgroundColor: theme.primary }]}>
          {/* Decorative circles */}
          <View style={styles.heroCircle1} />
          <View style={styles.heroCircle2} />

          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroGreeting}>{greeting} {greetingEmoji}</Text>
              <Text style={styles.heroName}>{displayName}</Text>
              <Text style={styles.heroSub}>
                {total === 0
                  ? 'Nenhuma tarefa ainda'
                  : `${done} de ${total} ${total === 1 ? 'tarefa concluída' : 'tarefas concluídas'}`}
              </Text>
            </View>
            <View style={styles.heroAvatarWrapper}>
              <View style={styles.heroAvatar}>
                <Text style={styles.heroAvatarText}>{initials}</Text>
              </View>
            </View>
          </View>

          {/* Progress bar inside hero */}
          <View style={styles.heroProgressContainer}>
            <View style={styles.heroProgressRow}>
              <Text style={styles.heroProgressLabel}>Progresso geral</Text>
              <Text style={styles.heroProgressPct}>{progress}%</Text>
            </View>
            <View style={styles.heroTrack}>
              <View style={[styles.heroFill, { width: `${progress}%` }]} />
            </View>
          </View>
        </View>

        {/* ── STATS ROW ── */}
        <View style={styles.statsRow}>
          {[
            { label: 'Pendentes',    value: pending,    icon: '📎', color: theme.warning,  bg: '#FFFBEB' },
            { label: 'Andamento',    value: inProgress, icon: '🔥', color: theme.primary,  bg: '#F0FDF4' },
            { label: 'Concluídas',   value: done,       icon: '🎯', color: theme.success,  bg: '#F0FDF4' },
          ].map(s => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={[styles.statIconBg, { backgroundColor: s.bg }]}>
                <Text style={styles.statIcon}>{s.icon}</Text>
              </View>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: theme.text }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* ── QUICK ACTIONS ── */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Ações rápidas</Text>
        <View style={styles.actionsRow}>
          <Pressable
  onPress={() => navigation.navigate('Tasks')}
  style={({ pressed }) => [
    styles.actionPrimary,
    {
      backgroundColor: theme.primary,
      shadowColor: theme.primary,
      transform: [{ scale: pressed ? 0.97 : 1 }],
      opacity: pressed ? 0.9 : 1,
    },
  ]}
>
  <Text style={styles.actionPrimaryIcon}>📋</Text>
  <Text style={styles.actionPrimaryLabel}>Ver tarefas</Text>
</Pressable>

          <Pressable
  onPress={() => navigation.navigate('Tasks')}
  style={({ pressed }) => [
    styles.actionSecondary,
    {
      backgroundColor: theme.card,
      borderColor: theme.border,
      transform: [{ scale: pressed ? 0.97 : 1 }],
      opacity: pressed ? 0.9 : 1,
    },
  ]}
>
  <Text style={styles.actionSecondaryIcon}>➕</Text>
  <Text style={[styles.actionSecondaryLabel, { color: theme.text }]}>Nova tarefa</Text>
</Pressable>
        </View>

        {/* ── QUOTE ── */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Inspiração do dia</Text>
        <View style={[styles.quoteCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={[styles.quoteBulb, { backgroundColor: theme.primaryLight }]}>
            <Text style={{ fontSize: 22 }}>💡</Text>
          </View>

          {quoteLoading ? (
            <ActivityIndicator color={theme.primary} style={{ marginVertical: 16, flex: 1 }} />
          ) : quoteError ? (
            <View style={styles.quoteError}>
              <Text style={[styles.quoteErrorText, { color: theme.textSecondary }]}>
                Não foi possível carregar.
              </Text>
              <TouchableOpacity onPress={loadQuote}>
                <Text style={[styles.retryText, { color: theme.primary }]}>Tentar novamente</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.quoteBody}>
              <Text style={[styles.quoteText, { color: theme.text }]}>
                "{quote?.content}"
              </Text>
              <Text style={[styles.quoteAuthor, { color: theme.primary }]}>
                — {quote?.author}
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    gap: 16,
    paddingTop: 8,
  },

  /* Hero */
  hero: {
    borderRadius: 28,
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  heroCircle1: {
    position: 'absolute', top: -30, right: -30,
    width: 130, height: 130, borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  heroCircle2: {
    position: 'absolute', bottom: -20, right: 60,
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  heroGreeting: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  heroName: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 13,
  },
  heroAvatarWrapper: {
    padding: 3,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  heroAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  heroProgressContainer: {},
  heroProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  heroProgressLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    fontWeight: '600',
  },
  heroProgressPct: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  heroTrack: {
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  heroFill: {
    height: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },

  /* Stats */
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    gap: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconBg: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statIcon: { fontSize: 18 },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    textAlign: 'center',
  },

  /* Section title */
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginBottom: -4,
  },

  /* Actions */
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionPrimary: {
    flex: 2,
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  actionPrimaryIcon: { fontSize: 26 },
  actionPrimaryLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  actionSecondary: {
    flex: 1,
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
  },
  actionSecondaryIcon: { fontSize: 26 },
  actionSecondaryLabel: {
    fontSize: 13,
    fontWeight: '700',
  },

  /* Quote */
  quoteCard: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  quoteBulb: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  quoteBody: { flex: 1 },
  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 12,
    fontWeight: '800',
  },
  quoteError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  quoteErrorText: { fontSize: 13 },
  retryText: { fontSize: 13, fontWeight: '700' },
});