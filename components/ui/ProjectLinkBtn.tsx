"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link2 } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

type ProjectLinkBtnProps = {
  link: string;
  text: string;
  icon?: React.ReactNode;
};
const ProjectLinkBtn = ({ link, text, icon }: ProjectLinkBtnProps) => {
  const root = useRef<HTMLDivElement | null>(null);
  const circle = useRef<HTMLDivElement | null>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  useGSAP((context, contextSafe) => {
    const el = root.current;
    const circleEl = circle.current;
    if (!el || !circleEl) return;
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 0.3 },
    });
    const onHoverLink = contextSafe!(() => {
      tl.to(circleEl, { width: 40, height: 40, scale: 1.2 })
        .to(iconRef.current, { opacity: 1, scale: 0.8 }, "<10%")
        .fromTo(
          iconRef.current,
          { rotate: 15 },
          { rotate: -15, duration: 0.6, yoyo: true, repeat: Infinity },
          0.3
        );
    });
    const onLeaveLink = contextSafe!(() => {
      tl.clear()
        .to(circleEl, { width: 16, height: 16, scale: 1 }, 0)
        .to(iconRef.current, { opacity: 0, scale: 0.8 }, 0)
        .play(0);
    });
    el.addEventListener("mouseenter", onHoverLink);
    el.addEventListener("mouseleave", onLeaveLink);
    return () => {
      el.removeEventListener("mouseenter", onHoverLink);
      el.removeEventListener("mouseleave", onLeaveLink);
      tl.kill();
    };
  });
  return (
    <div ref={root} role="button" className="flex items-center gap-2 cursor-pointer group relative">
      <div
        ref={circle}
        className="size-4 rounded-full  -z-10 flex items-center justify-center bg-primary absolute left-0 -translate-x-1/2"
      >
        <span ref={iconRef} className="eye-link opacity-0 text-fg">
          {icon}
        </span>
      </div>
      <div className="relative ml-4">
        <Link ref={linkRef} href={link} className="font-medium">
          {text}
        </Link>
        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current origin-left group-hover:scale-x-100 scale-x-0 transition-transform duration-300  "></span>
      </div>
    </div>
  );
};

export default ProjectLinkBtn;
