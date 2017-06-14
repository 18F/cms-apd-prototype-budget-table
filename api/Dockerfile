FROM node:6

RUN yarn global add npm@5

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./package-lock.json .

RUN npm install

CMD npm run start-dev
