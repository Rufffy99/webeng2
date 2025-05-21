# WebEng2

A **React + Framework7** Progressive Web App (PWA) built using **Vite** as the bundler. The app features modern frontend tooling, service workers for offline capability, and Docker support for containerized deployment.

---

## 📚 Table of Contents

- [🐳 Docker Setup & Development Workflow](#-docker-setup--development-workflow)
- [👨‍💻 Developing Inside Docker](#-developing-inside-docker)
- [🧠 Using VSCode with Docker (Devcontainer)](#-using-vscode-with-docker-devcontainer)
- [🛠 Framework7 CLI Setup](#-framework7-cli-setup)
- [🚀 Getting Started](#-getting-started)
- [📜 Available Scripts](#-available-scripts)
- [⚡ Vite](#-vite)
- [🌐 Progressive Web App (PWA)](#-progressive-web-app-pwa)
- [🖼 Assets Management](#-assets-management)
- [📁 Project Structure Highlights](#-project-structure-highlights)
- [📚 Documentation & Resources](#-documentation--resources)

---

## 🐳 Docker Setup & Development Workflow

You can run and develop this app fully inside a Docker container.

### 🔧 Build the Docker Image

```bash
docker build -t webeng2 .
```

### 🚀 Run the Container

```bash
docker run -p 5173:5173 webeng2
```

This serves the app in production mode on `http://localhost:5173`.

---

## 👨‍💻 Developing Inside Docker

To enable live development, including Git support and local file syncing, run the container with volume mounts:

```bash
docker run -it --rm -p 5173:5173 -v $(pwd):/app -w /app node:slim bash
```

Then inside the container:

```bash
npm install
npm run dev
```

Your local files will be reflected inside the container. You can also use `git` inside this shell, as long as it's installed in the container or mounted via volumes.

For Git inside the container:

```bash
apt update && apt install -y git
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## 🧠 Using VSCode with Docker (Devcontainer)

To work in VSCode inside the container, do the following:

1. Make sure you have the **Remote - Containers** extension installed in VSCode.
2. Create a `.devcontainer` folder in the root of the project.
3. Add a `devcontainer.json` with this content:

```json
{
  "name": "WebEng2 Dev",
  "image": "node:slim",
  "workspaceFolder": "/app",
  "mounts": [
    "source=${localWorkspaceFolder},target=/app,type=bind"
  ],
  "postCreateCommand": "npm install",
  "customizations": {
    "vscode": {
      "extensions": ["dbaeumer.vscode-eslint"]
    }
  }
}
```

4. Reopen the project in container via the Command Palette:
```
> Remote-Containers: Reopen in Container
```

This gives you full Git integration, local file access, and the power of VSCode inside the container.

---

## 🛠 Framework7 CLI Setup

This app was scaffolded using the Framework7 CLI with the following configuration:

```json
{
  "name": "WebEng2",
  "framework": "react",
  "template": "single-view",
  "bundler": "vite",
  "type": ["pwa"],
  "cssPreProcessor": false,
  "theming": {
    "customColor": false,
    "color": "#007aff",
    "darkMode": true,
    "iconFonts": true
  },
  "customBuild": false
}
```

---

## 🚀 Getting Started

### 📦 Install Dependencies

```bash
npm install
```

---

## 📜 Available Scripts

| Script         | Description                                 |
|----------------|---------------------------------------------|
| `npm run dev`  | Start the development server (alias: `start`) |
| `npm run build`| Build the app for production and generate service worker |
| `npm run lint` | Run ESLint on the project source files      |

---

## ⚡ Vite

This project uses [Vite](https://vitejs.dev) for development and bundling. All source code is in the `/src` folder. The configuration file is located at `vite.config.js`.

---

## 🌐 Progressive Web App (PWA)

This project is a PWA. During development, consider disabling the service worker in dev tools or using "Update on reload".

### Service Worker

A custom service worker is generated during the build via:

```bash
npx workbox generateSW workbox-config.js
```

---

## 🖼 Assets Management

Source images for icons and splash screens are in the `assets-src` folder. To regenerate app assets:

```bash
framework7 assets
```

Or launch the Framework7 asset editor:

```bash
framework7 assets --ui
```

---

## 📁 Project Structure Highlights

- `src/` — Application source code
- `public/` — Static files
- `assets-src/` — Editable source assets (icons, splash screens)
- `workbox-config.js` — Service worker config for Workbox
- `vite.config.js` — Vite configuration
- `Dockerfile` — Containerization setup

---

## 📚 Documentation & Resources

- [Framework7 Docs](https://framework7.io/docs/)
- [Framework7 React](https://framework7.io/react/)
- [Framework7 Icons](https://framework7.io/icons/)
- [Vite Documentation](https://vitejs.dev/)
- [Workbox Docs](https://developer.chrome.com/docs/workbox/)
- [Community Forum](https://forum.framework7.io)
