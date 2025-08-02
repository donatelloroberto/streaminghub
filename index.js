const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { scrapeAll } = require('./scraper');
const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());

let movies = [];
const manifest = {
  id: 'gay.adult.live',
  version: '1.0.0',
  name: 'Gay Adult Live Addon',
  description: 'Streams gay adult movies with Real-Debrid & embeds',
  resources: ['catalog', 'meta', 'stream'],
  types: ['movie'],
  idPrefixes: ['nurgay', 'dvdflix', 'fxggxt'],
  catalogs: [{ type: 'movie', id: 'gay-catalog', name: 'Gay Adult Movies (Live)', genres: ['Arab', 'Brazilian', 'Bareback'] }],
  behaviorHints: { adult: true }
};

app.get('/manifest.json', (req, res) => res.json(manifest));

app.get('/catalog/movie/gay-catalog.json', (req, res) => res.json({
  metas: movies.map(m => ({ id: m.id, type: m.type, name: m.name, poster: m.poster }))
}));

app.get('/meta/movie/:id.json', (req, res) => {
  const m = movies.find(x => x.id === req.params.id);
  if (!m) return res.status(404).send('Not found');
  res.json({ meta: {
    id: m.id, type: 'movie', name: m.name,
    poster: m.poster, description: m.category, background: ''
  }});
});

app.get('/stream/movie/:id.json', (req, res) => {
  const m = movies.find(x => x.id === req.params.id);
  if (!m) return res.status(404).send('Not found');
  const streams = [];
  if (m.magnet) streams.push({ title: 'Real‑Debrid (Magnet)', url: m.magnet });
  if (m.embed) streams.push({ title: 'Web Stream (Embed)', url: m.embed });
  res.json({ streams });
});

async function doScrape() {
  console.log(`[${new Date().toISOString()}] 🔍 Running scrapeAll()`);
  const data = await scrapeAll();
  movies = data;
}

app.listen(PORT, () => {
  console.log(`🚀 server listening on port ${PORT}`);
  doScrape();
});

cron.schedule('0 */12 * * *', doScrape);