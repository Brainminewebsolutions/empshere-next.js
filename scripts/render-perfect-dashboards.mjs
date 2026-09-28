import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import sharp from "sharp";

const DIR = "app/images/contract-labour-management-system-software";
const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

// 1. Dashboard 1 HTML: Contractor Liability & Document Status (Wide table, clean header)
const html1 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #ffffff;
    font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #1e293b;
    padding: 20px 24px;
    width: 1330px;
    -webkit-font-smoothing: antialiased;
  }
  .header-bar {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid #f1f5f9;
  }
  .title-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .icon-box {
    width: 38px;
    height: 38px;
    background: #e0f2fe;
    border: 1px solid #bae6fd;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0284c7;
  }
  .title {
    font-size: 19px;
    font-weight: 700;
    color: #0284c7;
    letter-spacing: -0.01em;
  }
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    overflow: hidden;
  }
  thead th {
    background: #009fe3;
    color: #ffffff;
    font-size: 13.5px;
    font-weight: 700;
    padding: 13px 8px;
    text-align: center;
    border-right: 1px solid rgba(255, 255, 255, 0.25);
    white-space: nowrap;
    letter-spacing: 0.01em;
  }
  thead th:first-child {
    text-align: left;
    padding-left: 18px;
    width: 290px;
  }
  thead th:last-child {
    border-right: none;
  }
  tbody tr {
    transition: background 0.15s ease;
  }
  tbody tr:nth-child(even) {
    background: #f8fafc;
  }
  tbody tr:nth-child(odd) {
    background: #ffffff;
  }
  tbody td {
    padding: 12px 8px;
    font-size: 14px;
    text-align: center;
    border-top: 1px solid #e2e8f0;
    border-right: 1px solid #f1f5f9;
  }
  tbody td:first-child {
    text-align: left;
    font-weight: 600;
    color: #0f172a;
    padding-left: 18px;
    border-right: 1px solid #e2e8f0;
    white-space: nowrap;
  }
  tbody td:last-child {
    border-right: none;
  }
  .val-zero {
    color: #64748b;
    font-weight: 500;
  }
  .val-active {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 46px;
    padding: 4px 8px;
    border-radius: 6px;
    background: #eff6ff;
    color: #0284c7;
    font-weight: 700;
    border: 1px solid #bae6fd;
    font-size: 13.5px;
  }
  .val-high {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 46px;
    padding: 4px 8px;
    border-radius: 6px;
    background: #eff6ff;
    color: #0284c7;
    font-weight: 800;
    border: 1.5px solid #0284c7;
    font-size: 13.5px;
  }
</style>
</head>
<body>
  <div class="header-bar">
    <div class="title-group">
      <div class="icon-box">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>
      <h2 class="title">Custom Contractor Liability Document Percentage</h2>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Contractor Name</th>
        <th>May-2024</th>
        <th>Jun-2024</th>
        <th>Jul-2024</th>
        <th>Aug-2024</th>
        <th>Sep-2024</th>
        <th>Oct-2024</th>
        <th>Nov-2024</th>
        <th>Dec-2024</th>
        <th>Jan-2025</th>
        <th>Feb-2025</th>
        <th>Mar-2025</th>
        <th>Apr-2025</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Cushman And Wakefield</td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-active">30%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
      </tr>
      <tr>
        <td>Amps Facilities Management Services</td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-active">20%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-active">6%</span></td>
      </tr>
      <tr>
        <td>Aqua Chill Systems India Pvt Ltd</td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-active">5%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-active">5%</span></td>
      </tr>
      <tr>
        <td>Lift Tech</td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-high">60%</span></td>
      </tr>
      <tr>
        <td>Ador Powertron Ltd</td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-active">13%</span></td>
        <td><span class="val-active">38%</span></td>
        <td><span class="val-active">32%</span></td>
        <td><span class="val-high">83%</span></td>
      </tr>
      <tr>
        <td>Shravani Services</td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-zero">0%</span></td>
        <td><span class="val-active">5%</span></td>
        <td><span class="val-active">21%</span></td>
        <td><span class="val-active">15%</span></td>
      </tr>
    </tbody>
  </table>
