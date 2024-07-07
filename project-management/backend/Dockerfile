FROM node:14

# Instalar Python y pip
RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Instalar Locust
COPY requirements.txt .
RUN pip3 install -r requirements.txt

EXPOSE 3000 8089

CMD ["npm", "run", "start-and-init"]