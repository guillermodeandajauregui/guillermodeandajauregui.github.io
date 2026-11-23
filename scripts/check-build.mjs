import fs from 'node:fs';
import path from 'node:path';
const roots=['dist/index.html','dist/research/index.html','dist/projects/index.html','dist/research/cancer/index.html','dist/people/index.html'];
for(const file of roots){if(!fs.existsSync(file)) throw new Error(`Page not built: ${file}`);}
const home=fs.readFileSync('dist/index.html','utf8');
const source=fs.readFileSync('content/home.md','utf8');
for(const s of ['Science is a team sport.','Open. Free. Collaborative.','What we work on']){
 if(!source.includes(s)) throw new Error(`Home smoke test input missing: ${s}`);
 if(!home.includes(s)) throw new Error(`Home Markdown not rendered in output: ${s}`);
}
const all=[];const walk=d=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory()) walk(p);else if(e.name==='index.html') all.push(p)}};walk('dist');
if(all.length < 18) throw new Error(`Expected at least 18 routes, got ${all.length}`);
console.log(`OK: ${all.length} built pages; full homepage Markdown rendered.`);
