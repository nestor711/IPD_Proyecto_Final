FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copiar y dar permisos de ejecución al script de inicialización
COPY scripts/initDB.sh /usr/local/bin/initDB.sh
RUN chmod +x /usr/local/bin/initDB.sh

EXPOSE 3000

CMD ["sh", "-c", "initDB.sh && node server.js"]
