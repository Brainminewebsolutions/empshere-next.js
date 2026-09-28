import fs from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";
import sharp from "sharp";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

// Read VisitorSecurityVector JSX and extract SVG markup
const componentContent = fs.readFileSync("components/VisitorSecurityVector.jsx", "utf8");

// Extract the svg tag contents
const svgMatch = componentContent.match(/<svg[\s\S]*<\/svg>/);
if (!svgMatch) {
  console.error("Could not find SVG in VisitorSecurityVector.jsx");
  process.exit(1);
}

// Convert React JSX attributes to standard HTML/SVG attributes
let svgMarkup = svgMatch[0]
  .replace(/className="[^"]*"/g, "")
  .replace(/fillRule="evenodd"/g, 'fill-rule="evenodd"')
  .replace(/clipRule="evenodd"/g, 'clip-rule="evenodd"')
  .replace(/strokeWidth=/g, "stroke-width=")
  .replace(/strokeLinecap=/g, "stroke-linecap=")
  .replace(/strokeLinejoin=/g, "stroke-linejoin=")
  .replace(/strokeDasharray=/g, "stroke-dasharray=")
  .replace(/strokeOpacity=/g, "stroke-opacity=")
  .replace(/fillOpacity=/g, "fill-opacity=")
  .replace(/pointerEvents=/g, "pointer-events=")
  .replace(/stopColor=/g, "stop-color=")
  .replace(/stopOpacity=/g, "stop-opacity=")
  .replace(/fontSize=/g, "font-size=")
  .replace(/fontWeight=/g, "font-weight=")
  .replace(/letterSpacing=/g, "letter-spacing=")
  .replace(/textTransform=/g, "text-transform=");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: transparent;
    width: 1240px;
    height: 960px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }
  .stage {
    width: 1240px;
    height: 960px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg {
    width: 100%;
    height: 100%;
  }
</style>
</head>
<body>
<div class="stage">
  ${svgMarkup}
</div>
</body>
</html>
`;

const tmpHtml = path.join(os.tmpdir(), "temp-vms-security.html");
const tmpPng = path.join(os.tmpdir(), "temp-vms-security.png");

fs.writeFileSync(tmpHtml, html, "utf8");
console.log("Written", tmpHtml);

const cmd = `"${EDGE_PATH}" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=1240,960 --default-background-color=00000000 --screenshot="${tmpPng}" "file://${tmpHtml.replace(/\\/g, "/")}"`;
execSync(cmd, { stdio: "inherit" });
console.log("Rendered", tmpPng);

async function processImage() {
  const metadata = await sharp(tmpPng).metadata();
  console.log("Rendered image size:", metadata.width, metadata.height);

  const trimmed = await sharp(tmpPng)
    .trim({ threshold: 5 })
    .webp({ quality: 96, lossless: false, effort: 6 })
    .toBuffer();

  const finalInfo = await sharp(trimmed).metadata();
  console.log("Trimmed final size:", finalInfo.width, finalInfo.height);

  const destPath = path.resolve("app/images/visitor-management-system/workplace-security-visitor-scheduling-illustration.webp");
  fs.writeFileSync(destPath, trimmed);
  console.log("Successfully updated", destPath);

  if (fs.existsSync(tmpHtml)) fs.unlinkSync(tmpHtml);
  if (fs.existsSync(tmpPng)) fs.unlinkSync(tmpPng);
}

processImage().catch(console.error);
