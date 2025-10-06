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


# BACKEND

# 🏥 Medical API - Sistema de Gerenciamento de Pacientes e Dispositivos

Este projeto é uma **API RESTful** desenvolvida com **Node.js** e **Express**, com o objetivo de gerenciar **pacientes**, **dispositivos médicos**, **sinais vitais** e **simulações**.  
Toda a documentação da API é feita com **Swagger**, permitindo fácil exploração e teste das rotas.

O objetivo desse projeto é que seja o backend do projeto Digital-Twin que está sendo desenvolvido.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript.
- **Express.js** – Framework para criação de APIs RESTful.
- **Swagger UI Express** – Documentação interativa das rotas.

---

## 🧩 Estrutura de Pastas
📦 projeto-medical-api 

├── 📁 controllers

│ ├── patientController.js

│ ├── deviceController.js

│ ├── vitalController.js

│ └── simulationController.js

│

├── 📁 models

│ ├── patientModel.js

│ ├── deviceModel.js

│ ├── vitalModel.js

│ └── simulationModel.js

│

├── 📁 routes

│ ├── patientRoutes.js

│ ├── deviceRoutes.js

│ ├── vitalRoutes.js

│ └── simulationRoutes.js

│

├── 📁 config

│ └── swagger.js

│

├── index.js

├── server.js

└── package.json


---

## ⚙️ Configuração do Projeto

### Instalar dependências

```bash
npm install express swagger-ui-express nodemon
```


### Rodar o servidor
```
npm run dev

"scripts": {
  "dev": "node server.js"
}

```

📜 Estrutura dos Arquivos
🔹 server.js
```
Responsável por inicializar o servidor e configurar o Swagger.
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swagger.js";

import patientRoutes from "./routes/patientRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import vitalRoutes from "./routes/vitalRoutes.js";
import simulationRoutes from "./routes/simulationRoutes.js";

const app = express();
app.use(express.json());

// Rotas principais
app.use("/patients", patientRoutes);
app.use("/devices", deviceRoutes);
app.use("/vitals", vitalRoutes);
app.use("/simulations", simulationRoutes);
```

// Documentação Swagger
```
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
```

🧠 Conceito: MVC (Model-View-Controller)

O projeto segue uma arquitetura MVC simplificada, separando responsabilidades:

Models → Estrutura de dados (como um "mini banco").

Controllers → Regras de negócio e manipulação de dados.

Routes → Endpoints da API e integração com Swagger.

🩺 Exemplo: Patient Routes

As rotas de pacientes (/patients) permitem:|  Método  | Rota            | Descrição                |
| :------: | :-------------- | :----------------------- |
|   `GET`  | `/patients`     | Lista todos os pacientes |
|  `POST`  | `/patients`     | Cria um novo paciente    |
|   `PUT`  | `/patients/:id` | Atualiza um paciente     |
| `DELETE` | `/patients/:id` | Remove um paciente       |


Exemplo de Schema (Swagger)
```
components:
  schemas:
    Patient:
      type: object
      required:
        - name
        - age
      properties:
        id:
          type: integer
          description: ID do paciente
        name:
          type: string
          description: Nome do paciente
        age:
          type: integer
          description: Idade do paciente

```
🧩 Outros Recursos

O mesmo padrão de CRUD foi aplicado às entidades:
| Entidade          | Arquivo                                           | Descrição                         |
| :---------------- | :------------------------------------------------ | :-------------------------------- |
| **Pacientes**     | `patientController.js` / `patientRoutes.js`       | Gerencia pacientes                |
| **Dispositivos**  | `deviceController.js` / `deviceRoutes.js`         | Gerencia dispositivos médicos     |
| **Sinais Vitais** | `vitalController.js` / `vitalRoutes.js`           | Gerencia medições de saúde        |
| **Simulações**    | `simulationController.js` / `simulationRoutes.js` | Gera dados de simulações clínicas |


🧭 Documentação Swagger

Após iniciar o servidor, acesse:
```
👉 http://localhost:3000/api-docs
```
Lá você pode visualizar todas as rotas com descrições, parâmetros e exemplos de respostas.


💾 Models

Os models funcionam como simulações de tabelas de banco de dados, contendo dados e estrutura de cada entidade.

Exemplo (models/patientModel.js):
```

export const patients = [
  { id: 1, name: "João Silva", age: 32 },
  { id: 2, name: "Maria Souza", age: 28 },
];

```

🔄 Controllers

Os controllers contêm a lógica das operações CRUD.

Exemplo (controllers/patientController.js):
```
import { patients } from "../models/patientModel.js";

export const getAllPatients = (req, res) => res.json(patients);

export const createPatient = (req, res) => {
  const newPatient = { id: patients.length + 1, ...req.body };
  patients.push(newPatient);
  res.status(201).json(newPatient);
};
```

🧰 Rotas (Routers)

As routes conectam o Express às funções do controller.

Exemplo (routes/patientRoutes.js):
```
import express from "express";
import {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

const router = express.Router();

router.get("/", getAllPatients);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;

```




