FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

CMD ["/usr/local/bin/docker-entrypoint.sh"]