FROM node:slim
# Arbeitsverzeichnis der PWA im Container festlegen
WORKDIR /app
# Abhängigkeiten installieren "ci gleichbedeutend install", dabei gilt zu beachten, dass package.json und 
# package-lock.json kopiert werden, um den Build-Cache besser zu nutzen.
COPY package*.json ./
RUN npm ci
# Quellcode kopieren
COPY . .
# Anwendung in als Production bauen - Ergebnis wird in /app/www erstellt
RUN npm run build

# Expose app port
EXPOSE 5173

# Start the application
CMD ["npx", "vite", "preview"]
