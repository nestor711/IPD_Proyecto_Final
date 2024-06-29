FROM node:14

WORKDIR /app

# Copia los archivos de package y realiza la instalación de dependencias
COPY package*.json ./
RUN npm install

# Copia todos los archivos necesarios
COPY src /app/src
COPY scripts/initDB.sh /usr/local/bin/initDB.sh

# Da permisos de ejecución al script de inicialización
RUN chmod +x /usr/local/bin/initDB.sh

# Depuración: Listar los archivos en el directorio /app/src
RUN ls -la /app/src

EXPOSE 3000

# Ejecuta el script de inicialización y luego inicia el servidor
CMD ["sh", "-c", "/usr/local/bin/initDB.sh && node src/server.js"]
