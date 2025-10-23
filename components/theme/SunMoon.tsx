"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

/**
 * Sun⇄Moon morphing icon synced with theme.
 * - Morphs the main shape.
 * - Rays scale in/out for extra delight.
 */
export default function SunMoonMorph() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const iconRef = useRef<SVGSVGElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Single path we morph between two shapes
  // d values are compatible enough for MorphSVG to handle gracefully
  const SUN_D = "M12 6.5a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11Z"; // simple circle-ish
  const MOON_D =
    "M14.5 2.5c-3.9 0-7 3.14-7 7c0 3.53 2.59 6.46 6 6.93c-2.1-1.35-3.5-3.73-3.5-6.43c0-3.41 2.69-6.23 6.06-6.47C15.65 3.02 15.1 2.5 14.5 2.5Z";

  // Rays are separate (we’ll scale them in/out)
  const RAYS = [
    { x1: 12, y1: 1.5, x2: 12, y2: 3.5 },
    { x1: 12, y1: 20.5, x2: 12, y2: 22.5 },
    { x1: 1.5, y1: 12, x2: 3.5, y2: 12 },
    { x1: 20.5, y1: 12, x2: 22.5, y2: 12 },
    { x1: 4.3, y1: 4.3, x2: 5.7, y2: 5.7 },
    { x1: 18.3, y1: 18.3, x2: 19.7, y2: 19.7 },
    { x1: 4.3, y1: 19.7, x2: 5.7, y2: 18.3 },
    { x1: 18.3, y1: 5.7, x2: 19.7, y2: 4.3 },
  ];

  useGSAP(
    () => {
      if (!iconRef.current) return;

      // build once
      const q = gsap.utils.selector(iconRef);
      const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.6 } });
      tlRef.current = tl;

      // drop rays initially if theme is dark (start as moon)
      const startIsDark = (theme && theme === "dark") || (!theme && resolvedTheme === "dark");

      if (startIsDark) {
        gsap.set(q(".rays"), { scale: 0, transformOrigin: "center center" });
        gsap.set(q("#core"), { attr: { d: MOON_D } });
      } else {
        gsap.set(q(".rays"), { scale: 1, transformOrigin: "center center" });
        gsap.set(q("#core"), { attr: { d: SUN_D } });
      }
    },
    { scope: iconRef }
  );

  // Animate on theme change
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl || !iconRef.current) return;

    const isDark = (theme && theme === "dark") || (!theme && resolvedTheme === "dark");

    tl.clear();

    if (isDark) {
      // Sun → Moon
      tl.to(iconRef.current!.querySelector("#core"), {
        duration: 0.8,
        ease: "power3.inOut",
        morphSVG: { shape: MOON_D },
      })
        .to(
          iconRef.current!.querySelectorAll(".rays"),
          { scale: 0, duration: 0.5, ease: "back.in(1.7)", stagger: 0.03 },
          0
        )
        .to(iconRef.current, { rotate: -20, duration: 0.6, transformOrigin: "center center" }, 0);
    } else {
      // Moon → Sun
      tl.to(iconRef.current!.querySelector("#core"), {
        duration: 0.8,
        ease: "power3.inOut",
        morphSVG: { shape: SUN_D },
      })
        .to(
          iconRef.current!.querySelectorAll(".rays"),
          { scale: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.03 },
          0.1
        )
        .to(iconRef.current, { rotate: 0, duration: 0.6, transformOrigin: "center center" }, 0);
    }
  }, [theme, resolvedTheme]);

  return (
    <svg
      ref={iconRef}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      role="img"
      aria-label="Theme icon"
      className="select-none"
    >
      {/* Core shape that morphs */}
      <path id="core" d={SUN_D} fill="currentColor" vectorEffect="non-scaling-stroke" />

      {/* Rays group */}
      <g className="rays" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
        {RAYS.map((r, i) => (
          <line key={i} {...r} />
        ))}
      </g>
    </svg>
  );
}
