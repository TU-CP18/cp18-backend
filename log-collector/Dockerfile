FROM node:10.15.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY . .

RUN yarn install

RUN apk add bind-tools

ENV NODE_ENV production
ENV LOG_LEVEL=debug
ENV LOG_COLLECTOR_PORT=80
ENV LOGSTASH_HOST=localhost
ENV LOGSTASH_PORT=5000
ENV ELASTICSEARCH_HOST=localhost
ENV ELASTICSEARCH_PORT=9200
ENV ELASTICSEARCH_INDEX=cpdaimler-events
ENV JWT_SECRET=productionsecret
ENV JWT_ALGORITHM=HS512

EXPOSE 80

CMD yarn start
