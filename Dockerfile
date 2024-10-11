FROM node:20.16.0

COPY . .

RUN npm install

CMD ["node", "app"]