</body>
</html>`;

// 2. Dashboard 2 HTML: Contractor Wise Head Count and OT (Clean header, no subsidiary box)
const html2 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #ffffff;
    font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #1e293b;
    padding: 16px 18px;
    width: 610px;
    -webkit-font-smoothing: antialiased;
  }
  .header-bar {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  .title-group {
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .icon-box {
    width: 32px;
    height: 32px;
    background: #e0f2fe;
    border: 1px solid #bae6fd;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0284c7;
  }
  .title {
    font-size: 15.5px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.01em;
  }
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    overflow: hidden;
  }
  thead tr:first-child th {
    background: #009fe3;
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    padding: 9px 4px;
    text-align: center;
    border-right: 1px solid rgba(255, 255, 255, 0.25);
  }
  thead tr:first-child th.col-sr {
    width: 44px;
  }
  thead tr:first-child th.col-entity {
    width: 165px;
    text-align: left;
    padding-left: 12px;
  }
  thead tr:first-child th.col-tot {
    width: 65px;
    border-right: none;
  }
  thead tr:nth-child(2) th {
    background: #0284c7;
    color: #e0f2fe;
    font-size: 11.5px;
    font-weight: 600;
    padding: 5px 2px;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }
  tbody td {
    padding: 10px 4px;
    font-size: 13.5px;
    text-align: center;
    border-top: 1px solid #e2e8f0;
    border-right: 1px solid #f1f5f9;
  }
  tbody td.td-entity {
    text-align: left;
    font-weight: 600;
    color: #0f172a;
    padding-left: 12px;
    border-right: 1px solid #e2e8f0;
  }
  tbody tr:nth-child(even) {
    background: #f8fafc;
  }
  tbody tr:nth-child(odd) {
    background: #ffffff;
  }
  .badge-row-tot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 38px;
    padding: 3px 6px;
    border-radius: 5px;
    background: #eff6ff;
    color: #0284c7;
    font-weight: 700;
    border: 1px solid #bae6fd;
    font-size: 13px;
  }
  tfoot tr {
    background: #f1f5f9;
  }
  tfoot td {
    padding: 10px 4px;
    font-size: 13.5px;
    color: #0f172a;
    text-align: center;
    border-top: 2px solid #cbd5e1;
    border-right: 1px solid #e2e8f0;
  }
  tfoot td.tfoot-label {
    text-align: center;
    font-weight: 800;
    letter-spacing: 0.02em;
    border-right: 1px solid #cbd5e1;
  }
  .badge-grand-tot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    padding: 4px 8px;
    border-radius: 6px;
    background: #0284c7;
    color: #ffffff;
    font-weight: 800;
    font-size: 14px;
  }
</style>
</head>
<body>
  <div class="header-bar">
    <div class="title-group">
      <div class="icon-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </div>
      <h2 class="title">Contractor Wise Head Count And OT</h2>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th rowspan="2" class="col-sr">Sr No</th>
        <th rowspan="2" class="col-entity">Contractor</th>
        <th colspan="2">Morning</th>
        <th colspan="2">Afternoon</th>
        <th colspan="2">Night</th>
        <th rowspan="2" class="col-tot">Total</th>
      </tr>
      <tr>
        <th>Count</th>
        <th>OT</th>
        <th>Count</th>
        <th>OT</th>
        <th>Count</th>
        <th>OT</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td class="td-entity">Sai Contractor</td>
        <td>13</td>
        <td>0</td>
        <td>17</td>
        <td>7</td>
        <td>11</td>
        <td>6</td>
        <td><span class="badge-row-tot">54</span></td>
      </tr>
      <tr>
        <td>2</td>
        <td class="td-entity">Aditya Birla</td>
        <td>6</td>
        <td>0</td>
        <td>3</td>
        <td>1</td>
        <td>3</td>
        <td>0</td>
        <td><span class="badge-row-tot">13</span></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2" class="tfoot-label">Total</td>
        <td colspan="2"><strong>19</strong></td>
        <td colspan="2"><strong>28</strong></td>
        <td colspan="2"><strong>20</strong></td>
        <td><span class="badge-grand-tot">67</span></td>
      </tr>
    </tfoot>
  </table>
</body>
</html>`;

