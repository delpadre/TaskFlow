# TaskFlow 📋

> Aplicativo mobile de gerenciamento de tarefas desenvolvido em React Native com Expo e TypeScript.

---

## 📱 Sobre o projeto

O TaskFlow é um app mobile completo para gerenciamento de tarefas pessoais. O usuário pode criar, visualizar, editar e remover tarefas, filtrar por status, personalizar o tema e muito mais — tudo com persistência local e consumo de API externa.

---

## ✨ Funcionalidades

- 🔐 **Autenticação** com login, logout e sessão persistida
- 📋 **CRUD completo** de tarefas
- 🔍 **Filtro** por status (Todas, Pendente, Em andamento, Concluída)
- 💾 **Persistência local** com AsyncStorage
- 🌐 **Consumo de API** para frase motivacional do dia
- 🌙 **Tema dark e light** persistido
- 🎩 **Preferência de tratamento** (Sr., Sra., Srta.)
- 📊 **Dashboard** com resumo de tarefas e progresso

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|------------|-----|
| React Native | Framework mobile |
| Expo | Plataforma de desenvolvimento |
| TypeScript | Tipagem estática |
| React Navigation | Navegação (Stack + Bottom Tabs) |
| AsyncStorage | Persistência local |
| Context API | Estado global |
| Fetch API | Consumo de API externa |

---

## 📁 Estrutura do projeto

```
taskflow/
├── App.tsx
└── src/
    ├── components/
    │   ├── CustomButton.tsx
    │   ├── CustomInput.tsx
    │   ├── EmptyState.tsx
    │   ├── FilterBar.tsx
    │   ├── Header.tsx
    │   ├── StatusBadge.tsx
    │   └── TaskCard.tsx
    ├── context/
    │   ├── AuthContext.tsx
    │   ├── TaskContext.tsx
    │   └── ThemeContext.tsx
    ├── hooks/
    │   └── useTasks.ts
    ├── routes/
    │   ├── AppRoutes.tsx
    │   ├── HomeStackRoutes.tsx
    │   ├── SettingsStackRoutes.tsx
    │   ├── TabRoutes.tsx
    │   └── TaskStackRoutes.tsx
    ├── screens/
    │   ├── home/
    │   │   └── HomeScreen.tsx
    │   ├── login/
    │   │   └── LoginScreen.tsx
    │   ├── settings/
    │   │   └── SettingsScreen.tsx
    │   └── tasks/
    │       ├── TaskDetailScreen.tsx
    │       ├── TaskFormScreen.tsx
    │       └── TaskListScreen.tsx
    ├── services/
    │   ├── api.ts
    │   └── taskStorage.ts
    ├── types/
    │   ├── navigation.ts
    │   ├── task.ts
    │   └── user.ts
    └── utils/
        ├── formatDate.ts
        └── generateId.ts
```

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Expo Go](https://expo.dev/go) instalado no celular
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/delpadre/taskflow.git

# Entre na pasta
cd taskflow

# Instale as dependências
npm install --legacy-peer-deps

# Inicie o projeto
npx expo start
```

### Rodando no celular

1. Instale o **Expo Go** no seu celular
2. Rode `npx expo start` no terminal
3. Escaneie o QR Code com o Expo Go (Android) ou câmera (iOS)

---

## 🔑 Credenciais de acesso

| Usuário | Senha | Perfil | Rota inicial |
|---------|-------|--------|--------------|
| `user` | `123` | Usuário Comum | Home |
| `admin` | `123` | Administrador | Configurações |

---

## 📐 Arquitetura

O projeto segue separação de responsabilidades:

- **screens** → Interface do usuário (UI)
- **components** → Componentes reutilizáveis
- **services** → Comunicação com API e AsyncStorage
- **context** → Estado global com Context API
- **hooks** → Lógica reutilizável (`useTasks`)
- **types** → Tipagem TypeScript
- **utils** → Funções utilitárias

---

## 🗺️ Navegação

```
Login
  └── Main (Bottom Tabs)
        ├── Home (HomeStack)
        │     └── HomeScreen
        ├── Tarefas (TaskStack)
        │     ├── TaskListScreen
        │     ├── TaskFormScreen
        │     └── TaskDetailScreen
        └── Configurações (SettingsStack)
              └── SettingsScreen
```

---

## 📦 Modelo de dados

```typescript
export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida';
export type TaskPriority = 'baixa' | 'media' | 'alta';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  categoryIcon: string;
  createdAt: string;
  updatedAt: string;
}
```

---

## 🌐 APIs utilizadas

| API | Uso |
|-----|-----|
| [Quotable.io](https://api.quotable.io) | Frase motivacional do dia |

---

## 👨‍💻 Integrantes

| Nome | RM |
|------|----|
| Giovanna Franco | 553701 |
| Rafael Del Padre | 552765 |
| Rafael de Almeida | 554019 |


---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.
---
Link do vídeo: https://youtu.be/EpI6BaFzdWM
