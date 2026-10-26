import type { CSSProperties } from "react";
import styles from "./pixel-art.module.css";

/** Class for the self-hosted pixel display face ("Whiskcam Signal"). */
export const signalType = styles.signal;

// Original Whiskcam sprites, one string per row. "X" is drawn in
// currentColor, "O" in --pixel-accent; anything else is transparent.
const SPRITES = {
  cat: [
    "X..........X",
    "XX........XX",
    "XXX......XXX",
    "XXXXXXXXXXXX",
    "XXXXXXXXXXXX",
    "XX..XXXX..XX",
    "XX.OXXXXO.XX",
    "XXXXX..XXXXX",
    ".XXXXXXXXXX.",
    "..XXXXXXXX..",
  ],
  pumpkin: [
    ".....XX....",
    "....XX.....",
    "..OOOOOOO..",
    ".OOOOOOOOO.",
    "OO..OOO..OO",
    "OOOOOOOOOOO",
    "OO.O.O.O.OO",
    "OOO.O.O.OOO",
    ".OOOOOOOOO.",
    "..OOOOOOO..",
  ],
  bat: [
    "X.....X.X.....X",
    "XX....XXX....XX",
    "XXX..XXXXX..XXX",
    "XXXXXXXXXXXXXXX",
    ".XXXXXXXXXXXXX.",
    "..X..XXXXX..X..",
    "......XXX......",
  ],
  leaf: [
    ".....OOO.",
    "...OOOOOO",
    "..OOOOOXO",
    ".OOOOOXOO",
    ".OOOOXOOO",
    "OOOXOOOO.",
    "OOXOOOO..",
    ".XOOO....",
    "X........",
  ],
} as const;

export type SpriteName = keyof typeof SPRITES;

/** A crisp SVG sprite. Decorative unless given a `title`. */
export function PixelSprite({
  name,
  size,
  className,
  style,
  title,
}: {
  name: SpriteName;
  /** Rendered height in px; width follows the sprite's aspect ratio. */
  size: number;
  className?: string;
  style?: CSSProperties;
  title?: string;
}) {
  const rows = SPRITES[name];
  const width = rows[0]!.length;
  const height = rows.length;
  const runs: { x: number; y: number; w: number; accent: boolean }[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < width) {
      const cell = row[x];
      if (cell !== "X" && cell !== "O") {
        x++;
        continue;
      }
      let w = 1;
      while (row[x + w] === cell) w++;
      runs.push({ x, y, w, accent: cell === "O" });
      x += w;
    }
  });
  return (
    <svg
      className={[styles.sprite, className].filter(Boolean).join(" ")}
      style={style}
      viewBox={`0 0 ${width} ${height}`}
      width={(size * width) / height}
      height={size}
      shapeRendering="crispEdges"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {runs.map(({ x, y, w, accent }) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={w}
          height={1}
          fill={accent ? "var(--pixel-accent, currentColor)" : "currentColor"}
        />
      ))}
    </svg>
  );
}