// 3. Dashboard 3 HTML: Department Wise Head Count and OT (Clean header, no subsidiary box)
const html3 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #ffffff;
    font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #1e293b;
    padding: 16px 18px;
    width: 610px;
    -webkit-font-smoothing: antialiased;
  }
  .header-bar {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  .title-group {
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .icon-box {
    width: 32px;
    height: 32px;
    background: #e0f2fe;
    border: 1px solid #bae6fd;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0284c7;
  }
  .title {
    font-size: 15.5px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.01em;
  }
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    overflow: hidden;
  }
  thead tr:first-child th {
    background: #009fe3;
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    padding: 9px 4px;
    text-align: center;
    border-right: 1px solid rgba(255, 255, 255, 0.25);
  }
  thead tr:first-child th.col-sr {
    width: 44px;
  }
  thead tr:first-child th.col-entity {
    width: 165px;
    text-align: left;
    padding-left: 12px;
  }
  thead tr:first-child th.col-tot {
    width: 65px;
    border-right: none;
  }
  thead tr:nth-child(2) th {
    background: #0284c7;
    color: #e0f2fe;
    font-size: 11.5px;
    font-weight: 600;
    padding: 5px 2px;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }
  tbody td {
    padding: 10px 4px;
    font-size: 13.5px;
    text-align: center;
    border-top: 1px solid #e2e8f0;
    border-right: 1px solid #f1f5f9;
  }
  tbody td.td-entity {
    text-align: left;
    font-weight: 600;
    color: #0f172a;
    padding-left: 12px;
    border-right: 1px solid #e2e8f0;
  }
  tbody tr:nth-child(even) {
    background: #f8fafc;
  }
  tbody tr:nth-child(odd) {
    background: #ffffff;
  }
  .badge-row-tot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 38px;
    padding: 3px 6px;
    border-radius: 5px;
    background: #eff6ff;
    color: #0284c7;
    font-weight: 700;
    border: 1px solid #bae6fd;
    font-size: 13px;
  }
  tfoot tr {
    background: #f1f5f9;
  }
  tfoot td {
    padding: 10px 4px;
    font-size: 13.5px;
    color: #0f172a;
    text-align: center;
    border-top: 2px solid #cbd5e1;
    border-right: 1px solid #e2e8f0;
  }
  tfoot td.tfoot-label {
    text-align: center;
    font-weight: 800;
    letter-spacing: 0.02em;
    border-right: 1px solid #cbd5e1;
  }
  .badge-grand-tot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    padding: 4px 8px;
    border-radius: 6px;
    background: #0284c7;
    color: #ffffff;
    font-weight: 800;
    font-size: 14px;
  }
</style>
</head>
<body>
  <div class="header-bar">
    <div class="title-group">
      <div class="icon-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      </div>
      <h2 class="title">Department Wise Head Count And OT</h2>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th rowspan="2" class="col-sr">Sr No</th>
        <th rowspan="2" class="col-entity">Department</th>
        <th colspan="2">Morning</th>
        <th colspan="2">Afternoon</th>
        <th colspan="2">Night</th>
        <th rowspan="2" class="col-tot">Total</th>
      </tr>
      <tr>
        <th>Count</th>
        <th>OT</th>
        <th>Count</th>
        <th>OT</th>
        <th>Count</th>
        <th>OT</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td class="td-entity">MOULD SHOP</td>
        <td>16</td>
        <td>0</td>
        <td>17</td>
        <td>7</td>
        <td>12</td>
        <td>5</td>
        <td><span class="badge-row-tot">57</span></td>
      </tr>
      <tr>
        <td>2</td>
        <td class="td-entity">ADMIN</td>
        <td>3</td>
        <td>0</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>1</td>
        <td><span class="badge-row-tot">10</span></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2" class="tfoot-label">Total</td>
        <td colspan="2"><strong>19</strong></td>
        <td colspan="2"><strong>28</strong></td>
        <td colspan="2"><strong>20</strong></td>
        <td><span class="badge-grand-tot">67</span></td>
      </tr>
    </tfoot>
  </table>
</body>
</html>`;

const items = [
  {
    name: "dashboard-contractor-liability-document-status",
    html: html1,
    width: 1330,
    height: 510,
    targetFile: path.join(DIR, "dashboard-contractor-liability-document-status.webp")
  },
  {
    name: "dashboard-contractor-wise-headcount-overtime",
    html: html2,
    width: 610,
    height: 330,
    targetFile: path.join(DIR, "dashboard-contractor-wise-headcount-overtime.webp")
  },
  {
    name: "dashboard-department-wise-headcount-overtime",
    html: html3,
    width: 610,
    height: 330,
    targetFile: path.join(DIR, "dashboard-department-wise-headcount-overtime.webp")
  }
];

async function run() {
  for (const item of items) {
    const tmpHtml = path.resolve(`temp_${item.name}.html`);
    const tmpPng = path.resolve(`temp_${item.name}.png`);
    
    fs.writeFileSync(tmpHtml, item.html, "utf8");
    
    // Screenshot using Edge headless at 2x device-scale-factor for razor-sharp text
    const cmd = `"${EDGE_PATH}" --headless --disable-gpu --force-device-scale-factor=2 --hide-scrollbars --window-size=${item.width},${item.height} --screenshot="${tmpPng}" "file://${tmpHtml.replace(/\\/g, "/")}"`;
    
    console.log(`Rendering ${item.name}...`);
    execSync(cmd, { stdio: "inherit" });
    
    // Convert to high-quality WebP
    await sharp(tmpPng)
      .webp({ quality: 96, lossless: false, effort: 6 })
      .toFile(item.targetFile);
    
    console.log(`Saved -> ${item.targetFile}`);
    
    // Cleanup temp files
    if (fs.existsSync(tmpHtml)) fs.unlinkSync(tmpHtml);
    if (fs.existsSync(tmpPng)) fs.unlinkSync(tmpPng);
  }
  console.log("All dashboards generated perfectly!");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
