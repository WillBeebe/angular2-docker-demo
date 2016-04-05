FROM mhart/alpine-node:latest

RUN apk update && \
    apk add python make g++ && \
    rm -rf /var/cache/apk/*

RUN mkdir -p /api
WORKDIR /api

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /api/package.json
RUN npm install

ADD . /api/

WORKDIR /api

EXPOSE 8080 27017

CMD ["npm", "start"]
