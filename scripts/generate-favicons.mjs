import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const publicDir = join(projectRoot, 'public');
const svgPath = join(publicDir, 'images', 'logo.svg');

// Read SVG content
const svgContent = readFileSync(svgPath, 'utf8');

// Favicon sizes to generate
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicons() {
  console.log('Generating favicons from logo.svg...');

  // Generate PNG files
  for (const { name, size } of sizes) {
    const outputPath = join(publicDir, name);
    await sharp(Buffer.from(svgContent))
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(outputPath);
    console.log(`Generated ${name} (${size}x${size})`);
  }

  // Generate favicon.ico (32x32)
  const icoBuffer = await sharp(Buffer.from(svgContent))
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  // Create a simple ICO file with the PNG data
  // ICO header: 6 bytes
  // ICO directory entry: 16 bytes per image
  // Then the actual image data
  const width = 32;
  const height = 32;

  // ICO Header
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Image type: 1 = ICO
  icoHeader.writeUInt16LE(1, 4); // Number of images

  // Directory entry
  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(width, 0);     // Width
  dirEntry.writeUInt8(height, 1);    // Height
  dirEntry.writeUInt8(0, 2);         // Color palette
  dirEntry.writeUInt8(0, 3);         // Reserved
  dirEntry.writeUInt16LE(1, 4);      // Color planes
  dirEntry.writeUInt16LE(32, 6);     // Bits per pixel
  dirEntry.writeUInt32LE(icoBuffer.length, 8);  // Size of image data
  dirEntry.writeUInt32LE(22, 12);    // Offset to image data (6 + 16 = 22)

  // Combine all parts
  const icoFile = Buffer.concat([icoHeader, dirEntry, icoBuffer]);
  writeFileSync(join(publicDir, 'favicon.ico'), icoFile);
  console.log('Generated favicon.ico (32x32)');

  // Create site.webmanifest
  const manifest = {
    name: "Mark McDermott",
    short_name: "MarkMcDermott",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone"
  };
  writeFileSync(join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Generated site.webmanifest');

  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
