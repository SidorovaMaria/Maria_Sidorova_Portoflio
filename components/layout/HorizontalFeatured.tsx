"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./cards/ProjectCard";
import { budgetTracker, featuredProjects, FigmaClone, Kanban } from "@/constants/projects";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HorizontalFeatured = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [containerTl, setContainerTl] = useState<gsap.core.Tween | null>(null);

  useGSAP(() => {
    const row = rowRef.current;
    const section = sectionRef.current;
    if (!row || !section) return;
    const paddingCompensation = window.innerWidth * 0.125; // adjust based on padding/gap

    const fullWidth = row.scrollWidth + paddingCompensation; // padding/gap compensation
    const distance = fullWidth - window.innerWidth;

    // Horizontal scroll animation

    const tween = gsap.to(row, {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${fullWidth / 2}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / (3 - 1),
          duration: { min: 0.2, max: 2 },
          ease: "power1.inOut",
        },

        // markers: true,
      },
    });

    setContainerTl(tween);

    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(row);

    return () => {
      tween.kill();
      ro.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden max-lg:mt-22">
      <div
        ref={rowRef}
        id="#hf-cards"
        className="flex h-full items-center will-change-transform px-[12.5vw] gap-[12.5vw]"
      >
        {featuredProjects.map((project) => (
          <div key={project.index} className={`flex-shrink-0 w-[75vw] project-${project.index}`}>
            <ProjectCard project={project} htl={containerTl} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalFeatured;
