FROM node:0.10-onbuild

MAINTAINER GZ Team Eskrima "https://github.com/eskrima"

RUN mkdir -p /var/data/uploads

VOLUME ["/var/data/uploads"]

EXPOSE 8005