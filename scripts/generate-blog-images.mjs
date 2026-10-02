// Generates one unique 1200x675 header image per blog article from real
// Whiskcam POV frames and product photos, plus the article's key facts.
// Run: node scripts/generate-blog-images.mjs  (writes public/images/blog/guides/)
// Every figure drawn here must match the article text and lib/content.ts.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";

const require = createRequire(import.meta.url);
let sharp;
try {
  sharp = require("sharp");
} catch {
  sharp = require("../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp");
}

const W = 1200;
const H = 675;
const PHOTO_W = 640;
const OUT = "public/images/blog/guides";
const INK = "#242920";
const CREAM = "#f5f3ec";
const OLIVE = "#596346";
const AMBER = "#f5a623";
const FONT = "'Segoe UI', 'DM Sans', Arial, sans-serif";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Greedy word wrap by approximate character width. */
function wrap(text, maxChars) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    if ((line + " " + word).trim().length > maxChars && line) {
      lines.push(line);
      line = word;
    } else line = (line + " " + word).trim();
  }
  if (line) lines.push(line);
  return lines;
}

/** Facts: list of strings, or {bars:[{label,value,unit}]} for a bar chart. */
function panel({ kicker, title, facts, bars, note }) {
  const x = PHOTO_W + 48;
  const width = W - PHOTO_W - 96;
  let y = 92;
  let svg = `<text x="${x}" y="${y}" font-family="${FONT}" font-size="20" font-weight="700" letter-spacing="3" fill="${OLIVE}">${esc(kicker.toUpperCase())}</text>`;
  y += 30;
  for (const l of wrap(title, 22)) {
    y += 50;
    svg += `<text x="${x}" y="${y}" font-family="${FONT}" font-size="44" font-weight="700" fill="${INK}">${esc(l)}</text>`;
  }
  y += 24;
  svg += `<rect x="${x}" y="${y}" width="64" height="6" rx="3" fill="${AMBER}"/>`;
  y += 36;
  if (bars) {
    const max = Math.max(...bars.map((b) => b.value));
    for (const b of bars) {
      y += 12;
      svg += `<text x="${x}" y="${y + 10}" font-family="${FONT}" font-size="21" fill="${INK}">${esc(b.label)}</text>`;
      y += 22;
      const bw = Math.round(((width - 110) * b.value) / max);
      svg += `<rect x="${x}" y="${y}" width="${bw}" height="26" rx="5" fill="${b.highlight ? AMBER : OLIVE}"/>`;
      svg += `<text x="${x + bw + 12}" y="${y + 21}" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}">${esc(String(b.value) + " " + b.unit)}</text>`;
      y += 40;
    }
  } else {
    for (const f of facts) {
      const lines = wrap(f, 34);
      y += 8;
      svg += `<circle cx="${x + 7}" cy="${y + 15}" r="6" fill="${AMBER}"/>`;
      for (const l of lines) {
        y += 32;
        svg += `<text x="${x + 26}" y="${y}" font-family="${FONT}" font-size="25" fill="${INK}">${esc(l)}</text>`;
      }
      y += 10;
    }
  }
  if (note) {
    svg += `<text x="${x}" y="${H - 70}" font-family="${FONT}" font-size="17" fill="${OLIVE}">${esc(note)}</text>`;
  }
  svg += `<text x="${x}" y="${H - 36}" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}">whiskcam.com</text>`;
  return svg;
}

