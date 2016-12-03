FROM node:7

EXPOSE 3000

RUN mkdir /app
WORKDIR /app
ADD package.json package.json
RUN npm install
ADD public public
COPY src src

CMD ["npm", "start"]
