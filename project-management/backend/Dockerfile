FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copiar y dar permisos de ejecución al script de inicialización
COPY scripts/initDB.sh /usr/local/bin/initDB.sh
RUN chmod +x /usr/local/bin/initDB.sh

EXPOSE 3000

# Crear un script de inicio
RUN echo '#!/bin/sh\ncd /app/src && node server.js &\nsleep 5\n/usr/local/bin/initDB.sh\nwait' > /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Verificar que los scripts existen y tienen permisos de ejecución
RUN ls -l /usr/local/bin/initDB.sh /usr/local/bin/start.sh

CMD ["/usr/local/bin/start.sh"]