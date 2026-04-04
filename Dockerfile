# ===== Stage 1: Build =====
FROM node:20-alpine AS builder
WORKDIR /app

# Cache dependencies first
COPY package*.json ./
RUN npm ci

# Build source
COPY . .
RUN npm run build

# ===== Stage 2: Serve with Nginx =====
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
