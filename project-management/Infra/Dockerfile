# Dockerfile para Locust
FROM python:3.11-slim

WORKDIR /app

# Copiar los archivos necesarios para Locust
COPY requirements.txt ./
COPY locustfile.py ./

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Exponer el puerto para la interfaz web de Locust
EXPOSE 8089

# Comando por defecto para ejecutar Locust
CMD ["locust", "-f", "locustfile.py"]