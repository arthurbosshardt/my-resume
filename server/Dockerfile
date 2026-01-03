FROM node:18-alpine
WORKDIR /app
# Installation des dépendances
COPY package*.json ./
RUN npm install
# Copie du code source
COPY . .
# Port interne exposé
EXPOSE 5000
CMD ["npm", "start"]
