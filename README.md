# Stremio Gay Adult Live Addon

This is a Stremio addon backend that scrapes gay adult movies from public streaming sites and exposes them through Stremio's catalog, meta, and stream APIs. Supports Real-Debrid magnet links and embedded videos.

## 🛠 Deploy Instructions (Render)

1. Unzip this folder and push to a new GitHub repo.
2. Go to [https://render.com](https://render.com), create a new **Web Service**.
3. Connect your GitHub repo.
4. Use:
   - Build command: `npm install`
   - Start command: `node index.js`
5. After deploy, visit:
   ```
   https://your-app.onrender.com/manifest.json
   ```
6. In Stremio: install from URL:
   ```
   stremio://your-app.onrender.com/manifest.json
   ```

Movies will auto-refresh every 12 hours using node-cron.

✅ Works with latest Stremio client.
✅ Includes posters, categories, Real-Debrid and embed streams.