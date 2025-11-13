FROM node:24-alpine

# diretório de trabalho dentro do container
WORKDIR /digital-twin

# copiar package.json e lockfile primeiro (melhor para cache)
# usar package-lock.json (pnpm-lock.yaml não existe neste repo)
COPY package.json package-lock.json ./

# instalar dependências
RUN npm install

# copiar o restante do projeto
COPY . .

# expor a porta configurada no server
EXPOSE 5000

# comando para rodar o servidor
CMD ["node", "server.js"]
