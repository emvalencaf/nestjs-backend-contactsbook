FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Copie o entrypoint script para o contêiner
COPY backend-entrypoint.sh /usr/local/bin/backend-entrypoint.sh

# Remova as terminações de linha do estilo Windows e conceda permissão de execução
RUN sed -i 's/\r$//' /usr/local/bin/backend-entrypoint.sh
RUN chmod +x /usr/local/bin/backend-entrypoint.sh

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
