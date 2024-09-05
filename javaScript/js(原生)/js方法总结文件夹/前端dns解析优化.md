# dns优化

dns-prefetch 脚本
```js
const fs = require('fs');
const { parse } = require('node-html-parse');
const {glob} = require('glob');
const urlRegex = require('url-regex');

const urlPattern = /(https?:\/\/[^/]*)/i

const urls = new Set();

async function searchDomain (){
  const files = await glob('dist/**/*.{html,css,js}');

  for( const file of files ) {
    const source = fs.readFileSync(file, 'utf-8');
    const matches = source.match( urlRegex({ strict:true }))
  
    if (matches) {
      matches.forEach((url) => {
        const match = url.match(urlPattern);
        if (match && match[1]) {
          urls.add(match[1])
        }
      })
    }
  }
}

async function insertLinks(){
  const files = await glob('dist/**/*.html');

  const links = [...urls]
    .map((url => `<Link rel="dns-prefetch" href="${url}"/>`))
    .join('\n')

  for(const file of files){
    const html = fs.readFileSync(file, 'utf-8');
    const root = parse(html);
    const head = root.querySelector('head');
    head.insertAdjacentHTML('afterbegin', links);
    fs.writeFileSync(file, root.toString())
  }
}

async function main(){
  await searchDomain();

  await insertLinks();
}

main();

```