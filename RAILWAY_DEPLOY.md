# 🚂 Deploy MCP Server to Railway (Step-by-Step)

Follow these exact steps to deploy your MCP server to Railway.

---

## Step 1: Sign Up for Railway

1. Go to https://railway.app
2. Click **"Login"** → **"Login with GitHub"**
3. Authorize Railway to access your GitHub

---

## Step 2: Create New Project

1. Click **"New Project"** button
2. Select **"Deploy from GitHub repo"**
3. Choose your repository: `anhlelha/chatchit`
4. Railway will start analyzing your project

---

## Step 3: Configure the Service

### 3.1 Set Root Directory

Railway needs to know where the MCP server code is:

1. Click on the deployed service
2. Go to **Settings** tab
3. Scroll to **Service**
4. Click **"Root Directory"**
5. Enter: `mcp-server`
6. Click **"Update"**

### 3.2 Configure Build & Start Commands

Railway should auto-detect from `package.json`, but verify:

1. Still in **Settings** → **Service**
2. Check **Build Command**: `npm install && npm run build`
3. Check **Start Command**: `npm start`

If not set, add them manually.

### 3.3 Set Port (Important!)

1. In **Settings** → **Networking**
2. Railway auto-assigns port in `$PORT` env var
3. Update `mcp-server/src/server.ts` to use:
   ```typescript
   const PORT = process.env.PORT || 8080;
   ```

---

## Step 4: Enable Public Networking

1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Railway will generate a public URL like:
   ```
   your-app-production.railway.app
   ```
4. **Copy this URL** - you'll need it!

---

## Step 5: Deploy

1. Click **"Deploy"** button (or it auto-deploys)
2. Watch the build logs in real-time
3. Wait for:
   ```
   ✅ Build successful
   ✅ Deployment successful
   🚀 Service is live
   ```

---

## Step 6: Verify Deployment

### Check Logs

1. Click **"View Logs"** tab
2. You should see:
   ```
   🚀 MCP Server starting on ws://localhost:8080
   [WS] WebSocket server ready
   ✅ MCP Server is running!
   ```

### Test WebSocket Connection

Open browser console and test:

```javascript
const ws = new WebSocket('wss://your-app-production.railway.app');
ws.onopen = () => console.log('✅ Connected!');
ws.onerror = (e) => console.error('❌ Error:', e);
```

---

## Step 7: Configure Vercel

Now connect your React app to the Railway MCP server:

### 7.1 Go to Vercel Dashboard

1. Visit https://vercel.com/dashboard
2. Select your `chatchit` project

### 7.2 Add Environment Variable

1. Go to **Settings** → **Environment Variables**
2. Click **"Add"**
3. Fill in:
   ```
   Name:  VITE_MCP_SERVER_URL
   Value: wss://your-app-production.railway.app
   ```
   (Replace with your actual Railway URL)
4. Select **Production**, **Preview**, **Development**
5. Click **"Save"**

### 7.3 Redeploy

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for new deployment to finish

---

## Step 8: Test Your App

1. Visit your Vercel app: `https://chatchit-ashy.vercel.app`
2. Open browser console (F12)
3. You should see:
   ```
   [MCP Client] Using MCP server URL: wss://your-app-production.railway.app
   [MCP Client] Connected to MCP server
   ```
4. Try connecting to a chat URL!

---

## Troubleshooting

### Issue: Build Fails

**Check:**
- Root directory is set to `mcp-server`
- Build command is correct: `npm install && npm run build`

**Fix:**
1. Go to Settings → General
2. Click **"Redeploy"**

### Issue: WebSocket Connection Fails

**Check Railway Logs:**
```
[WS] WebSocket server ready  ← Should see this
```

**Test Connection:**
```javascript
// In browser console
const ws = new WebSocket('wss://YOUR-URL.railway.app');
ws.onopen = () => console.log('Connected!');
```

**Common Issues:**
- Wrong URL format (use `wss://` not `ws://`)
- Port not configured correctly
- Service crashed (check logs)

### Issue: Puppeteer Crashes

Railway free tier has limited resources. Puppeteer is memory-intensive.

**Solutions:**

#### A. Upgrade to Railway Pro ($5/month)
- More CPU and RAM
- Better for Puppeteer

#### B. Use Puppeteer with fewer resources
Edit `mcp-server/src/browserController.ts`:
```typescript
this.browser = await puppeteer.launch({
  headless: 'new',  // Use new headless mode
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',  // Add this
    '--disable-gpu',             // Add this
  ],
});
```

### Issue: Service Keeps Crashing

**Check Memory Usage:**
1. Railway Dashboard → **Metrics**
2. Look at memory graph

**If using 100% memory:**
- Upgrade to Pro plan
- Optimize Puppeteer settings
- Use headless: 'new' mode

---

## Railway Configuration Files

Your project already has `.railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

This auto-configures Railway for you!

---

## Costs

### Free Tier
- ✅ $5 free credit per month
- ✅ Good for testing
- ⚠️  Limited resources (512MB RAM)
- ⚠️  May crash with Puppeteer

### Pro Plan ($5/month)
- ✅ More resources (8GB RAM)
- ✅ Better for Puppeteer
- ✅ Custom domains
- ✅ Priority support

### Developer Plan ($20/month)
- ✅ Even more resources
- ✅ Team features

**Recommendation:** Start with free tier. Upgrade if Puppeteer crashes.

---

## Alternative: Quick Test with ngrok

Don't want to deploy yet? Use ngrok:

```bash
# Terminal 1: Start MCP server locally
cd mcp-server
npm run dev

# Terminal 2: Expose with ngrok
ngrok http 8080
```

You'll get: `https://abc123.ngrok-free.app`

Use this in Vercel:
```
VITE_MCP_SERVER_URL=wss://abc123.ngrok-free.app
```

**Note:** ngrok URL changes each time. Not for production!

---

## Summary Checklist

- [ ] Railway account created
- [ ] Project deployed from GitHub
- [ ] Root directory set to `mcp-server`
- [ ] Public domain generated
- [ ] Logs show "MCP Server is running"
- [ ] Vercel env var updated
- [ ] Vercel redeployed
- [ ] WebSocket connection working
- [ ] Can connect to chat apps

---

## Next Steps

Once deployed:

1. **Test thoroughly**: Try all features
2. **Monitor logs**: Watch for errors
3. **Check metrics**: CPU/memory usage
4. **Upgrade if needed**: If crashes, go Pro
5. **Share your app**: Send Vercel URL to others!

---

## Need Help?

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Check logs**: Railway Dashboard → Logs tab
- **Check metrics**: Railway Dashboard → Metrics tab

---

**Ready to deploy? Let's go! 🚀**

```bash
# Push your code (if not already)
git push origin main

# Then follow steps above!
```
