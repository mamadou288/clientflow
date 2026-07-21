# Image de développement du frontend (Vite dev server + hot-reload).
FROM node:22-bookworm-slim

WORKDIR /app

# Dépendances d'abord (cache de couche). npm ci = install reproductible depuis le lockfile.
COPY package.json package-lock.json ./
RUN npm ci

# Code (en dev, docker-compose monte le dossier par-dessus pour le hot-reload).
COPY . .

EXPOSE 5173

# --host expose le serveur hors du conteneur (sinon il n'écoute que sur localhost interne).
CMD ["npm", "run", "dev", "--", "--host"]
