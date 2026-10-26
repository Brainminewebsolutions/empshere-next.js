const fs = require('fs');
const path = require('path');

// Only a static export writes the sitemap to out/; a server build writes it
// straight to public/, and an old out/ folder must not overwrite it.
if (process.env.BUILD_TARGET !== 'static') process.exit(0);

const outDir = path.join(__dirname, '..', 'out');
const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

['sitemap.xml', 'robots.txt'].forEach((file) => {
  const src = path.join(outDir, file);
  const dest = path.join(publicDir, file);

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✔ [sitemap-sync] Successfully copied ${file} to public/`);
  }
});
