const fs = require('fs');
const html = fs.readFileSync('about_section.html', 'utf8');

// Parse section blocks
// Look for sections or major containers
const sections = html.split(/<section\b[^>]*>/i);
console.log('Total sections in about_section.html:', sections.length - 1);

sections.slice(1).forEach((sec, idx) => {
  console.log(`\n================ SECTION ${idx + 1} ================`);
  // Print images
  const imgs = [...sec.matchAll(/<img[^>]+(?:title|alt)=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
  console.log('Images:', imgs);
  
  // Extract text
  const text = sec.replace(/<style[\s\S]*?<\/style>/gi, '')
                  .replace(/<script[\s\S]*?<\/script>/gi, '')
                  .replace(/<[^>]+>/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim();
  console.log('Text preview:', text);
});
