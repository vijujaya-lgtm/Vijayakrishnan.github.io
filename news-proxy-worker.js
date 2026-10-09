// Optional Cloudflare Worker that relays Google News RSS for the news ticker.
// Deploy (free tier is fine), then set NEWS_PROXY in index.html to
//   'https://<your-worker>.workers.dev/?url='
export default {
  async fetch(req) {
    const target = new URL(req.url).searchParams.get('url') || '';
    if (!target.startsWith('https://news.google.com/rss/')) return new Response('Only Google News RSS is allowed', { status: 400 });
    const r = await fetch(target, { cf: { cacheTtl: 600, cacheEverything: true } });
    return new Response(r.body, { status: r.status, headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=600' } });
  }
};
