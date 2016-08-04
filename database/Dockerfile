FROM alpine:3.4

MAINTAINER Evert Island <evertisland@hotmail.com>

# Add custom repo for MongoDB
RUN echo 'http://dl-3.alpinelinux.org/alpine/edge/testing' >> /etc/apk/repositories

RUN apk upgrade --update

RUN apk add mongodb

RUN mkdir -p /data/db

EXPOSE 27017

ENTRYPOINT ["mongod"]
