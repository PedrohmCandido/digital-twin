# Multi-stage Dockerfile for the front-end (Vite) app
# Stage 1: build the static assets
FROM node:18-alpine AS build

WORKDIR /app

# allow injecting the API base URL at build time
ARG VITE_API_BASE=http://host.docker.internal:5000
ENV VITE_API_BASE=${VITE_API_BASE}

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# Copy source and build (Vite will pick up VITE_API_BASE from env)
COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a simple nginx config that supports SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
