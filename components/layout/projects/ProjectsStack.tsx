"use client";

import ProjectShowCase from "@/components/ui/ProjectShowCase";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import TechTag from "../cards/TechTag";
import Link from "next/link";
import { ArrowBigDown, Eye, Github } from "lucide-react";
import { AllProjects, Project } from "@/constants/projects";

const ProjectsStack = () => {
  useGSAP(() => {
    const slideWrappers = gsap.utils.toArray(".project-card-wrapper") as HTMLElement[];
    const slides = gsap.utils.toArray(".card-slide") as HTMLElement[];
    if (slideWrappers.length !== slides.length || slideWrappers.length === 0) {
      return;
    }
    const isLast = (index: number) => index === slides.length - 1;
    slideWrappers.forEach((wrapper, i) => {
      const card = slides[i];
      gsap.to(card, {
        y: isLast(i) ? 0 : 50 * i, // cards move down a bit
        zIndex: -10,
        transformOrigin: "50% center",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          endTrigger: slides[slides.length - 1],
          scrub: 1,
          pin: wrapper,
          pinSpacing: false,
          id: `card-${i}`,
          // markers: true,
        },
      });
    });
  });
  return (
    <section className="stack-container px-12 flex flex-col  mx-12">
      {AllProjects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </section>
  );
};

export default ProjectsStack;
type ProjectCardProps = {
  project: Project;
};
const ProjectCard = ({ project }: ProjectCardProps) => {
  const {
    title,
    smallIntro,
    desktopImage,
    tabletImage,
    mobileImage,
    accent,
    index,
    techStack,
    liveLink,
    githubLink,
    textDark,
    textLight,
  } = project;
  const showCase = {
    desktop: {
      src: desktopImage || "",
      size: 500,
    },
    tablet: {
      src: tabletImage || "",
      size: 180,
    },
    mobile: {
      src: mobileImage || "",
      size: 100,
    },
  };
  return (
    <div
      className="project-card-wrapper perspective-midrange py-3"
      style={
        {
          "--accent-color": accent,
          "--text-dark": textDark,
          "--text-light": textLight,
        } as React.CSSProperties
      }
    >
      <div className="card-slide rounded-xl px-6 pt-2 pb-6 text-[var(--text-light)] dark:text-[var(--text-dark)] ">
        {/* Glass Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)] via-bg/50 to-[var(--accent-color)] backdrop-blur-xl rounded-xl border border-[var(--accent-color)]"></div>
        {/* Index */}
        <span className="absolute top-4 right-6 text-4xl font-bold text-[var(--accent-color)] brightness-150">{`<${index}>`}</span>

        {/* Content */}
        <div className="card-inner relative w-full h-fit grid grid-cols-[2fr_3fr] gap-x-4 items-center">
          {/* Image */}
          <div className="flex items-center justify-center">
            <ProjectShowCase
              desktop={showCase.desktop}
              tablet={showCase.tablet}
              mobile={showCase.mobile}
            />
          </div>
          {/* Description */}
          <div className="flex flex-col gap-6 px-6 py-4">
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="font-medium opacity-80">{smallIntro}</p>
            </div>
            {/* Tech Stack */}
            <ul className="flex flex-wrap gap-2 justify-center">
              {techStack.map((tech) => (
                <TechTag
                  key={tech}
                  title={tech}
                  className="text-[var(--text-light)] dark:text-[var(--text-dark)]"
                />
              ))}
            </ul>
            {/* Github and Live */}
            <div className="flex items-center mx-auto z-50 gap-4 mt-2 h-fit w-full">
              <Link
                role="button"
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full  px-2 py-2 justify-center rounded-xl bg-[var(--accent-color)]  hover:brightness-125  text-[var(--text-dark)] transition duration-300 origin-top hover:shadow-md shadow-fg/40 hover:rotate-x-30 border-b-4 border-transparent hover:border-b-4 hover:border-[var(--text-dark)]"
              >
                <Eye className="" size={16} />
                <p>Live Demo</p>
              </Link>
              <Link
                role="button"
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full  px-2 py-2 justify-center rounded-xl bg-[var(--accent-color)]  hover:brightness-125  text-[var(--text-dark)] transition duration-300 origin-top hover:shadow-md shadow-fg/40 hover:rotate-x-30 border-b-4 border-transparent hover:border-b-4 hover:border-[var(--text-dark)]"
              >
                <Github className="aspect-square" size={20} />
                <p>GitHub Repo</p>
              </Link>
            </div>
            {/* <button className="mx-auto w-fit flex flex-col items-center uppercase text-[var(--text-light)] dark:text-[var(--text-dark)] hover:text-[var(--accent-color)] hover:dark:text-[var(--accent-color)] transition duration-300 cursor-pointer hover:scale-105 group">
              <span className="font-bold ">Case Study</span>
              <ArrowBigDown className="mt-1 group-hover:fill-[var(--accent-color)]" size={32} />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
