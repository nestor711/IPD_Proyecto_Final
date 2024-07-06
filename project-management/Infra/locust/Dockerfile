# Usamos Python como base, ya que Locust está escrito en Python
FROM python:3.9

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiamos los archivos de requisitos (si existen)
COPY requirements.txt ./

# Instalamos las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el resto de los archivos del proyecto al contenedor
COPY . .

# Exponemos el puerto 8089, que es el puerto por defecto de la interfaz web de Locust
EXPOSE 8089

# Comando para ejecutar Locust
CMD ["locust", "-f", "locustfile.py"]