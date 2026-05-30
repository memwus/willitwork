const esbuild = require("esbuild")
const postcss = require("postcss")
const tailwindcss = require("tailwindcss")
const autoprefixer = require("autoprefixer")
const fs = require("fs")
const path = require("path")

const isProduction = process.argv.includes("--minify") ||
  process.env.BRIDGETOWN_ENV === "production"

const outdir   = path.join(__dirname, "../output/bt-assets/static")
const cacheDir = path.join(__dirname, "../.bridgetown-cache/frontend-bundling")

fs.mkdirSync(outdir,   { recursive: true })
fs.mkdirSync(cacheDir, { recursive: true })

const postCSSPlugin = {
  name: "postcss",
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const source = fs.readFileSync(args.path, "utf8")
      const result = await postcss([tailwindcss, autoprefixer]).process(source, { from: args.path })
      return { contents: result.css, loader: "css" }
    })
  },
}

// Build JS
esbuild.build({
  entryPoints: { "index": "./frontend/javascript/index.js" },
  bundle: true,
  outdir,
  minify: isProduction,
  entryNames: "[name]",
}).then(() => console.log("✅ JS done")).catch((err) => { console.error(err); process.exit(1) })

// Build CSS separately
esbuild.build({
  entryPoints: { "index": "./frontend/styles/index.css" },
  bundle: true,
  outdir,
  minify: isProduction,
  plugins: [postCSSPlugin],
  entryNames: "[name]",
  loader: { ".css": "css" },
}).then(() => {
  const manifest = {
    "index.js":  "/bt-assets/static/index.js",
    "index.css": "/bt-assets/static/index.css",
  }
  fs.writeFileSync(path.join(cacheDir, "manifest.json"), JSON.stringify(manifest, null, 2))
  console.log("✅ CSS done")
}).catch((err) => { console.error(err); process.exit(1) })
