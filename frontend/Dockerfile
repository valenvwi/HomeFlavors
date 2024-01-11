FROM node:20.10.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run generate

RUN npm run build

CMD [ "npm", "run", "serve" ]

# CMD [ "npm", "run", "serve-secure" ]
