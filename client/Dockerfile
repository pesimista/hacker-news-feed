### STAGE 1: build ###
FROM node:14-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

### STAGE 2: setup ###
RUN echo $API_HOST
FROM nginx
COPY nginx/default.conf /etc/nginx/conf.d

COPY --from=builder /usr/src/app/dist/client /usr/share/nginx/html

# EXPOSE 80
# CMD ["/bin/sh" , "-c" , "envsubst '${API_HOST}' < /etc/nginx/conf.d/default.conf> /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
CMD ["nginx", "-g", "daemon off;"]