# Trusted-sources allowlist — injectable copy

**The domains the research agent may cite.** From Mantas's news-worker Top 200, tiers 1–4 (best trust first), each with the spaces it serves. Generated 2026-08-04 from the news-worker source DB — the Notion page ("Trusted-sources allowlist") is the canonical copy; regenerate from `tasks/2026-08-04-trusted-sources-ingest/` when the source DB changes. This file is the plain-markdown copy for injecting into research runs.

**Rules (from the allowlist policy):**
- Cite only domains below. Prefer higher tiers; a claim carried only by a tier-4 source is weak.
- A source outside this list may not be cited. The agent may *propose* it (with an argument for why); a human approves before it joins the list.
- Space tags are advisory routing (which topical space the source usually serves), not hard restrictions.

**Known gap:** government / primary sources (congress.gov, sec.gov — Armando's list) are still pending; the two remain *Proposed* from the 30 Jul call. Until they're approved, cite them via the source-proposal path.

## Tier 1 (27)

| Domain | Spaces |
| --- | --- |
| apnews.com | AI, Crypto, Health, US Politics |
| ft.com | AI, Crypto, Health, US Politics |
| reuters.com | AI, Crypto, Health, US Politics |
| washingtonpost.com | AI, Crypto, Health, US Politics |
| wsj.com | AI, Crypto, Health, US Politics |
| axios.com | AI, Crypto, Health, US Politics, World Affairs |
| bloomberg.com | AI, Crypto, Health, US Politics, World Affairs |
| cnbc.com | AI, Crypto, Health, US Politics, World Affairs |
| forbes.com | AI, Crypto, US Politics, World Affairs |
| wired.com | AI, Crypto, US Politics |
| bbc.com | AI, Health, US Politics, World Affairs |
| arstechnica.com | AI |
| beincrypto.com | Crypto |
| bitcoinmagazine.com | Crypto |
| blockworks.com | Crypto |
| coindesk.com | Crypto |
| cointelegraph.com | Crypto |
| cryptonews.com | Crypto |
| cryptopolitan.com | Crypto |
| cryptoslate.com | Crypto |
| decrypt.co | Crypto |
| dlnews.com | Crypto |
| fortune.com | Crypto |
| protos.com | Crypto |
| theblock.co | Crypto |
| thehill.com | Health, US Politics |
| independent.co.uk | World Affairs |

## Tier 2 (64)

| Domain | Spaces |
| --- | --- |
| nytimes.com | AI, World Affairs |
| economist.com | AI |
| siliconangle.com | AI |
| techcrunch.com | AI |
| the-decoder.com | AI |
| theverge.com | AI |
| thedefiant.io | Crypto |
| u.today | Crypto |
| unchainedcrypto.com | Crypto |
| statnews.com | Health |
| politico.com | general |
| abcnews.com | US Politics, World Affairs |
| cnn.com | US Politics, World Affairs |
| time.com | US Politics, World Affairs |
| 19thnews.org | US Politics |
| aei.org | US Politics |
| americanprogress.org | US Politics |
| boltsmag.org | US Politics |
| brookings.edu | US Politics |
| cato.org | US Politics |
| centerforpolitics.org | US Politics |
| factcheck.org | US Politics |
| federalnewsnetwork.com | US Politics |
| freebeacon.com | US Politics |
| govexec.com | US Politics |
| heritage.org | US Politics |
| huffpost.com | US Politics |
| jacobin.com | US Politics |
| motherjones.com | US Politics |
| nationalreview.com | US Politics |
| newrepublic.com | US Politics |
| pewresearch.org | US Politics |
| politifact.com | US Politics |
| propublica.org | US Politics |
| prospect.org | US Politics |
| rand.org | US Politics |
| realclearpolitics.com | US Politics |
| reason.com | US Politics |
| rollcall.com | US Politics |
| semafor.com | US Politics |
| slate.com | US Politics |
| stateline.org | US Politics |
| talkingpointsmemo.com | US Politics |
| texastribune.org | US Politics |
| theamericanconservative.com | US Politics |
| thebulwark.com | US Politics |
| thedispatch.com | US Politics |
| thefederalist.com | US Politics |
| themarshallproject.org | US Politics |
| thenation.com | US Politics |
| usatoday.com | US Politics |
| vox.com | US Politics |
| washingtonexaminer.com | US Politics |
| washingtonmonthly.com | US Politics |
| afp.com | World Affairs |
| aljazeera.com | World Affairs |
| elpais.com | World Affairs |
| foxnews.com | World Affairs |
| france24.com | World Affairs |
| lemonde.fr | World Affairs |
| politico.eu | World Affairs |
| theatlantic.com | World Affairs |
| theconversation.com | World Affairs |
| theguardian.com | World Affairs |

## Tier 3 (19)

| Domain | Spaces |
| --- | --- |
| artificialintelligence-news.com | AI |
| businessinsider.com | AI |
| venturebeat.com | AI |
| zdnet.com | AI |
| bankless.com | Crypto |
| sciencedaily.com | Health |
| americasquarterly.org | World Affairs |
| arabnews.com | World Affairs |
| cbsnews.com | World Affairs |
| japantimes.co.jp | World Affairs |
| kyivindependent.com | World Affairs |
| latimes.com | World Affairs |
| nbcnews.com | World Affairs |
| newsweek.com | World Affairs |
| npr.org | World Affairs |
| scmp.com | World Affairs |
| spectator.com | World Affairs |
| theglobeandmail.com | World Affairs |
| warontherocks.com | World Affairs |

## Tier 4 (24)

| Domain | Spaces |
| --- | --- |
| analyticsindiamag.com | AI |
| platformer.news | AI |
| coinedition.com | Crypto |
| coinjournal.net | Crypto |
| coinpedia.org | Crypto |
| coinspeaker.com | Crypto |
| cryptobriefing.com | Crypto |
| nikkei.com | Crypto |
| abc.net.au | World Affairs |
| hindustantimes.com | World Affairs |
| indiatimes.com | World Affairs |
| koreaherald.com | World Affairs |
| news24.com | World Affairs |
| nypost.com | World Affairs |
| nzherald.co.nz | World Affairs |
| sky.com | World Affairs |
| smh.com.au | World Affairs |
| straitstimes.com | World Affairs |
| taipeitimes.com | World Affairs |
| thehindu.com | World Affairs |
| thejakartapost.com | World Affairs |
| themoscowtimes.com | World Affairs |
| theprint.in | World Affairs |
| thestar.com | World Affairs |

## Pending / proposed (not yet approved)

| Domain | Type | Suggested by | Status |
| --- | --- | --- | --- |
| congress.gov | Government / primary | Armando (30 Jul call) | Proposed |
| sec.gov | Government / primary | Armando (30 Jul call) | Proposed |
