FROM node:ubuntu
WORKDIR /container
COPY package.json /container/package.json
RUN npm install
COPY . /container
RUN npm start
