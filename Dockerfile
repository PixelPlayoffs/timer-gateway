FROM node:alpine

COPY . /stream
WORKDIR /stream
RUN npm install

EXPOSE 3002

ENTRYPOINT ["npm", "start"]