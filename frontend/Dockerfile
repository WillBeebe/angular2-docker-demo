FROM mhart/alpine-node:latest

ENV REFRESHED_AT 2016-1-14

RUN mkdir /app
WORKDIR /app

ADD package.json /app/package.json
RUN npm install
ADD . .
RUN npm test

EXPOSE 4000

CMD ["node", "server.js"]
