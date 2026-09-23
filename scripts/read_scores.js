import fs from 'fs';

try {
  const content = fs.readFileSync('public/lighthouse_report.json', 'utf8');
  const report = JSON.parse(content);
  const categories = report.categories || {};
  for (const [key, val] of Object.entries(categories)) {
    const score = val.score !== null ? Math.round(val.score * 100) : 'N/A';
    console.log(`${val.title || key}: ${score}/100`);
  }
} catch (e) {
  console.error('Error reading report:', e);
}