async function render(slug, photo, spec) {
  const img = await sharp(`public/images/${photo.src}`)
    .resize(PHOTO_W, H, { fit: "cover", position: photo.position ?? "centre" })
    .toBuffer();
  const label = photo.label
    ? `<rect x="24" y="${H - 64}" width="${photo.label.length * 10.5 + 32}" height="40" rx="20" fill="rgba(36,41,32,0.78)"/>
       <text x="40" y="${H - 37}" font-family="${FONT}" font-size="19" font-weight="600" fill="#ffffff">${esc(photo.label)}</text>`
    : "";
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="${PHOTO_W}" y="0" width="${W - PHOTO_W}" height="${H}" fill="${CREAM}"/>
    ${label}
    ${panel(spec)}
  </svg>`;
  await sharp({
    create: { width: W, height: H, channels: 3, background: CREAM },
  })
    .composite([
      { input: img, left: 0, top: 0 },
      { input: Buffer.from(svg), left: 0, top: 0 },
    ])
    .webp({ quality: 82 })
    .toFile(`${OUT}/${slug}.webp`);
  console.log("wrote", `${OUT}/${slug}.webp`);
}

const POV = "Real Whiskcam POV frame";

export const IMAGES = {
  "best-cat-collar-cameras-2026": {
    photo: { src: "pov/wk-pov-2.webp", label: POV },
    spec: {
      kicker: "Buying guide 2026",
      title: "Best cat collar cameras compared",
      bars: [
        { label: "Mr Petcam HD (listed)", value: 16, unit: "g" },
        { label: "Whiskcam Original", value: 24, unit: "g", highlight: true },
        { label: "Insta360 GO 3S, camera only", value: 39.1, unit: "g" },
      ],
      note: "Published camera-body weights, reviewed Sept 2026",
    },
  },
  "are-cat-collar-cameras-safe": {
    photo: { src: "product/whiskcam-scale.webp" },
    spec: {
      kicker: "Safety guide",
      title: "Are cat collar cameras safe?",
      facts: [
        "Add up camera, mount, collar and tags",
        "Quick-release collar, two-finger fit",
        "Start with a short supervised trial",
        "Remove it if movement changes",
      ],
    },
  },
  "cat-collar-weight-chart-by-size": {
    photo: { src: "product/whiskcam-scale.webp", position: "left" },
    spec: {
      kicker: "Weight chart",
      title: "Total collar load by cat size",
      facts: [
        "Total load = camera + collar + mount + tags",
        "Example: 24 g + 16 g = 40 g on a 4 kg cat = 1.0%",
        "A percentage is not a safety verdict",
      ],
    },
  },
  "mr-petcam-vs-whiskcam": {
    photo: { src: "product/whiskcam-product-studio.webp" },
    spec: {
      kicker: "Comparison",
      title: "Mr Petcam HD vs Whiskcam",
      facts: [
        "Listed weight: 16 g vs 24 g",
        "Night vision: infrared LEDs vs none",
        "MicroSD: 16 GB listed vs not included",
        "Whiskcam: phone adapter in the kit",
      ],
    },
  },
  "how-to-watch-avi-on-iphone-cat-cam": {
    photo: { src: "pov/wk-pov-4.webp", label: POV },
    spec: {
      kicker: "How-to",
      title: "Watch cat camera AVI files on iPhone",
      facts: [
        "Connect the card through an adapter",
        "Open or copy the file with the Files app",
        "Play it in an AVI-capable app such as VLC",
        "Or convert to MP4 with HandBrake",
      ],
    },
  },
  "cat-collar-camera-vs-gps-tracker-2026": {
    photo: { src: "pov/wk-pov-sky-whiskers.webp", label: POV },
    spec: {
      kicker: "Camera or tracker?",
      title: "Cat collar camera vs GPS tracker",
      facts: [
        "Camera: what your cat did, seen later",
        "GPS tracker: where your cat is now",
        "Missing cat? Only a tracker helps",
        "Wearing both? Check the combined weight",
      ],
    },
  },
  "i-filmed-my-cat-for-7-days-what-i-learned": {
    photo: { src: "pov/wk-pov-6.webp", label: POV },
    spec: {
      kicker: "Recording plan",
      title: "A 7-day cat camera diary",
      facts: [
        "Choose one question before recording",
        "Keep sessions short and supervised",
        "Log time, place and behaviour",
        "A few clips are not a pattern",
      ],
    },
  },
  "5-weird-discoveries-from-cat-collar-cameras": {
    photo: { src: "pov/wk-pov-8.webp", label: POV },
    spec: {
      kicker: "Cat POV stories",
      title: "What cat collar cameras reveal",
      facts: [
        "Second homes and secret naps",
        "Stand-offs with neighbour cats",
        "Routes you never see from home",
      ],
    },
  },
  "cat-collar-camera-vs-insta360-go-3": {
    photo: { src: "product/whiskcam-product-studio.webp", position: "right" },
    spec: {
      kicker: "Comparison",
      title: "Cat collar camera vs Insta360 GO 3",
      facts: [
        "GO 3: 35.5 g, 2.7K (official specs)",
        "Whiskcam: 24 g, 1080P, offline AVI",
        "GO 3 and GO 3S are different models",
      ],
    },
  },
  "cat-pov-tiktok-viral-guide-2026": {
    photo: { src: "pov/wk-pov-3.webp", label: POV },
    spec: {
      kicker: "Filming guide",
      title: "Cat POV videos for TikTok & Reels",
      facts: [
        "Film short, clear sequences in daylight",
        "Check the vertical crop keeps the action",
        "Keep the original file before editing",
      ],
    },
  },
  "my-cat-found-the-camera-what-to-do": {
    photo: { src: "pov/wk-pov-1.webp", label: POV },
    spec: {
      kicker: "Cat behaviour",
      title: "My cat found the camera",
      facts: [
        "Staring or pawing is usually curiosity",
        "Fixed cameras and collar cameras differ",
        "Stop if your cat seems stressed",
      ],
    },
  },
  "best-cat-collar-camera-for-maine-coon": {
    photo: { src: "lifestyle/wk-cat-outdoor.webp" },
    spec: {
      kicker: "Large cats",
      title: "Collar cameras for Maine Coons",
      facts: [
        "Measure the neck, not the breed",
        "Check that long fur does not cover the lens",
        "Weigh the whole setup",
      ],
    },
  },
  "where-does-my-outdoor-cat-actually-go": {
    photo: { src: "pov/wk-pov-7.webp", label: POV },
    spec: {
      kicker: "Outdoor cats",
      title: "Where does my outdoor cat go?",
      facts: [
        "Cameras show places, GPS shows positions",
        "Most cats keep a core territory",
        "Watch for sudden range changes",
      ],
    },
  },
  "what-cats-do-when-alone-at-home": {
    photo: { src: "lifestyle/chat-unplash-4.webp" },
    spec: {
      kicker: "Indoor cats",
      title: "What cats do when home alone",
      facts: [
        "Long naps, window watching, patrols",
        "Short bursts of solo play",
        "Know the signs of a stressed cat",
      ],
    },
  },
  "is-it-legal-to-put-a-camera-on-your-cat": {
    photo: { src: "pov/wk-pov-4.webp", label: POV, position: "right" },
    spec: {
      kicker: "Privacy & the law",
      title: "Is it legal to put a camera on your cat?",
      facts: [
        "Your home: generally your business",
        "Neighbours and streets: privacy rules apply",
        "Audio is treated more strictly than video",
        "Think twice before posting people online",
      ],
      note: "General information, not legal advice",
    },
  },
};

mkdirSync(OUT, { recursive: true });
const only = process.argv.slice(2);
for (const [slug, { photo, spec }] of Object.entries(IMAGES)) {
  if (only.length && !only.includes(slug)) continue;
  await render(slug, photo, spec);
}
