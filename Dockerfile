FROM node:slim
# Set the working directory of the PWA in the container
WORKDIR /app
# Install dependencies “ci equals install”, note that package.json and
# package-lock.json are copied to make better use of the build cache.
COPY package*.json ./
RUN npm ci
# Copy source code
COPY . .
# Build application in as production - result is created in /app/www
RUN npm run build
# Expose app port
EXPOSE 4173
# Start the application
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "4173", "--outDir", "www"]
