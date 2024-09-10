FROM node:20-slim
WORKDIR /app

ARG api_base_url
ENV VITE_API_BASE_URL=$api_base_url

COPY package*.json ./
COPY packages/api/package.json packages/api/
COPY packages/ui/package.json packages/ui/
RUN npm ci

COPY packages packages/

ARG route_loading
RUN if [ "$route_loading" = "lazy" ]; \
        then mv packages/ui/src/router-lazy.js packages/ui/src/router.js; \
    fi

RUN npm run build -w ui

ENTRYPOINT ["node", "packages/api/src/main.js"]
