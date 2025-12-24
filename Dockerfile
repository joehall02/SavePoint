# syntax=docker/dockerfile:1

############################
# Builder stage
############################
FROM node:24.11.1-alpine AS builder

WORKDIR /usr/src/app

# Install all dependencies (including dev) for building
COPY package*.json tsconfig.json ./
RUN npm ci

# Copy source code and build
COPY src ./src
RUN npm run build


############################
# Production runtime stage
############################
FROM node:24.11.1-alpine AS runner

WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled JS from builder
COPY --from=builder /usr/src/app/dist ./dist

# Default port
EXPOSE 5050

# Start the compiled server
CMD ["node", "dist/server.js"]
