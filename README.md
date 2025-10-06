# Front-end (Fork do Pedro) — Digital Twin em Saúde

> Este repositório é o **fork do Pedro** dentro do projeto em grupo de Digital Twin para Saúde. Aqui está a implementação e documentação do **front-end** que comporá a aplicação final, com foco em autenticação, navegação e primeiras telas para visualização de métricas clínicas (glicemia, IMC, batimentos cardíacos, etc.).

## 🎯 Objetivo deste código-fonte

Implementar a **base do front-end** do Digital Twin, cobrindo:

- **Bootstrapping** do projeto com **Vite + React + TypeScript**.
- Definição do **esquema de rotas** usando **React Router**.
- Criação das páginas:
  - `LoginPage.tsx`
  - `RegisterPage.tsx`
  - `LandingPage.tsx`
  - `Dashboard.tsx`

Este módulo será integrado ao projeto final como a **interface web** para autenticação de usuários e visualização das métricas do gêmeo digital.


## 🧩 Tecnologias e decisões

- **Vite** para build/dev server rápidos (React + TypeScript).
- **React Router** para navegação declarativa.
- Organização por **páginas/serviços/hooks** favorecendo coesão e testabilidade.
- (Opcional/no futuro) Biblioteca de UI e client HTTP (ex.: fetch nativo).

## 🗂️ Estrutura do projeto



## 🧭 Rotas e navegação

- `/landing-page` → **LandingPage** (apresentação).
- `/login` → **LoginPage** (autenticação do usuário).
- `/register` → **RegisterPage** (criação de conta).
- `/dashboard` → **Dashboard** (métricas do Digital Twin; rota protegida).

```tsx
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  )
}
```

## 🧱 Páginas implementadas

- **LandingPage.tsx** — Introduz o conceito de Digital Twin em Saúde;
- **LoginPage.tsx** — Formulário de autenticação; 
- **RegisterPage.tsx** — Criação de usuário;  
- **Dashboard.tsx** — Exibe **métricas mais recentes** (glicemia, IMC, batimentos);

## ⚙️ Configuração & execução

### Pré-requisitos
- Node.js LTS (≥ 18 recomendado)

### Instalação e scripts

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev

# build para produção
npm run build

# preview do build
npm run preview
```

## 🚧 Próximos passos

1. Integrar processo de criação de usuário
2. integrar processo de autenticação do usuário
3. integrar com um banco de dados real.

## 🤝 Contribuição neste fork

- Este fork concentra o **escopo de front-end**.
- Criação da arquitetura de páginas e o que cada uma deve conter

## 🧾 Licença

Herdada do repositório central da organização.

---

**Resumo:** este fork entrega a **base funcional do front-end** (Vite + React + TS + React Router) com as páginas essenciais e exibição inicial de métricas (glicemia, IMC, batimentos).
