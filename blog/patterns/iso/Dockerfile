FROM node:20-slim
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV PORT=8000
ENTRYPOINT ["node", ".output/server/index.mjs"]
