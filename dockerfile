# Imagem base
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia o restante dos arquivos
COPY . .

# Compila o projeto
RUN npm run build

# Expõe a porta
EXPOSE 2100

# Comando para rodar
CMD ["node", "src/app.ts"]
