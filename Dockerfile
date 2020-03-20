FROM node:12.16.1

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node dist/app.js" ]
