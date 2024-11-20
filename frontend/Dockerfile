FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install axios

RUN npm install cors

COPY . .

RUN npm run build

FROM nginx:1.21-alpine

COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]