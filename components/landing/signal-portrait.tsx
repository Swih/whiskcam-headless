"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Season } from "lib/brand-storefront-copy";
import { PixelSprite, signalType } from "./pixel-art";
import styles from "./storefront-v2.module.css";

/** An existing Whiskcam photo: the camera is visible on the collar. */
const PORTRAIT = "/images/lifestyle/wk-cat-2.webp";
const SIZES = "(max-width: 760px) 100vw, 56vw";
/** The echo moves like a sampled signal: ~12 updates a second, in 3 px steps. */
const FRAME_MS = 83;
const STEP = 3;

/**
 * The hero's scanline portrait. A real photo, rendered as horizontal rules on
 * the cream canvas with an offset seasonal "ghost" echo. The visitor can switch
 * the treatment off to see the untouched photo. Motion is decorative only: it
 * follows a fine pointer, and is skipped for touch and reduced motion.
 */
export function SignalPortrait({
  season,
  credit,
  alt,
  fullColour,
  children,
}: {
  season: Season;
  credit: string;
  alt: string;
  fullColour: string;
  /** Overlaid in the stage, e.g. the real-clip monitor. */
  children?: ReactNode;
}) {
  const stageRef = useRef<HTMLElement>(null);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!stage || !query.matches) return;
    let frame = 0;
    let last = 0;
    let x = 0;
    let y = 0;
    const tick = (time: number) => {
      frame = 0;
      if (time - last < FRAME_MS) {
        frame = requestAnimationFrame(tick);
        return;
      }
      last = time;
      const snap = (value: number) => Math.round(value / STEP) * STEP;
      stage.style.setProperty("--gx", `${snap(x * 24)}px`);
      stage.style.setProperty("--gy", `${snap(y * 12)}px`);
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX / window.innerWidth - 0.5;
      y = event.clientY / window.innerHeight - 0.5;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <figure
      ref={stageRef}
      className={styles.stage}
      data-clear={clear || undefined}
    >
      <p className={`${styles.credit} ${signalType}`}>{credit}</p>
      <div className={styles.moon} aria-hidden="true" />
      <div className={styles.portrait}>
        <div className={styles.ghost} aria-hidden="true">
          <Image src={PORTRAIT} alt="" fill sizes={SIZES} />
        </div>
        <Image
          className={styles.photo}
          src={PORTRAIT}
          alt={alt}
          fill
          priority
          sizes={SIZES}
        />
        <span className={styles.scan} aria-hidden="true" />
      </div>
      {season === "halloween" && (
        <>
          <PixelSprite name="bat" size={18} className={styles.batA} />
          <PixelSprite name="bat" size={12} className={styles.batB} />
          <PixelSprite name="pumpkin" size={40} className={styles.pumpkin} />
        </>
      )}
      {season === "autumn" && (
        <>
          <PixelSprite name="leaf" size={22} className={styles.leafA} />
          <PixelSprite name="leaf" size={16} className={styles.leafB} />
        </>
      )}
      {children}
      <figcaption className={styles.stageCaption}>
        <button
          type="button"
          aria-pressed={clear}
          onClick={() => setClear((value) => !value)}
          className={signalType}
        >
          <span aria-hidden="true" className={styles.toggleBox} />
          {fullColour}
        </button>
      </figcaption>
    </figure>
  );
}
