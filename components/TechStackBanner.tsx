"use client";
import { useRef } from "react";
import gsap from "gsap";
import { horizontalLoop } from "@/lib/gsap/horizontalLoop";
import { techStack } from "@/constants";
import { useGSAP } from "@gsap/react";

export default function TechStackBanner() {
  const refs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.fromTo(
      refs.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1 }
    );
    const tl = horizontalLoop(refs.current, {
      speed: 0.5,
      repeat: -1,
      paddingRight: 0,
    });
    tl.play();

    return () => {
      tl.kill();
    };
  });

  return (
    <div className="flex mx-auto items-center w-full border-primary py-4 my-12 overflow-hidden">
      {techStack.map((txt, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el!;
          }}
          className=" tech-stack-item uppercase text-overlayed"
        >
          {txt}
        </div>
      ))}
    </div>
  );
}
