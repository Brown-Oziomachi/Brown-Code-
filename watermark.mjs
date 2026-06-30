/**
 * watermark.mjs — browncode.name.ng
 * Places watermark at 75% down the image so it survives object-fit: cover cropping.
 *
 * npm install sharp  →  node watermark.mjs
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

const INPUT_DIR = "./public";
const OUTPUT_DIR = "./public-watermarked";
const WATERMARK_TEXT = "sirbrownad.name.ng"; 
const OPACITY = 0.45;

// Font scales with image width
function getFontSize(width) { return Math.max(18, Math.round(width * 0.026)); }
function getPadding(width) { return Math.max(16, Math.round(width * 0.020)); }

// Y position: 75% down the image — safely inside object-fit: cover viewport
// regardless of how the container crops the image
function getYPos(height) { return Math.round(height * 0.50); }

const SKIP = [
  "favicon.ico", "favicon.png", "logo.png", "logoo.png",
  "og-image.png", "apple-touch-icon.png",
];

const SUPPORTED = [".jpg", ".jpeg", ".png", ".webp"];

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const files = fs.readdirSync(INPUT_DIR).filter((f) => {
  if (SKIP.includes(f)) return false;
  return SUPPORTED.includes(path.extname(f).toLowerCase());
});

if (files.length === 0) { console.log("No images found."); process.exit(0); }

console.log(`Found ${files.length} image(s). Processing...\n`);

for (const file of files) {
  const inputPath = path.join(INPUT_DIR, file);
  const outputPath = path.join(OUTPUT_DIR, file);

  const meta = await sharp(inputPath).metadata();
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

  await sharp(inputPath)
    .composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }])
    .toFile(outputPath);

  console.log(`✓ ${file}  (${width}x${height} → font: ${fontSize}px, y: ${yPos}px)`);
}

console.log(`\nDone. Saved to: ${OUTPUT_DIR}`);
