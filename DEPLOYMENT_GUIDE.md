# Deployment Guide: Phishermen 2.0 (Split Deployment)

This guide covers deploying the **Backend to Render** and the **Frontend to Vercel**.

## Part 1: Backend Deployment (Render)

1.  **Push to GitHub**: ensure your latest code is pushed to your repository.
2.  **Login to Render**: Go to [dashboard.render.com](https://dashboard.render.com/).
3.  **New Web Service**: Click **New +** -> **Web Service**.
4.  **Connect Repo**: Select your `Phisherman-2.0-CTF22` repository.
5.  **Configuration**:
    *   **Name**: `cyber-security-challenge` (or similar).
    *   **Runtime**: `Node`.
    *   **Root Directory**: Leave this **EMPTY**. (Render defaults to the repo root. If you set this to 'backend', the build command will fail).
    *   **Build Command**: `cd backend && npm install` (matches `render.yaml`).
    *   **Start Command**: `cd backend && node server.js` (matches `render.yaml`).
6.  **Environment Variables**:
    *   Scroll down to "Environment Variables" and add:
        *   `NODE_ENV`: `production`
        *   `ATLAS_URL`: (Your MongoDB Connection String)
        *   `JWT_SECRET`: (A random secure string)
        *   `LEVEL2_FLAG`: `PHISH{juice_shop_sql_master}`
        *   `LEVEL4_FLAG`: `CTF{view_source_is_still_op}`
        *   `FRONTEND_URL`: (Optional) Put your Vercel URL here later if you want to lock down CORS.
7.  **Deploy**: Click **Create Web Service**.
8.  **Wait & Copy URL**: Wait for the deploy to finish (green check). **Copy your Backend URL** (e.g., `https://cyber-security-challenge.onrender.com`).

---

## Part 2: Frontend Deployment (Vercel)

1.  **Login to Vercel**: Go to [vercel.com](https://vercel.com/).
2.  **Add New**: Click **Add New...** -> **Project**.
3.  **Import Repo**: Select your `Phisherman-2.0-CTF22` repository.
4.  **Configuration**:
    *   **Framework Preset**: Vite (should auto-detect).
    *   **Root Directory**: Click "Edit" and select `frontend`. **(Important!)**.
5.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   **Key**: `VITE_API_BASE_URL`
    *   **Value**: (Paste your Render Backend URL from Part 1, e.g., `https://cyber-security-challenge.onrender.com`).
6.  **Deploy**: Click **Deploy**.
7.  **Test**: Once deployed, open the Vercel URL.
    *   Try logging in.
    *   If it fails, check the Browser Console (F12) -> Network tab. If you see CORS errors, ensure your Backend running on Render is up and `server.js` has the correct CORS settings.

## Troubleshooting

*   **CORS Errors**: If the frontend says "Network Error" or console shows CORS issues:
    *   Check if `server.js` on Render has `app.use(cors(...))` configured correctly.
    *   Make sure `FRONTEND_URL` env var on Render matches your Vercel domain (if you restricted it).
*   **MongoDB Connection Error**: Check Render logs. Ensure your `ATLAS_URL` IP Access List allows access from ANYWHERE (`0.0.0.0/0`) since Render IPs change.
