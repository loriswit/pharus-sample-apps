FROM node:20-slim
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=8000
ENTRYPOINT ["node", "dist/server/entry.mjs"]
