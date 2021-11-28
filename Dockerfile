FROM node:alpine
COPY . /
WORKDIR /
CMD node /api/index.js