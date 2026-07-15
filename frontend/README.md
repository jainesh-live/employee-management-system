# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Serve with Docker + Nginx

To serve the built website using Nginx in a Docker container:

1. Build the frontend production bundle first:

   ```bash
   npm run build
   ```

2. Start the container with Docker Compose:

   ```bash
   docker compose up --build -d
   ```

3. Open the app in your browser at:

   ```text
   http://localhost
   ```

The Compose file in [docker-compose.yml](docker-compose.yml) mounts the built files from the dist folder and uses the Nginx configuration from [docker/nginx.conf](docker/nginx.conf). That Nginx config forwards requests under /api/ to the backend host at http://host.docker.internal:8080/ so the frontend can reach the API from inside the container. You can replace this value with any other API base URL where your backend is running.

To stop the container later, run:

```bash
docker compose down
```
