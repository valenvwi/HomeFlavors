FROM node:20.10.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run generate

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
