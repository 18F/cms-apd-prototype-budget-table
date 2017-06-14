FROM node:6

RUN yarn global add npm@5

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./package-lock.json .

RUN npm install

RUN mkdir dist
ADD ./src/index.html dist

CMD npm run start
