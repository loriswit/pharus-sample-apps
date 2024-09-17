FROM node:20-slim
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ARG cache_control
ENV CACHE_CONTROL=$cache_control

ENV PORT=8000
ENTRYPOINT ["node", "server/entry.node-server.js"]
