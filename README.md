# SMA Malayalam Library

A public web app for the Singapore Malayalee Association's Malayalam book collection (1,901 books, 846 authors).

## What it does
- **Reads the Excel catalogue.** On a web host the page reads `BookList.xlsx` from its own folder (SheetJS). To update the catalogue, replace that file; no code changes. A built-in copy is used if the file is missing, and visitors can also load another Excel list from the footer.
- **Linked dropdowns.** Accession number, author (English / Malayalam) and title (English / Malayalam), plus category. Each list narrows to what is already picked; values that become the only option are filled in automatically (gold dashed fields). Picking an accession number fills everything.
- **Internet lookup with references.** For a selected book: Malayalam and English Wikipedia, Google Books and Open Library are searched for the author's photo and biography, the book's cover and description. Every source is listed with its link, plus quick links to Google, Goodreads etc.
- **Open-source AI assistant.** Qwen 2.5 / Llama 3.2 / Gemma 2 run *in the visitor's browser* with WebLLM (WebGPU: Chrome or Edge on desktop). It writes an English + Malayalam brief of the selected book using only the catalogue record and the sources found, with [n] citations, and answers questions about the collection from the spreadsheet rows. No server, no API key, no cost.
- **Live news ticker.** Latest Malayalam and English literary news from Google News, refreshed every 10 minutes; pause / language switch included.

## Publish it (free, about 10 minutes)
The app is static files, so any static host works.

**GitHub Pages**
1. Create a public repository, e.g. `sma-library`, and upload everything in this folder.
2. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. The site appears at `https://<account>.github.io/sma-library/`.

**Netlify / Cloudflare Pages**: drag this folder onto the dashboard ("Deploy manually").

**Hugging Face Spaces**: New Space → SDK *Static* → upload these files.

Then add the logo as `assets/sma-logo.png` (see the note in that folder).

## Files
| File | Purpose |
|---|---|
| `index.html` | The whole app (includes a built-in copy of the catalogue) |
| `BookList.xlsx` | The catalogue the live page reads. Same columns as the original, plus *Author - Malayalam (transliterated)* |
| `assets/` | Put `sma-logo.png` here |
| `news-proxy-worker.js` | Optional: your own news relay if the free public relays are slow or rate-limited |

## Notes
- Malayalam author names were transliterated for this app (the original sheet had none). Please have a librarian check them in `BookList.xlsx`; corrections show up on the site automatically.
- Web matches are automatic. Titles with no online record (common for Malayalam books) show search links instead of guesses.
- The news ticker uses free public relays (rss2json, allorigins, corsproxy.io) because browsers can't read Google News directly. For dependable service, deploy `news-proxy-worker.js` and set `NEWS_PROXY` in `index.html`.
- The AI assistant downloads the model once (1 to 2 GB) and caches it in the browser. Phones and browsers without WebGPU still get every other feature.
