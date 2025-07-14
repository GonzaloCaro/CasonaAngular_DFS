# Etapa 1: Build Angular con Node >= 20.19
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build --prod

# Etapa 2: Nginx para servir la app
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copia configuración personalizada (rutas Angular)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
