# AI Detective Room - Development & Setup Guide

## System Prerequisites
- **Node.js**: >= v18.0.0 (Tested on Node v20+)
- **MongoDB**: Local MongoDB instance or MongoDB Atlas connection URI
- **Google Gemini API Key**: From Google AI Studio (`GEMINI_API_KEY`)

## Directory Layout
```
ai-detective-room/
├── client/          # Vite + React 18 + Three.js + React Three Fiber + Tailwind CSS
├── server/          # Node.js + Express + Mongoose + Google Gen AI SDK
├── docs/            # Single Source of Truth specifications & design docs
└── spec.md          # Master SSOT specification
```

## Quick Start

### 1. Environment Configuration
Copy `.env.example` in both server and root if needed:
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Set required variables:
- `server/.env`:
  - `PORT=5001`
  - `MONGODB_URI=mongodb://localhost:27017/ai_detective_room`
  - `JWT_SECRET=your_jwt_secret_here`
  - `GEMINI_API_KEY=your_gemini_api_key_here`
- `client/.env`:
  - `VITE_API_URL=http://localhost:5001/api/v1`

### 2. Install Dependencies
```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 3. Run Development Servers
From the root workspace:
```bash
# Start backend
npm run server

# Start frontend
npm run client

# Or start concurrently
npm run dev
```

Frontend runs on: `http://localhost:5173`
Backend runs on: `http://localhost:5001`

