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
