# Recipes App

A full-stack recipe CRUD application built with Node.js, Express.js, Mongoose, and React.

## Features

- Create, read, update, and delete recipes
- MongoDB persistence through Mongoose
- MVC-inspired structure with separate backend and frontend folders
- React UI for managing recipes
- Postman collection with sample requests and responses
- Validation and error handling on the API

- `recipes-mvc-backend/` contains the Express API, Mongoose model, controllers, routes, middleware, and database config.
- `recipes-mvc-frontend/` contains the React frontend, reusable components, page-level views, styles, and API helpers.
- `postman/` contains the Postman collection and environment file for testing the API.

## API Endpoints

- `GET /api/health` - health check
- `POST /api/recipes` - create a recipe
- `GET /api/recipes` - get all recipes
- `GET /api/recipes/:id` - get a recipe by ID
- `PATCH /api/recipes/:id` - update a recipe by ID
- `DELETE /api/recipes/:id` - delete a recipe by ID

## Environment Variables

Server `.env` example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/recipes_app
NODE_ENV=development
```

Client `.env` example:

```env
VITE_API_BASE_URL=https://recipie-app-i0mw.onrender.com/api
```

In local development, the React app runs on port `3000` and can call the deployed backend API at `https://recipie-app-i0mw.onrender.com/api`.

## Running the App

Install dependencies separately in the `recipes-mvc-backend` and `recipes-mvc-frontend` folders, then start each workspace.

```bash
cd recipes-mvc-backend
npm install
npm run dev
```

```bash
cd recipes-mvc-frontend
npm install
npm run dev
```

## Helper scripts

I added convenience scripts to `scripts/` to install and start both projects and to safely remove the old folder layout if you want to clean up.

- `scripts/install_and_start_all.sh` — installs dependencies for both projects and starts the backend (background) and frontend (foreground). Use from Bash/WSL/macOS.
- `scripts/run_backend.sh` — installs (if needed) and starts the backend only.
- `scripts/run_frontend.sh` — installs (if needed) and starts the frontend only.
- `scripts/cleanup_old_structure.sh` / `scripts/cleanup_old_structure.ps1` — interactive cleanup that deletes `server/src` and `client/src` after you type `YES`.

Usage (bash):

```bash
# run both (frontend logs in foreground)
bash scripts/install_and_start_all.sh

# run backend only
bash scripts/run_backend.sh

# run frontend only
bash scripts/run_frontend.sh

# remove the old src folders (will ask for confirmation)
bash scripts/cleanup_old_structure.sh
```

Usage (PowerShell):

```powershell
# run backend only
.\scripts\run_backend.sh

# run frontend only
.\scripts\run_frontend.sh

# remove the old src folders (will ask for confirmation)
.\scripts\cleanup_old_structure.ps1
```

## Postman

Import the collection at `postman/Recipes App.postman_collection.json` and the environment at `postman/Recipes App.postman_environment.json`.

The collection includes sample request bodies and response examples for every CRUD endpoint.
