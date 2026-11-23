// Temporarily insert a canary in home.md, build, assert it survives, restore.
// Run on your own machine with: npm run test:edit
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const filename='content/home.md';
const original=fs.readFileSync(filename,'utf8');
const marker=`BOOYAH-EDIT-CANARY-${Date.now()}`;
try{
 fs.writeFileSync(filename,original+`\n\n${marker}\n`);
 execFileSync('npm',['run','build'],{stdio:'inherit'});
 const html=fs.readFileSync('dist/index.html','utf8');
 if(!html.includes(marker)) throw new Error('Editing home.md did not modify the homepage!');
 console.log('PASS: new arbitrary paragraph in home.md appears in dist/index.html');
} finally {fs.writeFileSync(filename,original);}
