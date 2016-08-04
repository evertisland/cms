FROM alpine:3.4

MAINTAINER Evert Island <evertisland@hotmail.com>

RUN apk upgrade --update

RUN apk add nodejs

RUN mkdir -p /server

WORKDIR /server

COPY package.json /server

RUN npm install

COPY . /server

EXPOSE 8080

CMD ["npm", "start"]
