# Etapa 1: Build de la app Angular
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build --prod

# Etapa 2: Servir la app con Nginx
FROM nginx:alpine

# Elimina la configuración default de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia la build generada al contenedor nginx
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copia archivo personalizado de configuración nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Fin del Dockerfile