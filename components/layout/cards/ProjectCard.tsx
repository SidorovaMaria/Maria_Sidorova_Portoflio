import ProjectLinkBtn from "@/components/ui/ProjectLinkBtn";
import ProjectShowCase from "@/components/ui/ProjectShowCase";
import { Project } from "@/constants/projects";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TechTag from "./TechTag";
import useDevice from "@/hooks/useDevice";

const ProjectCard = ({ project, htl }: { project: Project; htl: gsap.core.Tween | null }) => {
  const {
    index,
    title,
    description,
    desktopImage,
    mobileImage,
    tabletImage,
    techStack,
    liveLink,
    githubLink,
    accent,
    textDark,
    textLight,
  } = project;
  const { isTablet, isMobile } = useDevice();
  const showCase = {
    desktop: {
      src: desktopImage || "",
      size: 550,
    },
    tablet: {
      src: tabletImage || "",
      size: 220,
    },
    mobile: {
      src: mobileImage || "",
      size: 130,
    },
  };

  const root = React.useRef<HTMLDivElement | null>(null);
  const introRef = React.useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const el = introRef.current;

      if (!el || !htl) return;
      const firstTl = gsap.timeline({
        defaults: { ease: "sine.out" },
        scrollTrigger: {
          containerAnimation: index === "01" ? undefined : htl,
          trigger: el,
          start: index === "01" ? "-700 top" : "-12% 80%",
          end: index === "01" ? "bottom 30%" : "center center",
          scrub: 0.01,
          toggleActions: "play reverse play reverse",
        },
      });
      firstTl.fromTo(
        introRef.current,
        {
          y: 50,
          opacity: 0,
          scaleY: 1.2,
          rotateX: 25, // tilt away from the viewer
          scale: 0.95, // slightly smaller
          transformOrigin: "center center",
          transformPerspective: 800, // give depth
          filter: "blur(4px)",
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scaleY: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "power1.out",
          duration: 1.5,
          clearProps: "transform,filter,opacity",
        },
        0
      );
      firstTl.fromTo(
        el.querySelectorAll(".index-number"),
        {
          y: -100,
          x: -100,
          rotateY: -10,
          rotateX: -10,
          opacity: 0,
          scaleY: 1.5,
          transformOrigin: "center center",
          transformPerspective: 800, // give depth
        },
        {
          y: 0,
          x: 0,
          rotateX: 0,
          scaleY: 1,
          rotateY: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          clearProps: "transform,opacity",
        },
        0
      );
      firstTl.fromTo(
        el.querySelectorAll(".info-text"),
        {
          y: -100,
          x: 100,
          scaleY: 1.5,
          rotateY: -10,
          rotateX: 10,
          opacity: 0,
          transformOrigin: "center center",
          transformPerspective: 800, // give depth
        },
        {
          y: 0,
          x: 0,
          scaleY: 1,
          rotateY: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          clearProps: "transform,opacity",
        },
        0
      );
      firstTl.fromTo(
        [".desktop-image", ".tablet-image", ".mobile-image"],
        {
          rotateY: 45,
          y: 60,
          opacity: 0,
          transformOrigin: "center left",
          transformPerspective: 800,
        },
        {
          rotateY: 0,
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
        index === "01" ? 1 : "-=50%"
      );
      firstTl.fromTo(
        ".description-text",
        {
          y: 50,
          opacity: 0,
          scaleY: 1.2,
          rotateX: 25, // tilt away from the viewer
          scale: 0.95, // slightly smaller
          transformOrigin: "center center",
          transformPerspective: 800, // give depth
          filter: "blur(4px)",
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scaleY: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 1.5,
          clearProps: "transform,filter,opacity",
        },
        index === "01" ? 1.5 : "-=50%"
      );

      return () => firstTl.kill();
    },
    { scope: root, dependencies: [htl] } // << rerun when htl becomes available
  );

  return (
    <div ref={root} className="grid grid-cols-2 gap-y-1  lg:gap-y-2 items-center gap-x-8 ">
      <div
        className={`col-span-2 grid grid-cols-[1fr_3fr] p-8 rounded-xl items-center bg-[var(--accent-color)] text-[var(--text-light)] dark:text-[var(--text-dark)]`}
        ref={introRef}
        style={
          {
            "--accent-color": accent,
            "--text-dark": textDark,
            "--text-light": textLight,
          } as React.CSSProperties
        }
      >
        <p className="text-[60px]  md:text-[80px]lg:text-[110px] leading-none pr-5 index-number text-[var(--text-dark)]">
          {index}
        </p>
        <div className="flex flex-col info-text">
          <h2 className="max-sm:text-right text-xl lg:text-3xl tracking-wide text-[var(--text-dark)]">
            {title}
          </h2>
          <ul className="hidden md:flex flex-wrap gap-2 my-4 ">
            {techStack.map((tech) => (
              <TechTag key={tech} title={tech} />
            ))}
          </ul>
        </div>
      </div>
      <div className="max-lg:col-span-2 md:scale-80 mx-auto lg:scale-100 ">
        <ProjectShowCase
          onlyDesktop={isTablet || isMobile}
          desktop={showCase.desktop}
          tablet={showCase.tablet}
          mobile={showCase.mobile}
        />
      </div>

      <div
        style={{ backgroundColor: accent + "40" }}
        className="w-full flex flex-col rounded-xl p-6 description-text max-lg:col-span-2 "
      >
        <p className="tracking-wider mix-blend-difference">{description}</p>
        <div className="mt-4 flex items-center justify-center gap-10">
          <ProjectLinkBtn link={liveLink} text="Live" icon={<span>👀</span>} />
          <ProjectLinkBtn link={githubLink} text="GitHub" icon={<Github />} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
