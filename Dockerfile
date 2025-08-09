# Stage 1 - Build app cu Node
FROM node:20-alpine AS build

# Setăm directorul de lucru
WORKDIR /app

# Copiem fișierele pentru instalare dependențe
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Instalăm dependențele
RUN npm install

# Copiem restul codului
COPY . .

# Build pentru producție
RUN npm run build

# Stage 2 - Servește cu Nginx
FROM nginx:alpine

# Ștergem fișierele default din Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiem fișierele build-uite din primul stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copiem configurația Nginx personalizată
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf

# Expunem portul 80
EXPOSE 80

# Pornim Nginx
CMD ["nginx", "-g", "daemon off;"]
