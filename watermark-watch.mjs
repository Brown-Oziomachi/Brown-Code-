/**
 * watermark-watch.mjs — browncode.name.ng
 */

import sharp from "sharp";
import chokidar from "chokidar";
import fs from "fs";
import path from "path";

const WATCH_DIR = "./public";
const WATERMARK_TEXT = "browncode.name.ng";
const OPACITY = 0.45;

const SKIP = [
    "favicon.ico", "favicon.png", "logo.png", "logoo.png",
    "og-image.png", "apple-touch-icon.png",
];

const SUPPORTED = [".jpg", ".jpeg", ".png", ".webp"];

function getFontSize(width) { return Math.max(18, Math.round(width * 0.026)); }
function getPadding(width) { return Math.max(16, Math.round(width * 0.020)); }
function getYPos(height) { return Math.round(height * 0.50); }

const processed = new Set();

// Keep trying to read the file until it's fully released
async function readFileWithRetry(filePath, attempts = 15, delayMs = 500) {
    for (let i = 0; i < attempts; i++) {
        try {
            const buf = fs.readFileSync(filePath);
            if (buf.length === 0) throw new Error("empty file");
            return buf;
        } catch (err) {
            if (i === attempts - 1) throw err;
            console.log(`  ⏳ Waiting for ${path.basename(filePath)} to be ready... (${i + 1}/${attempts})`);
            await new Promise((r) => setTimeout(r, delayMs));
        }
    }
}

async function watermarkFile(filePath) {
    const file = path.basename(filePath);
    const ext = path.extname(file).toLowerCase();

    if (SKIP.includes(file)) return;
    if (!SUPPORTED.includes(ext)) return;
    if (processed.has(filePath)) return;

    processed.add(filePath);

    try {
        // Read file into buffer with retries — waits until Windows releases the lock
        const inputBuffer = await readFileWithRetry(filePath);

        const meta = await sharp(inputBuffer).metadata();
        const { width, height } = meta;

        const fontSize = getFontSize(width);
        const padding = getPadding(width);
        const yPos = getYPos(height);

        const svgOverlay = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <text
    font-family="Arial, Helvetica, sans-serif"
    font-size="${fontSize}"
    font-weight="bold"
    x="${width - padding + 1}"
    y="${yPos + 1}"
    text-anchor="end"
    fill="rgba(0,0,0,${(OPACITY * 0.6).toFixed(2)})"
  >${WATERMARK_TEXT}</text>
  <text
    font-family="Arial, Helvetica, sans-serif"
    font-size="${fontSize}"
    font-weight="bold"
    x="${width - padding}"
    y="${yPos}"
    text-anchor="end"
    fill="rgba(255,255,255,${OPACITY})"
  >${WATERMARK_TEXT}</text>
</svg>`;

        // Process entirely in memory — no temp files, no renames
        const watermarked = await sharp(inputBuffer)
            .composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }])
            .toBuffer();

        // Write back with retries too
        let written = false;
        for (let i = 0; i < 10; i++) {
            try {
                fs.writeFileSync(filePath, watermarked);
                written = true;
                break;
            } catch (_) {
                await new Promise((r) => setTimeout(r, 400));
            }
        }

        if (!written) throw new Error("Could not write watermarked file after retries");

        console.log(`✓ Watermarked: ${file}  (${width}x${height})`);
    } catch (err) {
        processed.delete(filePath);
        console.error(`✗ Failed: ${file} — ${err.message}`);
    }
}

// No awaitWriteFinish — we handle the waiting ourselves inside watermarkFile
const watcher = chokidar.watch(WATCH_DIR, {
    persistent: true,
    ignoreInitial: true,
    depth: 0,
});

watcher.on("add", (filePath) => {
    watermarkFile(filePath);
});

console.log(`👁  Watching ${WATCH_DIR} for new images...`);
console.log(`    Watermark: "${WATERMARK_TEXT}"`);
console.log(`    Press Ctrl+C to stop.\n`);