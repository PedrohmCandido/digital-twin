# Digital Twin - Projeto de Desenvolvimento Web

## Objetivo do Projeto
O projeto **Digital Twin** tem como principal objetivo atuar como uma **ferramenta de monitoramento e análise de indicadores de saúde**. 

O sistema permite que o usuário realize o **cadastro** e, em seguida, insira dados de seus exames (como frequência cardíaca, colesterol, glicemia, etc.). A função da aplicação é **analisar** esses resultados, informando os **níveis de risco** associados a cada indicador e emitindo **alertas personalizados** sobre pontos que requerem maior atenção ou acompanhamento médico.

## Tecnologias Utilizadas e Implementadas
A arquitetura do projeto foi pensada para ser modular e escalável, utilizando as seguintes tecnologias e separando as responsabilidades de **Frontend** e **Backend**:

### Frontend (Interface do Usuário)
| Categoria | Tecnologia | Detalhes da Implementação |
| :--- | :--- | :--- |
| **Framework** | **React** | Utilizado para a construção de componentes da interface e gerenciar o estado da aplicação de forma dinâmica e reativa, criando uma visualização clara dos indicadores. |
| **Linguagem** | **TypeScript** | Adotado para tipagem estática do código, aumentando a robustez, facilitando a manutenção e reduzindo erros em tempo de desenvolvimento. |

### Backend (Serviço/API)
| Categoria | Tecnologia | Detalhes da Implementação |
| :--- | :--- | :--- |
| **Ambiente** | **Node.js** | Ambiente de execução que serve como base para a nossa API, responsável por toda a lógica de negócio, persistência de dados e comunicação com o motor de análise. |
| **Linguagem** | **JavaScript / TypeScript** | Utilização da sintaxe Node.js para desenvolver os *endpoints* da API. |

### Containerização e Distribuição
| Categoria | Tecnologia | Detalhes da Implementação |
| :--- | :--- | :--- |
| **Containerização** | **Docker** | Utilizamos o Docker para **empacotar** o Frontend e o Backend em **contêineres** separados, garantindo que a aplicação rode de maneira idêntica em qualquer ambiente. |

## Arquitetura da Aplicação
O projeto adota uma arquitetura de aplicação **distribuída**, separando o **serviço (Backend)** da **interface (Frontend)**. Essa separação permite que cada parte seja desenvolvida, implantada e escalada de forma independente. O Frontend se comunica com o Backend através de chamadas **RESTful API** para cadastro de usuários e envio/recebimento dos dados de saúde para análise.


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
