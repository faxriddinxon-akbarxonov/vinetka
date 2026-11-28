"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const COUNT = 42;
// deterministic pseudo-random so server and client render the same pieces
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  // rounded so server and browser produce identical style strings
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
};

/** Paper confetti and graduation caps that burst once when the closing section appears. */
export function Confetti() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30%" });
  const reduce = useReducedMotion();
  if (reduce) return <div ref={ref} />;

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: COUNT }, (_, i) => {
        const left = Math.round(50 + (rand(i, 1) - 0.5) * 30);
        const dx = (rand(i, 2) - 0.5) * 120; // vw-ish spread
        const peak = 25 + rand(i, 3) * 45;
        const spin = (rand(i, 4) - 0.5) * 1080;
        const cap = i % 9 === 0;
        const size = cap ? 22 : Math.round(6 + rand(i, 5) * 8);
        return (
          <motion.span
            key={i}
            className="absolute bottom-0 block"
            style={{
              left: `${left}%`,
              width: size,
              height: cap ? size : Math.round(size * 0.55),
              backgroundColor: cap
                ? "transparent"
                : i % 3 === 0
                  ? "var(--v-accent)"
                  : i % 3 === 1
                    ? "var(--v-paper)"
                    : "var(--v-accent-deep)",
              fontSize: size,
              lineHeight: 1,
            }}
            initial={{ y: 40, x: 0, opacity: 0, rotate: 0 }}
            animate={
              inView
                ? {
                    y: [40, -peak * 9, 120],
                    x: [0, dx * 4, dx * 6],
                    opacity: [0, 1, 0],
                    rotate: spin,
                  }
                : undefined
            }
            transition={{
              duration: 3.4 + rand(i, 6) * 1.6,
              delay: rand(i, 7) * 0.35,
              ease: [0.2, 0.7, 0.4, 1],
              times: [0, 0.4, 1],
            }}
          >
            {cap ? "🎓" : null}
          </motion.span>
        );
      })}
    </div>
  );
}
