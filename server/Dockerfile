
FROM node:23.7.0-alpine AS build

WORKDIR /app


COPY package*.json ./
RUN npm install

COPY . .


RUN npm run build

FROM node:23.7.0-alpine AS production


WORKDIR /app


COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./


EXPOSE 3000


CMD ["node",  "dist/src/server.js"]