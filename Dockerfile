FROM node:18-alpine as BUILD_IMAGE
WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

ARG VITE_BACKEND_SERVICE_URL

RUN echo "VITE_BACKEND_SERVICE_URL=${VITE_BACKEND_SERVICE_URL}" > .env

COPY . .

RUN npm run build

FROM node:18-alpine as PRODUCTION_IMAGE

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/

COPY package.json .
COPY vite.config.ts .

EXPOSE 5173

CMD ["npm", "run", "serve"]

