FROM node:alpine as builder
WORKDIR '/client'
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "start"]

