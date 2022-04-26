FROM node:16-alpine

WORKDIR /home/code
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "npm", "run", "start" ]