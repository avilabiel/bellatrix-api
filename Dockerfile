# Use a imagem oficial do Node.js como base
FROM node:latest

# Defina a pasta de trabalho no container
WORKDIR /app

# Copie o package.json para o container
COPY package*.json ./

# Instale as dependências
RUN yarn install --frozen-lockfile

# Copie o restante do código para o container
COPY . .

# Exponha a porta 80
EXPOSE 80

# Defina o comando para executar o aplicativo
CMD ["yarn", "start-dev"]