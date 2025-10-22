"use client";
import { NAVLINKS } from "@/constants";

import React, { useRef } from "react";
import HoverLink from "./HoverLink";
import ThemeToggle from "../../theme/ThemeToggle";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const NavBar = () => {
  const navRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;
      // Add/remove a class after we scroll past the top a bit
      ScrollTrigger.create({
        start: "top -10%",
        end: 9_999_999, // effectively "forever"
        toggleClass: { className: "nav-scroll", targets: nav },
        // markers: true, // keep only for debugging
      });

      // Show on scroll up, hide on scroll down
      const showAnim = gsap
        .from(nav, {
          yPercent: -100,
          paused: true,
          duration: 0.2,
          ease: "power2.out",
        })
        .progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: 9_999_999,
        onUpdate: (self) => {
          if (self.direction === -1) showAnim.play();
          else showAnim.reverse();
        },
      });
    },
    { scope: navRef }
  );

  return (
    <header
      ref={navRef}
      className="flex items-center w-full justify-between px-6 py-4 border-b border-fg/50 sticky top-0 z-50"
    >
      <h1 className="text-xl">
        <Link href="/" className="lowercase">
          Maria Sidorova
        </Link>
      </h1>
      <nav>
        <ul className="flex items-center gap-10 relative">
          {NAVLINKS.map((link) => (
            <Link key={link.key} href={link.href} passHref>
              <HoverLink key={link.key} href={link.href} label={link.name} />
            </Link>
          ))}
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  );
};

export default NavBar;
