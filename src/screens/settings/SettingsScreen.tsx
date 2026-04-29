import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // 🔥 IMPORTANTE
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';
import { Treatment } from '../../types/user';

const TREATMENTS: Treatment[] = ['', 'Sr.', 'Sra.', 'Srta.'];
const TREATMENT_LABELS: Record<Treatment, string> = {
  '': 'Nenhum',
  'Sr.': 'Sr. (Senhor)',
  'Sra.': 'Sra. (Senhora)',
  'Srta.': 'Srta. (Senhorita)',
};

export function SettingsScreen() {
  const { user, treatment, setTreatment } = useAuth();
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      
      <Header title="Configurações" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* Profile */}
        <SectionTitle title="👤 Perfil" theme={theme} />
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <InfoRow label="Nome" value={user?.name ?? ''} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Usuário" value={`@${user?.username}`} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Perfil" value={user?.role === 'admin' ? '⚙️ Administrador' : '👤 Usuário'} theme={theme} />
        </View>

        {/* Treatment */}
        <SectionTitle title="🎩 Preferência de tratamento" theme={theme} />
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {TREATMENTS.map((t, i) => (
            <React.Fragment key={t || 'none'}>
              <TouchableOpacity
                onPress={() => setTreatment(t)}
                style={styles.treatmentRow}
                activeOpacity={0.7}
              >
                <Text style={[styles.treatmentLabel, { color: theme.text }]}>
                  {TREATMENT_LABELS[t]}
                </Text>

                <View
                  style={[
                    styles.radio,
                    {
                      borderColor: treatment === t ? theme.primary : theme.border,
                      backgroundColor: treatment === t ? theme.primary : 'transparent',
                    },
                  ]}
                >
                  {treatment === t && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>

              {i < TREATMENTS.length - 1 && <Divider theme={theme} />}
            </React.Fragment>
          ))}
        </View>

        {/* Theme */}
        <SectionTitle title="🎨 Aparência" theme={theme} />
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.themeRow}>
            <View style={styles.themeLeft}>
              <Text style={styles.themeIcon}>
                {isDark ? '🌙' : '☀️'}
              </Text>

              <View>
                <Text style={[styles.themeTitle, { color: theme.text }]}>
                  Tema {isDark ? 'escuro' : 'claro'}
                </Text>

                <Text style={[styles.themeSub, { color: theme.textSecondary }]}>
                  Salvo automaticamente
                </Text>
              </View>
            </View>

            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* About */}
        <SectionTitle title="ℹ️ Sobre o app" theme={theme} />
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <InfoRow label="App" value="TaskFlow" theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Versão" value="1.0.0" theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Plataforma" value="React Native + Expo" theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Estado" value="Context API" theme={theme} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ title, theme }: { title: string; theme: ReturnType<typeof useTheme>['theme'] }) {
  return <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{title}</Text>;
}

function InfoRow({ label, value, theme }: { label: string; value: string; theme: ReturnType<typeof useTheme>['theme'] }) {
  return (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

function Divider({ theme }: { theme: ReturnType<typeof useTheme>['theme'] }) {
  return <View style={[styles.divider, { backgroundColor: theme.border }]} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },

  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 18,
    marginBottom: 8,
  },

  card: {
    borderRadius: 16, // 🔥 mantém estável (evita shadow bug em alguns devices)
    borderWidth: 1,
    overflow: 'hidden',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  infoLabel: {
    fontSize: 13,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    marginHorizontal: 16,
  },

  treatmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  treatmentLabel: {
    fontSize: 14,
    fontWeight: '500',
  },

  radio: {
    width: 20, // 🔥 levemente menor (mais clean)
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },

  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // 🔥 reduzido pra estabilidade
  },

  themeIcon: {
    fontSize: 24,
  },

  themeTitle: {
    fontSize: 14,
    fontWeight: '600',
  },

  themeSub: {
    fontSize: 12,
    marginTop: 2,
    opacity: 0.7,
  },
});
''