# Dockerfile for Framework7 React PWA
FROM --platform=linux/amd64 node:slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies (double run to fix rollup issue)
RUN npm install || true
RUN rm -rf node_modules package-lock.json && npm cache clean --force && npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173