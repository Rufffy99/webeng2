# syntax=docker/dockerfile:1.4
FROM --platform=linux/amd64 node:slim

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Clean install with workaround for Rollup optional dependency issue
# First try install; if it fails due to rollup, try again cleanly
RUN npm install || echo "Initial npm install failed. Proceeding with fallback..."
RUN if [ ! -d "node_modules" ]; then rm -rf node_modules && npm cache clean --force && npm install; fi

# Copy the full project (after installing deps to benefit from layer caching)
COPY . .

# Build the project
RUN npm run build

# Expose app port
EXPOSE 5173