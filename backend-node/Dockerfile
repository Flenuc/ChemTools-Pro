# backend-node/Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000
CMD ["npm", "run", "start"]  
# Sin corchetes ni comas adicionales