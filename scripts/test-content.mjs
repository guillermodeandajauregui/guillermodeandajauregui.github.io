import fs from 'node:fs';
import path from 'node:path';
const root='content';
const all=[];
function scan(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,ent.name);if(ent.isDirectory()) scan(file);else if(file.endsWith('.md')) all.push(file);}}
scan(root);
const slugs=new Set(all.map(f=>f.slice(root.length+1,-3).replaceAll('\\','/')));
const errors=[];
for(const file of all){
 const raw=fs.readFileSync(file,'utf8');
 if(!raw.startsWith('---\n')) {errors.push(`${file}: missing YAML frontmatter`); continue;}
 const end=raw.indexOf('\n---\n',4);
 if(end<0) errors.push(`${file}: frontmatter not closed`);
 if(!/^title:\s*\S+/m.test(raw.slice(0,end))) errors.push(`${file}: missing title`);
 if(raw.slice(end+5).trim().length===0) errors.push(`${file}: empty Markdown body`);
 for(const link of raw.matchAll(/\]\((\/[^)#?]+)\/??\)/g)){
   const id=link[1].replace(/^\/|\/$/g,'');
   if(id && id!=='home' && !slugs.has(id)) errors.push(`${file}: local link ${link[1]} has no content page`);
 }
}
if(!slugs.has('home')) errors.push('Missing content/home.md');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`OK: ${all.length} Markdown pages. Every page has frontmatter and body.`);
