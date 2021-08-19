FROM node:14
WORKDIR /container
COPY package.json .
COPY /build .
EXPOSE 3000
RUN npm install
