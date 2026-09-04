import { readFileSync } from 'node:fs'

const pngPath = new URL('../public/images/icons/emergency-siren.png', import.meta.url)
const bytes = readFileSync(pngPath)

console.log('size', bytes.length)
console.log('header', bytes.subarray(0, 8).toString('hex'))
console.log('ftyp index', bytes.indexOf('ftyp'))
console.log('GIF index', bytes.indexOf('GIF8'))

const text = bytes.toString('latin1')
const urls = [...text.matchAll(/https?:\/\/[^\s"'<>]+\.(?:mp4|webm|mov)/gi)].map((m) => m[0])
console.log('embedded urls', urls.slice(0, 5))
