FROM node:18-alpine as BUILD_IMAGE
WORKDIR /app

COPY package.json .
COPY vite.config.js .

RUN npm install --legacy-peer-deps

ARG VITE_BACKEND_SERVICE_URL

RUN echo "VITE_BACKEND_SERVICE_URL=${VITE_BACKEND_SERVICE_URL}" > .env

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
