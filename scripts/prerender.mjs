// Build-time prerender: renders each route to static HTML inside the built
// index.html template, so first paint carries real content (fast LCP, real SEO)
// and the client bundle hydrates in place.
//
// Runs after `vite build` (client) + `vite build --ssr` (server entry):
//   dist/index.html            -> home, prerendered
//   dist/broksforge/index.html -> product page, prerendered (a real URL on GH Pages)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8')
const { render } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url))

const routes = [
  { path: '/', out: 'dist/index.html' },
  {
    path: '/broksforge',
    // Both shapes: /broksforge resolves to broksforge.html (GH Pages / sirv
    // extensionless lookup), /broksforge/ to the directory index.
    out: 'dist/broksforge/index.html',
    alsoOut: 'dist/broksforge.html',
    title: "Brok's Forge — The Engineering Platform for AI Agents",
    description:
      'An open-source, multi-tenant platform for registering, versioning, evaluating, benchmarking and debugging AI agents. Java 21 · Spring Boot · PostgreSQL · Next.js 15.',
    url: 'https://gokul.quest/broksforge',
  },
]

for (const route of routes) {
  const appHtml = render(route.path)
  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  if (route.title) {
    html = html
      .replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`)
      .replace(/(<meta name="description"\s+content=")[^"]*(")/s, `$1${route.description}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*(")/s, `$1${route.title}$2`)
      .replace(/(<meta property="og:description"\s+content=")[^"]*(")/s, `$1${route.description}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/s, `$1${route.url}$2`)
      .replace(/(<meta name="twitter:title" content=")[^"]*(")/s, `$1${route.title}$2`)
      .replace(/(<meta name="twitter:description"\s+content=")[^"]*(")/s, `$1${route.description}$2`)
  }

  for (const out of [route.out, route.alsoOut].filter(Boolean)) {
    const outPath = resolve(root, out)
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, html)
    console.log(`prerendered ${route.path} -> ${out} (${(appHtml.length / 1024).toFixed(1)} kB of markup)`)
  }
}
