FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

ARG VITE_BACKEND_SERVICE_URL

RUN echo "VITE_BACKEND_SERVICE_URL=${VITE_BACKEND_SERVICE_URL}" > .env

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
