<<<<<<< HEAD
# TaskFlow 📋

Aplicativo mobile de gerenciamento de tarefas — React Native + Expo + TypeScript.

---

## 🚀 Como rodar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Expo CLI: `npm install -g expo-cli`
- App **Expo Go** no celular (iOS ou Android)

### Instalação

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor
npx expo start

# 3. Escaneie o QR Code com o Expo Go
```

### Credenciais de acesso

| Usuário | Senha | Papel | Rota inicial |
|---------|-------|-------|--------------|
| `admin` | `123` | Administrador | Configurações |
| `user`  | `123` | Usuário Comum | Home |

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
    │   ├── TabRoutes.tsx
    │   └── TaskStackRoutes.tsx
    ├── screens/
    │   ├── home/HomeScreen.tsx
    │   ├── login/LoginScreen.tsx
    │   ├── settings/SettingsScreen.tsx
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

## ✅ Funcionalidades implementadas

### Autenticação
- [x] Login com credenciais hardcoded
- [x] Persistência da sessão com AsyncStorage
- [x] Logout com confirmação
- [x] Redirecionamento por perfil (admin → Settings, user → Home)

### Tarefas (CRUD)
- [x] Criar tarefa com título, descrição, status, prioridade e categoria
- [x] Listar tarefas com FlatList
- [x] Visualizar detalhes da tarefa
- [x] Editar tarefa existente
- [x] Excluir tarefa com confirmação
- [x] Filtrar por status (Todas / Pendente / Em andamento / Concluída)
- [x] Persistência local com AsyncStorage

### Navegação
- [x] Stack Navigation + Bottom Tab Navigation
- [x] Fluxo: Login → Tabs (Home / Tarefas / Configurações)
- [x] TaskStack: Lista → Detalhe → Edição

### Consumo de API
- [x] Frase motivacional do dia (api.quotable.io)
- [x] Categorias de tarefas (dummyjson.com)
- [x] Tratamento de loading e erro
- [x] Fallback offline para ambas as APIs

### Context API
- [x] `AuthContext` — autenticação e tratamento
- [x] `TaskContext` — CRUD de tarefas
- [x] `ThemeContext` — tema claro/escuro

### Hooks customizados
- [x] `useTasks` — filtro, CRUD e busca por ID

### UI/UX
- [x] Tema claro e escuro persistido
- [x] Header com nome, perfil e botão de logout
- [x] Empty state na lista
- [x] Badges de status e prioridade com cores
- [x] FAB para criar tarefa
- [x] Resumo de tarefas na Home
- [x] Configurações: tema + preferência de tratamento + perfil

### TypeScript
- [x] Sem `any` — tipagem completa
- [x] Props, estados, contextos, navegação e API tipados

---

## 🔧 Tecnologias

- **React Native** + **Expo** (~51)
- **TypeScript** (strict mode)
- **React Navigation** (Stack + Bottom Tabs)
- **AsyncStorage** (persistência local)
- **fetch** nativo (consumo de API)

---

## 🧑‍💻 Integrantes

| Nome | RM |
|------|----|
|      |    |
|      |    |
|      |    |

> Preencha com os dados do grupo antes de entregar.
=======
# TaskFlow
>>>>>>> c6180c52d89b13239c2d14ab0631e64d3e97f684
