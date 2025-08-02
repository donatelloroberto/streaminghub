const axios = require('axios');
const cheerio = require('cheerio');

const SITES = [
  { name: 'nurgay', url: 'https://nurgay.to', category: 'Arab' },
  { name: 'dvdflix', url: 'https://dvd-flix.com', category: 'Brazilian' },
  { name: 'fxggxt', url: 'https://fxggxt.com', category: 'Bareback' }
];

async function scrapeAll() {
  const all = [];
  for (let site of SITES) {
    try {
      const { data } = await axios.get(site.url);
      const $ = cheerio.load(data);
      $('a.thumb').each((i, el) => {
        const name = $(el).find('img').attr('alt');
        const id = `${site.name}_${$(el).attr('href')}`;
        const poster = $(el).find('img').attr('src');
        const magnet = 'magnet:?xt=urn:btih:EXAMPLE';
        const embed = 'https://doodstream.com/e/example';
        all.push({ id, name, poster, embed, magnet, type: 'movie', category: site.category });
      });
    } catch (err) {
      console.error(`Failed to fetch ${site.url}`, err.message);
    }
  }
  return all.slice(0, 60);
}

module.exports = { scrapeAll };