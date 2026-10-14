// Neutral local placeholders only; no AI generation or network requests.
// Run manually only when you want to replace all image slots with placeholders.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
await mkdir(new URL("../public/images/", import.meta.url), { recursive: true });
const slots = [
  ["hero", "Your driving journey", 1200, 850],
  ["program-1", "Female to Female Mentor", 900, 300],
  ["program-2", "One-to-One Mentor", 900, 300],
  ["program-3", "Street Confidence", 900, 300],
  ["program-4", "Parking Mastery", 900, 300],
  ["program-5", "Highway Training", 1100, 300],
  ["program-6", "Independent Driving", 1100, 300],
  ["banner", "", 1400, 260],
  ["avatar-1", "PS", 120, 120], ["avatar-2", "AK", 120, 120], ["avatar-3", "MR", 120, 120],
];
for (const [name, label, width, height] of slots) {
  const avatar = name.startsWith("avatar");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#E6F5F3"/>${!avatar ? `<path d="M0 ${height}L${width} 0" stroke="#d5e9e4" stroke-width="${height * .5}"/><g transform="translate(${width / 2 - 30},${height / 2 - 42})" fill="none" stroke="#7cae9e" stroke-width="2.5"><rect x="5" y="10" width="50" height="34" rx="4"/><circle cx="20" cy="21" r="4"/><path d="m7 39 14-11 10 7 9-12 13 16"/></g>` : ""}<text x="50%" y="${avatar ? "53%" : "59%"}" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="${avatar ? 34 : 20}" fill="#487f6d">${label}</text>${!avatar && label ? `<text x="50%" y="${height / 2 + 55}" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" letter-spacing="2" fill="#6B7280">TEMPORARY IMAGE</text>` : ""}</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(fileURLToPath(new URL(`../public/images/${name}.jpg`, import.meta.url)));
}
console.log("Created 10 temporary local image files.");
