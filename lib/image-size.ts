import fs from "node:fs";
import path from "node:path";

export interface ImageSize {
  width: number;
  height: number;
}

/**
 * Minimal synchronous image dimension probe for JPEG / PNG / GIF / WebP.
 * Reads only the header bytes — no decode. Returns null for unknown formats
 * or missing files. Server/build-time use only.
 */
export function probeImageSize(filePath: string): ImageSize | null {
  let fd: number;
  try {
    fd = fs.openSync(filePath, "r");
  } catch {
    return null;
  }
  try {
    const header = Buffer.alloc(64);
    const read = fs.readSync(fd, header, 0, 64, 0);
    if (read < 24) return null;

    // PNG: 8-byte signature, IHDR width/height at bytes 16-24
    if (header.readUInt32BE(0) === 0x89504e47) {
      return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
    }

    // GIF: "GIF8", width/height little-endian at 6-10
    if (header.readUInt32BE(0) === 0x47494638) {
      return { width: header.readUInt16LE(6), height: header.readUInt16LE(8) };
    }

    // WebP: "RIFF"...."WEBP", VP8/VP8L/VP8X variants
    if (header.readUInt32BE(0) === 0x52494646 && header.readUInt32BE(8) === 0x57454250) {
      const fourCC = header.readUInt32BE(12);
      if (fourCC === 0x56503820) {
        // VP8 lossy: width/height at 26-30 (14-bit)
        return {
          width: header.readUInt16LE(26) & 0x3fff,
          height: header.readUInt16LE(28) & 0x3fff,
        };
      }
      if (fourCC === 0x5650384c) {
        // VP8L lossless
        const b = header.readUInt32LE(21);
        return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
      }
      if (fourCC === 0x56503858) {
        // VP8X extended: 24-bit minus-one at 24-30
        return {
          width: (header.readUIntLE(24, 3) & 0xffffff) + 1,
          height: (header.readUIntLE(27, 3) & 0xffffff) + 1,
        };
      }
      return null;
    }

    // JPEG: scan SOF markers
    if (header.readUInt16BE(0) === 0xffd8) {
      const buf = Buffer.alloc(256 * 1024);
      const size = fs.readSync(fd, buf, 0, buf.length, 0);
      let offset = 2;
      while (offset + 9 < size) {
        if (buf[offset] !== 0xff) {
          offset++;
          continue;
        }
        const marker = buf[offset + 1];
        // SOF0-SOF15 except DHT/DAC/RST
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
          return { width: buf.readUInt16BE(offset + 7), height: buf.readUInt16BE(offset + 5) };
        }
        const segLen = buf.readUInt16BE(offset + 2);
        offset += 2 + segLen;
      }
      return null;
    }

    return null;
  } catch {
    return null;
  } finally {
    fs.closeSync(fd);
  }
}

/**
 * Resolve a public-URL image path (e.g. "/posts/essay/x/cover.jpg") to a file
 * under `public/` and return its intrinsic dimensions, or null.
 */
export function probePublicImage(src: string): ImageSize | null {
  if (!src || src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return null;
  }
  const clean = src.split("#")[0].split("?")[0];
  const filePath = path.join(process.cwd(), "public", clean);
  return probeImageSize(filePath);
}
