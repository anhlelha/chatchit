# 🚀 Deployment Guide

Complete guide to deploy Chat App Launcher to production.

## Architecture

```
Vercel (React App)
    ↕ WebSocket
Railway/Render (MCP Server)
    ↕ Puppeteer
Chrome Browser
```

---

## Part 1: Deploy MCP Server to Railway

### Step 1: Prepare MCP Server for Deployment

The MCP server is already configured in `mcp-server/` directory.

### Step 2: Create Railway Project

1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your `chatchit` repository
6. Railway will detect the project

### Step 3: Configure Railway

1. **Set Root Directory**:
   - Go to **Settings** → **Service Settings**
   - Set **Root Directory**: `mcp-server`

2. **Configure Build Command**:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

3. **Add Environment Variables** (if needed):
   - Click **Variables** tab
   - Add any required environment variables

4. **Enable Public Networking**:
   - Go to **Settings** → **Networking**
   - Click **Generate Domain**
   - Copy the generated URL (e.g., `your-app.railway.app`)

### Step 4: Deploy

1. Click **Deploy** button
2. Wait for build to complete
3. Check logs for any errors
4. Your MCP server is now live!

### Step 5: Get WebSocket URL

Your WebSocket URL will be:
```
wss://your-app.railway.app
```

**Note**: Railway automatically handles WebSocket upgrades from HTTP to WS.

---

## Part 2: Deploy React App to Vercel

### Step 1: Configure Environment Variables

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   ```
   Key: VITE_MCP_SERVER_URL
   Value: wss://your-app.railway.app
   ```

### Step 2: Deploy

Vercel auto-deploys from GitHub. Just push your code:

```bash
git add .
git commit -m "Configure production MCP server URL"
git push origin main
```

Vercel will automatically:
1. Build your React app
2. Use the environment variable
3. Deploy to production

### Step 3: Verify

1. Visit your Vercel app URL
2. Check browser console
3. You should see: `[MCP Client] Using MCP server URL: wss://your-app.railway.app`

---

## Alternative: Deploy MCP Server to Render

### Step 1: Create Render Account

1. Go to [Render.com](https://render.com)
2. Sign in with GitHub

### Step 2: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `chatchit-mcp-server`
   - **Root Directory**: `mcp-server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (for testing)

### Step 3: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment
3. Your service will be available at: `https://chatchit-mcp-server.onrender.com`

### Step 4: Get WebSocket URL

Your WebSocket URL will be:
```
wss://chatchit-mcp-server.onrender.com
```

---

## Part 3: Local Development Setup

### For Development

Create `.env.local` file:

```bash
VITE_MCP_SERVER_URL=ws://localhost:8080
```

### For Production Testing

Create `.env.production` file:

```bash
VITE_MCP_SERVER_URL=wss://your-app.railway.app
```

---

## Configuration Summary

### Railway/Render (MCP Server)

```json
{
  "rootDirectory": "mcp-server",
  "buildCommand": "npm install && npm run build",
  "startCommand": "npm start",
  "port": 8080
}
```

### Vercel (React App)

```bash
# Environment Variables
VITE_MCP_SERVER_URL=wss://your-app.railway.app
```

---

## Troubleshooting

### Issue: WebSocket connection fails

**Solution 1**: Check Railway/Render logs
```bash
# Railway CLI
railway logs

# Or check in dashboard
```

**Solution 2**: Verify CORS settings

The MCP server should allow connections from your Vercel domain.

**Solution 3**: Check WebSocket URL

Make sure you're using:
- `wss://` (not `ws://`) for production
- Correct domain from Railway/Render

### Issue: Puppeteer fails on Railway/Render

Railway/Render free tiers don't support Puppeteer well due to:
- Limited memory
- No Chrome/Chromium installed

**Solutions**:

#### Option A: Use Railway Pro ($5/month)
- More resources
- Better for Puppeteer

#### Option B: Use separate Chrome instance
- Deploy Chrome separately via Docker
- Use `chrome-remote-interface` instead of Puppeteer

#### Option C: Run MCP server locally
- Keep MCP server on your local machine
- Use ngrok to expose it to internet
- Point Vercel to ngrok URL

### Using ngrok (Quick Test)

```bash
# Terminal 1: Start MCP server
cd mcp-server
npm run dev

# Terminal 2: Expose with ngrok
ngrok http 8080

# You'll get URL like: https://abc123.ngrok.io
# Use wss://abc123.ngrok.io in Vercel env vars
```

---

## Option: Run Everything Locally

If deployment is complex, you can run everything locally:

```bash
# Terminal 1: MCP Server
cd mcp-server
npm run dev

# Terminal 2: React App
npm run dev
```

Then share your screen or use port forwarding for demo.

---

## Cost Breakdown

### Free Tier (Recommended for Testing)

- **Vercel**: Free (hobby tier)
- **Railway**: Free tier (500 hours/month, limited resources)
- **Render**: Free tier (limited, may sleep after inactivity)

**⚠️ Limitation**: Puppeteer may not work well on free tiers

### Paid Options

- **Railway Pro**: $5/month (better for Puppeteer)
- **Render Standard**: $7/month
- **DigitalOcean Droplet**: $4/month (more control)

---

## Recommended Setup for Production

### Option 1: Cloud (Best for Demo/Production)
- React App → Vercel (Free)
- MCP Server → Railway Pro ($5/month)
- Total: $5/month

### Option 2: Hybrid (Best for Development)
- React App → Vercel (Free)
- MCP Server → Local machine + ngrok
- Total: Free (ngrok free tier)

### Option 3: All Local (Best for Testing)
- React App → Local (npm run dev)
- MCP Server → Local (npm run dev)
- Total: Free

---

## Next Steps

1. **Choose deployment method**:
   - Railway (recommended)
   - Render
   - Local + ngrok
   - All local

2. **Deploy MCP server**

3. **Update Vercel env vars**

4. **Test end-to-end**

5. **Share app URL**!

---

## Support

- Railway: https://railway.app/help
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Ngrok: https://ngrok.com/docs

Need help? Check the logs first:
```bash
# Railway
railway logs

# Render
# Check dashboard logs

# Vercel
vercel logs

# Local MCP server
# Check terminal output
```
