FROM alpine:latest

LABEL maintainer="stuartkasekende1@gmail.com"

RUN apk add --update nodejs npm

COPY . .

WORKDIR /frontend/react-frontend

RUN npm install

EXPOSE 8080

ENTRYPOINT ["node", "./src/index.js"] 