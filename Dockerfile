FROM node:18.12.1-bullseye

WORKDIR /usr/src/app

COPY . .

RUN npm install --build-from-source && npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]