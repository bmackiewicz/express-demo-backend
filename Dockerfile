# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine as production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /app/build /app/build
EXPOSE 8080
CMD ["node", "/app/build/server.js"]
