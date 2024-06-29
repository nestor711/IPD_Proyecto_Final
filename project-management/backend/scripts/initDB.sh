#!/bin/sh

# Esperar a que el servicio de Postgres esté disponible
until nc -z -v -w30 $DB_HOST 5432
do
  echo "Waiting for database connection..."
  sleep 1
done

# Ejecutar el script de inicialización de la base de datos
node /app/src/initDB.js

# Indicar que el script ha terminado
echo "Database initialized"
