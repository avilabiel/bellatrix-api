FROM node:latest

WORKDIR /usr/src/API

COPY . .
COPY .env /usr/src/API/.env 

RUN yarn install --quiet --no-optional --no-fund --loglevel=error

EXPOSE 3000

ENTRYPOINT [ "yarn", "start-dev" ] 