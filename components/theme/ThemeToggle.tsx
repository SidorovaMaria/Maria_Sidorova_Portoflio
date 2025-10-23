"use client";

import React from "react";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

export default function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const iconRef = React.useRef<SVGSVGElement | null>(null);
  const tlRef = React.useRef<gsap.core.Timeline | null>(null);
  useGSAP(
    () => {
      if (!iconRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tlRef.current = tl;
      const isDarkNow = (theme && theme === "dark") || (!theme && resolvedTheme === "dark");
      if (isDarkNow) {
        gsap.set("#core", { morphSVG: "#moon" });
        gsap.set("#moon", { opacity: 1, scale: 1, transformOrigin: "center" });
        gsap.set("#sun", { opacity: 0, scale: 0.95, transformOrigin: "center" });
      } else {
        gsap.set("#core", { morphSVG: "#sun" });
        gsap.set("#sun", { opacity: 1, scale: 1, transformOrigin: "center" });
        gsap.set("#moon", { opacity: 0, scale: 0.95, transformOrigin: "center" });
      }
    },
    { scope: iconRef }
  );
  useGSAP(
    () => {
      if (!iconRef.current || !tlRef.current) return;
      const tl = tlRef.current;
      tl.clear();
      const isDark = (theme ?? resolvedTheme) === "dark";

      if (isDark) {
        tl.to("#core", { duration: 0.7, ease: "power3.inOut", morphSVG: "#moon" })
          .to("#sun", { opacity: 0, scale: 0.95, duration: 0.4 }, 0)
          .to("#moon", { opacity: 1, scale: 1, duration: 0.5 }, 0.1)
          .to(iconRef.current, { rotate: -180, duration: 0.5 }, 0);
      } else {
        tl.to("#core", { duration: 0.7, ease: "power3.inOut", morphSVG: "#sun" })
          .to("#moon", { opacity: 0, scale: 0.95, duration: 0.4 }, 0)
          .to("#sun", { opacity: 1, scale: 1, duration: 0.5 }, 0.1)
          .to(iconRef.current, { rotate: 0, duration: 0.5 }, 0);
      }
    },
    { scope: iconRef, dependencies: [theme, resolvedTheme] }
  );

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="w-8 h-8 flex items-center justify-center"
      onClick={() => setTheme((theme ?? resolvedTheme) === "dark" ? "light" : "dark")}
    >
      <svg
        ref={iconRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        width="24"
        height="24"
        role="img"
        aria-hidden="true"
      >
        {/* Morph target path */}
        <path id="core" fill="currentColor" d="M0 0" />
        {/* Templates */}
        <path
          id="moon"
          fill="currentColor"
          d="M600-640 480-760l120-120 120 120-120 120Zm200 120-80-80 80-80 80 80-80 80ZM483-80q-84 0-157.5-32t-128-86.5Q143-253 111-326.5T79-484q0-146 93-257.5T409-880q-18 99 11 193.5T520-521q71 71 165.5 100T879-410q-26 144-138 237T483-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T463-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T159-484q0 135 94.5 229.5T483-160Zm-20-305Z"
          opacity="0"
        />
        <path
          id="sun"
          fill="currentColor"
          d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"
          opacity="0"
        />
      </svg>
    </button>
  );
}
