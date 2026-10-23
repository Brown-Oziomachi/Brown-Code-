import sharp from "sharp";
import fs from "node:fs";

const SRC = "public/logo.png";
const OUT = "public/icons";
const BG = "#ffffff"; // change this if your logo is white or very light

fs.mkdirSync(OUT, { recursive: true });

async function make(size, file, logoRatio) {
    const inner = Math.round(size * logoRatio);
    const logo = await sharp(SRC)
        .resize(inner, inner, {
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer();

    await sharp({
        create: { width: size, height: size, channels: 4, background: BG },
    })
        .composite([{ input: logo, gravity: "center" }])
        .png()
        .toFile(`${OUT}/${file}`);

    console.log("Created", `${OUT}/${file}`);
}

await make(192, "icon-192.png", 0.84);
await make(512, "icon-512.png", 0.84);
// Maskable: logo kept small in the centre so phones can crop the edges safely
await make(512, "icon-maskable-512.png", 0.6);