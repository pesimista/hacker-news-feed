### STAGE 1: build ###
FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main"]