/**
 * Sync latest Instagram reels to public/videos/social and public/images/social.
 *
 * Usage: npm run sync:reels
 *
 * Uses yt-dlp (preferred) to download MP4s and poster thumbnails.
 * Update REEL_SHORTCODES with the latest IDs from
 * https://www.instagram.com/ikigaihospitals/reels/
 */

import { access, mkdir, rename, unlink } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const YT_DLP = path.join(__dirname, 'yt-dlp.exe')
const YT_DLP_URL =
  'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe'

/** Latest reel shortcodes — newest first. */
const REEL_SHORTCODES = [
  'DcgScDUkxX7',
  'DcTV3yMFOtO',
  'DcOMXdjFfWx',
  'DcF4Lq0jdTx',
]

async function fileExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function ensureYtDlp() {
  if (await fileExists(YT_DLP)) return YT_DLP

  console.log('Downloading yt-dlp…')
  const response = await fetch(YT_DLP_URL)
  if (!response.ok) {
    throw new Error(`Failed to download yt-dlp: ${response.status}`)
  }

  const { writeFile } = await import('node:fs/promises')
  await writeFile(YT_DLP, Buffer.from(await response.arrayBuffer()))
  console.log('  yt-dlp saved to scripts/yt-dlp.exe')
  return YT_DLP
}

function runYtDlp(ytDlpPath, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ytDlpPath, args, { stdio: 'inherit', shell: false })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`yt-dlp exited with code ${code}`))
    })
  })
}

async function downloadReel(ytDlpPath, shortcode, reelNum, videoDir, posterDir) {
  const url = `https://www.instagram.com/reel/${shortcode}/`
  const videoPath = path.join(videoDir, `reel-${reelNum}.mp4`)
  const thumbPath = path.join(videoDir, `reel-${reelNum}.jpg`)
  const posterPath = path.join(posterDir, `reel-${reelNum}-poster.jpg`)

  await runYtDlp(ytDlpPath, [
    '--no-playlist',
    '-f',
    'best[ext=mp4]/best',
    '--write-thumbnail',
    '--convert-thumbnails',
    'jpg',
    '-o',
    path.join(videoDir, `reel-${reelNum}.%(ext)s`),
    url,
  ])

  if (!(await fileExists(videoPath))) {
    throw new Error(`Video not saved for ${shortcode}`)
  }

  if (await fileExists(thumbPath)) {
    if (await fileExists(posterPath)) await unlink(posterPath)
    await rename(thumbPath, posterPath)
  }

  return { videoPath, posterPath }
}

async function main() {
  const videoDir = path.join(ROOT, 'public', 'videos', 'social')
  const posterDir = path.join(ROOT, 'public', 'images', 'social')

  await mkdir(videoDir, { recursive: true })
  await mkdir(posterDir, { recursive: true })

  const ytDlpPath = await ensureYtDlp()

  console.log(`Syncing ${REEL_SHORTCODES.length} reels from @ikigaihospitals…`)

  for (const [index, shortcode] of REEL_SHORTCODES.entries()) {
    const reelNum = index + 1
    console.log(`\n[${reelNum}/${REEL_SHORTCODES.length}] ${shortcode}`)

    const { videoPath, posterPath } = await downloadReel(
      ytDlpPath,
      shortcode,
      reelNum,
      videoDir,
      posterDir,
    )

    console.log(`  video → ${path.relative(ROOT, videoPath)}`)
    if (await fileExists(posterPath)) {
      console.log(`  poster → ${path.relative(ROOT, posterPath)}`)
    }
  }

  console.log('\nDone. Re-run after publishing new reels to refresh local assets.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
