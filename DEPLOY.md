# AI Detective Room — Deployment Guide 🚀

This guide provides end-to-end instructions for deploying the **AI Detective Room** project:
- **Source Control**: GitHub
- **Backend API**: [Render](https://render.com) (Node.js Web Service)
- **Frontend 3D Game**: [Vercel](https://vercel.com) (Vite + React Three Fiber SPA)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (Managed Cloud Database)
- **AI**: [Google Gemini API](https://aistudio.google.com/)

---

## Architecture Flow

```
┌─────────────────────────────────┐
│       Vercel (Frontend)         │
│  https://your-game.vercel.app   │
│  (React + Three.js 3D Scene)    │
└────────────────┬────────────────┘
                 │
                 │ HTTPS API Calls (VITE_API_URL)
                 ▼
┌─────────────────────────────────┐
│        Render (Backend)         │
│  https://your-api.onrender.com  │
│  (Express + Node.js API)        │
└───────┬─────────────────┬───────┘
        │                 │
        ▼                 ▼
┌───────────────┐ ┌───────────────┐
│ MongoDB Atlas │ │ Google Gemini │
│  Cloud DB     │ │  GenAI API    │
└───────────────┘ └───────────────┘
```

---

## Pre-requisites & Checklist

1. [GitHub Account](https://github.com/)
2. [Render Account](https://render.com/)
3. [Vercel Account](https://vercel.com/)
4. [MongoDB Atlas Cluster](https://cloud.mongodb.com/) (Free M0 or higher)
   - **Crucial**: Go to **Network Access** in MongoDB Atlas and add IP `0.0.0.0/0` (Allow Access from Anywhere) so Render servers can connect.
5. [Google Gemini API Key](https://aistudio.google.com/)

---

## Step 1: Push Repository to GitHub

Ensure `.env` files are not tracked in git (already included in `.gitignore`).

Open your terminal in the project root:

```bash
# 1. Initialize git
git init

# 2. Stage all files (sensitive .env files are automatically ignored)
git add .

# 3. Create your initial commit
git commit -m "feat: complete AI Detective Room 3D game and API"

# 4. Create a new repository on GitHub:
#    - Go to https://github.com/new
#    - Name it "ai-detective-room"
#    - Choose Public or Private
#    - Do NOT initialize with README (already present)

# 5. Link and push to GitHub (replace with your repo URL)
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/ai-detective-room.git
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

Deploy the backend first so you have your production API URL ready for the frontend.

1. Log in to [dashboard.render.com](https://dashboard.render.com/).
2. Click **New +** in the top right and select **Web Service**.
3. Choose **Build and deploy from a Git repository** and click **Next**.
4. Connect your GitHub account and select the `ai-detective-room` repository.
5. Fill in the service configuration:
   - **Name**: `ai-detective-room-api` (or your preferred name)
   - **Region**: Select the region closest to your MongoDB Atlas cluster (e.g. Frankfurt, Oregon, Singapore).
   - **Branch**: `main`
   - **Root Directory**: `server` ⚠️ *(CRITICAL: You must type `server` here. If left blank, Render will look for `src/src/index.js` and fail with "Cannot find module '/opt/render/project/src/src/index.js'")*
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/index.js` *(or `npm start`)*
   - **Instance Type**: `Free`
6. Scroll down to **Environment Variables** and click **Add Environment Variable**:

| Key | Value | Notes |
|---|---|---|
| `NODE_ENV` | `production` | Enables production mode |
| `PORT` | `5001` | Render binds dynamically, but 5001 works as fallback |
| `MONGODB_URI` | `mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/ai_detective_room?retryWrites=true&w=majority` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `replace_with_a_long_random_secret_string` | Used to sign auth cookies/tokens |
| `JWT_EXPIRES_IN` | `7d` | Token lifetime |
| `GEMINI_API_KEY` | `your_gemini_api_key` | From Google AI Studio |
| `GEMINI_MODEL` | `gemini-1.5-pro` | Gemini model name |
| `CLIENT_URL` | `http://localhost:5173` | *(Temporary: update this with your Vercel URL in Step 4)* |

7. Click **Create Web Service**.
8. Wait for the deployment log to show:
   ```
   [Database] MongoDB Connected: ...
   [Server] AI Detective Room API running on port 5001
   ```
9. Copy your assigned Render URL (e.g., `https://ai-detective-room-api.onrender.com`).
10. Test it in your browser:
    - Visit `https://ai-detective-room-api.onrender.com/api/v1/health`
    - You should see `{"status":"ok","version":"2.0.0",...}`.

---

## Step 3: Deploy Frontend to Vercel

1. Log in to [vercel.com](https://vercel.com/).
2. Click **Add New…** -> **Project**.
3. Under **Import Git Repository**, find your `ai-detective-room` repository and click **Import**.
4. In the **Configure Project** screen:
   - **Framework Preset**: `Vite` (should auto-detect)
   - **Root Directory**: Click **Edit** and select **`client`** *(Crucial step)*
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)
5. Expand the **Environment Variables** section and add:

| Key | Value |
|---|---|
| `VITE_API_URL` | `https://your-backend-api.onrender.com/api/v1` *(Your Render URL from Step 2 with `/api/v1`)* |

6. Click **Deploy**.
7. In ~1 minute, Vercel will complete the build and present your live production URL (e.g., `https://ai-detective-room.vercel.app`).
8. The file `client/vercel.json` is already configured with rewrite rules to ensure React Router paths (`/cases`, `/game/001`) work without 404 errors on browser refresh.

---

## Step 4: Link Frontend & Backend (Finalize CORS)

Now that you have your live Vercel URL:

1. Return to [dashboard.render.com](https://dashboard.render.com/) -> Select your `ai-detective-room-api` service.
2. Go to **Environment** in the left sidebar.
3. Find the `CLIENT_URL` variable.
4. Update its value to your Vercel URL:
   ```
   https://ai-detective-room.vercel.app
   ```
5. Click **Save Changes**. Render will automatically redeploy the backend with the new CORS origin whitelist.

---

## Verification & Testing

1. Open your Vercel URL in your browser.
2. Verify:
   - Landing page loads with 3D ambient design.
   - Click **"Browse Case Files"** -> Case dockets display.
   - Click **"Start Investigation (Case #001)"** -> 3D room loads in WebGL.
   - Test camera orbit and click on evidence items (Desk `E-01`, Terminal `E-02`, Corkboard `E-03`).
   - Open the **Gemini AI Mentor** chat drawer and ask a question.
   - Submit a verdict at the Indictment Station to test end-to-end server validation.

---

## Common Troubleshooting

### 1. Error: `Cannot find module '/opt/render/project/src/src/index.js'`
This error occurs when the **Root Directory** setting in Render is left blank or incorrect.
Render's default root directory is `/opt/render/project/src`. When you tell it to run `node src/index.js` without setting the Root Directory, it searches for `/opt/render/project/src/src/index.js`, which doesn't exist.

**How to fix:**
1. In your Render Dashboard, go to your Web Service -> **Settings**.
2. Find the **Root Directory** field and set it to:
   ```
   server
   ```
3. Make sure **Start Command** is:
   ```
   node src/index.js
   ```
4. Click **Save Changes** (Render will automatically redeploy and succeed).

### 2. Render Free Tier Cold Start
Render's free tier spins down inactive web services after 15 minutes of inactivity. When you send the first request after an idle period, it can take 40–50 seconds to boot up. Subsequent requests respond instantly.

### 2. MongoDB Connection Timeout
If Render logs show `MongoServerSelectionError`:
- Ensure in MongoDB Atlas -> **Network Access**, IP `0.0.0.0/0` is active.
- Verify your database user username and password do not contain unencoded special characters.

### 3. CORS Error in Browser Console
If the browser console displays `Access to XMLHttpRequest has been blocked by CORS policy`:
- Ensure `CLIENT_URL` on Render matches your exact Vercel domain (including `https://` without a trailing slash).
- Note that our `server/src/app.js` is pre-configured to automatically allow all `*.vercel.app` domains.

### 4. Direct Refresh Returns 404 on Vercel
Handled automatically by [`client/vercel.json`](file:///Users/sivanarasimhagottipati/Downloads/AI%20Detective%20Room/client/vercel.json), which rewrites all paths to `index.html`.
