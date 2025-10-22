"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import React from "react";

gsap.registerPlugin(SplitText, useGSAP);

type SplitTextEffectProps = {
  timeline?: gsap.core.Timeline; // master timeline from parent
  text: string;
  type: "lines" | "words" | "chars";
  className?: string;
  duration?: number; // optional: defaults to 0.3
  stagger?: number; // optional: defaults to 0.05
  ease?: gsap.EaseString | gsap.EaseFunction; // optional: defaults to "sine.out"
  position?: number | string; // optional: defaults to ">" to chain
};

const SplitTextEffect = ({
  text,
  type = "chars",
  className,
  timeline,
  stagger = 0.05,
  duration = 0.3,
  ease = "sine.out" as gsap.EaseString,
  position = ">", // <- key: append after previous
}: SplitTextEffectProps) => {
  const ref = React.useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const split = new SplitText(ref.current, {
        type,
        // give targets layout so y transforms look clean
        ...(type === "chars" && { charsClass: "inline-block " }),
        ...(type === "words" && { wordsClass: "inline-block" }),
        ...(type === "lines" && { linesClass: "block" }),
      });

      const sub = gsap.timeline({ defaults: { duration, stagger, ease } });
      sub.fromTo(
        [split[type]],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          clearProps: "transform,opacity",
        }
      );

      timeline?.add(sub, position);

      return () => {
        sub.kill();
        split.revert();
      };
    },
    { dependencies: [timeline, type, text] }
  );

  return (
    <p className={className} ref={ref}>
      {text}
    </p>
  );
};

export default SplitTextEffect;
