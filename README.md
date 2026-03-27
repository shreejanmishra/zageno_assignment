# Whamazon

## Features

- **ACID Transactions**: Orders are processed atomically. Phantom inventory is impossible.
- **Optimized Data Layer**: Uses MongoDB `$text` B-Tree indexing for instant keyword searches and `bulkWrite` for O(1) inventory deductions.
- **Pagination & Caching**: Fully offset-paginated API and React Query integration for massive datasets, with `node-cache` memory singletons for static payloads.
- **Hardened Security**: Features strict Zod payload validation and global rate-limiting against automated abuse.
- **Production Built**: Frontend assets are chunk-split and aggressively minified using Vite, while the backend runs inside a secure, multi-stage, non-root Docker container.

## Getting Started

You'll need Node 18+ and a MongoDB instance running locally or via Atlas.

### 1. Backend

```bash
cd backend
npm install

# Create a .env file with your variables
echo "PORT=5000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/whamazon" >> .env

# Seed the database and start the server
npm run seed
npm run dev
```

### 2. Frontend (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

## Architecture Stack

- **Frontend**: React 19, Tailwind CSS 4, Zustand (Cart State), React Query
- **Backend**: Express.js 5, Node.js, Mongoose
- **DevOps**: Docker, multi-stage builds

## License

MIT
