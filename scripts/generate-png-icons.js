import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Simple CRC32 implementation for PNG chunks
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lengthBuf = Buffer.alloc(4);
  lengthBuf.writeUInt32BE(data.length, 0);

  const toCrc = Buffer.concat([typeBuf, data]);
  const crc = crc32(toCrc);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);

  return Buffer.concat([lengthBuf, toCrc, crcBuf]);
}

function createPng(width, height, pixelFn) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR: 13 bytes
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits per channel
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // Deflate
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Non-interlaced
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Raw image scanlines
  // Each scanline: 1 byte filter type (0x00) + width * 4 bytes RGBA
  const stride = width * 4;
  const rawScanlines = Buffer.alloc(height * (stride + 1));

  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawScanlines[offset++] = 0; // No filter
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFn(x, y, width, height);
      rawScanlines[offset++] = r;
      rawScanlines[offset++] = g;
      rawScanlines[offset++] = b;
      rawScanlines[offset++] = a;
    }
  }

  const deflated = zlib.deflateSync(rawScanlines, { level: 9 });
  const idatChunk = createChunk('IDAT', deflated);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Drawing routine matching the Oratoria emblem:
// Dark navy background (#020617), golden radial glow, microphone & rostrum outline
function drawOratoriaIcon(x, y, w, h, isMaskable = false) {
  const nx = x / w; // 0 to 1
  const ny = y / h; // 0 to 1
  const cx = 0.5;
  const cy = 0.5;
  const dx = nx - cx;
  const dy = ny - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Background: Rich deep navy gradient
  let bgR = 2 + Math.floor(12 * (1 - dist));
  let bgG = 6 + Math.floor(18 * (1 - dist));
  let bgB = 23 + Math.floor(35 * (1 - dist));

  // If not maskable, we can round corners softly
  if (!isMaskable) {
    const cornerRadius = 0.22;
    // Check squircle bounds
    const qx = Math.max(0, Math.abs(dx) - (0.5 - cornerRadius));
    const qy = Math.max(0, Math.abs(dy) - (0.5 - cornerRadius));
    const cDist = Math.sqrt(qx * qx + qy * qy);
    if (cDist > cornerRadius) {
      return [0, 0, 0, 0]; // Transparent outside rounded corner
    }
    // Subtle outer golden border
    if (cDist > cornerRadius - 0.015 || Math.abs(dx) > 0.485 || Math.abs(dy) > 0.485) {
      return [245, 158, 11, 180];
    }
  }

  // Golden glow around center
  const glow = Math.max(0, 1 - dist / 0.42);
  bgR = Math.min(255, bgR + Math.floor(glow * 45));
  bgG = Math.min(255, bgG + Math.floor(glow * 35));
  bgB = Math.min(255, bgB + Math.floor(glow * 5));

  // Acoustic rings
  if (Math.abs(dist - 0.32) < 0.008) return [245, 158, 11, 90];
  if (Math.abs(dist - 0.24) < 0.006) return [245, 158, 11, 140];
  if (Math.abs(dist - 0.17) < 0.005) return [245, 158, 11, 190];

  // Scale emblem inside safe zone (scale down slightly for maskable to stay strictly in safe zone)
  const scale = isMaskable ? 0.75 : 0.88;
  const ex = (nx - 0.5) / scale;
  const ey = (ny - 0.5) / scale;

  // 1. Microphone Capsule (center around ex = 0, ey = -0.10)
  // Capsule body: width 0.16, height 0.24, rounded ends
  const capHalfW = 0.075;
  const capTop = -0.22;
  const capBot = 0.02;

  let inCapsule = false;
  if (Math.abs(ex) <= capHalfW && ey >= capTop + capHalfW && ey <= capBot - capHalfW) {
    inCapsule = true;
  } else if (ey < capTop + capHalfW && ey >= capTop) {
    const cdy = ey - (capTop + capHalfW);
    if (ex * ex + cdy * cdy <= capHalfW * capHalfW) inCapsule = true;
  } else if (ey > capBot - capHalfW && ey <= capBot) {
    const cdy = ey - (capBot - capHalfW);
    if (ex * ex + cdy * cdy <= capHalfW * capHalfW) inCapsule = true;
  }

  if (inCapsule) {
    // Grill lines
    const grillY = ey;
    if (Math.abs(grillY - (-0.14)) < 0.006 || Math.abs(grillY - (-0.10)) < 0.006 || Math.abs(grillY - (-0.06)) < 0.006) {
      return [120, 53, 15, 255]; // Grill dark amber line
    }
    // Gold gradient with vertical highlight
    const highlight = Math.max(0, 1 - Math.abs(ex) / capHalfW);
    const r = Math.min(255, 230 + Math.floor(highlight * 25));
    const g = Math.min(255, 160 + Math.floor(highlight * 60));
    const b = Math.min(255, 15 + Math.floor(highlight * 70));
    return [r, g, b, 255];
  }

  // 2. Microphone U-bracket suspension: arc from ey = -0.05 down to ey = 0.09
  const arcDist = Math.sqrt(ex * ex + (ey - -0.05) * (ey - -0.05));
  if (ey >= -0.05 && ey <= 0.09 && Math.abs(arcDist - 0.12) < 0.016) {
    return [251, 191, 36, 255]; // Golden bracket
  }
  // Bracket stem
  if (ey >= 0.07 && ey <= 0.14 && Math.abs(ex) < 0.014) {
    return [245, 158, 11, 255];
  }

  // 3. Orator Rostrum Base
  // Rostrum desk: ey around 0.14 to 0.165, width 0.22
  if (ey >= 0.14 && ey <= 0.165 && Math.abs(ex) < 0.11) {
    return [251, 191, 36, 255];
  }
  // Rostrum pillar: ey 0.165 to 0.28, width 0.06
  if (ey > 0.165 && ey <= 0.28 && Math.abs(ex) < 0.035) {
    return [217, 119, 6, 255];
  }
  // Rostrum base pedestal: trapezoid ey 0.28 to 0.32, width 0.16 to 0.22
  if (ey > 0.28 && ey <= 0.32) {
    const baseW = 0.08 + (ey - 0.28) * 1.5;
    if (Math.abs(ex) <= baseW) {
      return [245, 158, 11, 255];
    }
  }

  // 4. Spark / Eloquence Diamond atop mic (ex=0, ey=-0.29)
  const sparkDy = Math.abs(ey - (-0.29));
  const sparkDx = Math.abs(ex);
  if (sparkDx * 2 + sparkDy * 1.2 < 0.045) {
    return [254, 240, 138, 255]; // Bright radiant yellow spark
  }

  return [bgR, bgG, bgB, 255];
}

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. pwa-192x192.png
console.log('Generating pwa-192x192.png...');
fs.writeFileSync(
  path.join(publicDir, 'pwa-192x192.png'),
  createPng(192, 192, (x, y, w, h) => drawOratoriaIcon(x, y, w, h, false))
);

// 2. pwa-512x512.png
console.log('Generating pwa-512x512.png...');
fs.writeFileSync(
  path.join(publicDir, 'pwa-512x512.png'),
  createPng(512, 512, (x, y, w, h) => drawOratoriaIcon(x, y, w, h, false))
);

// 3. pwa-maskable-512x512.png (with full-bleed background & safe-zone scaled icon)
console.log('Generating pwa-maskable-512x512.png...');
fs.writeFileSync(
  path.join(publicDir, 'pwa-maskable-512x512.png'),
  createPng(512, 512, (x, y, w, h) => drawOratoriaIcon(x, y, w, h, true))
);

// 4. apple-touch-icon.png (180x180)
console.log('Generating apple-touch-icon.png...');
fs.writeFileSync(
  path.join(publicDir, 'apple-touch-icon.png'),
  createPng(180, 180, (x, y, w, h) => drawOratoriaIcon(x, y, w, h, false))
);

console.log('All PWA PNG icons generated successfully!');
