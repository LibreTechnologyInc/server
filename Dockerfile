FROM node:14

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/

RUN yarn install --production && yarn cache clean

COPY . /app

RUN cd ui && yarn install --production && yarn build

ENV NODE_ENV production
ENTRYPOINT ["node", "./bin/server.mjs"]
