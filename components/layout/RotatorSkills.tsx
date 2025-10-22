import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import MorphDesign from "./cards/MorphDesign";

const RotatorSkills = () => {
  const morphRef = React.useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    gsap.set(".rotator > li > span", { transformOrigin: "0 50%" });
    gsap.set(".rotator li:not(:first-of-type) span", { opacity: 0, scale: 0.8 });
    gsap.set(morphRef.current, {
      transformOrigin: "50% 50%",
      display: "none",
      opacity: 0,
      yPercent: 40,
      zIndex: -10,
    });

    const tl = gsap
      .timeline()
      .to(".rotator li:not(:first-of-type) span", { opacity: 1, scale: 1, stagger: 0.5 })
      .to(".rotator li:not(:last-of-type) span", { opacity: 0.2, stagger: 0.5 }, 0);

    ScrollTrigger.create({
      trigger: ".skills-title",
      start: "top center",
      endTrigger: ".rotator li:last-of-type",
      end: "top center",
      pin: true,
      animation: tl,
      scrub: true,
      snap: 1 / (7 - 1),
    });
    ScrollTrigger.create({
      trigger: ".skills-section",
      start: "top center",
      endTrigger: ".rotator li:last-of-type",
      end: "bottom center",
      animation: gsap.to(morphRef.current, {
        display: "block",
        opacity: 0.6,
        scale: 1,
        yPercent: -10,
        ease: "power2.out",
        duration: 1,
      }),
      scrub: true,
    });
  });

  return (
    <div className="flex justify-end skills-section  mx-4 md:mx-8 lg:mx-16 relative ">
      <h1 className="skills-title text-4xl shrink-0 font-bold tracking-wide  text-right leading-relaxed">
        I build web experiences that are
      </h1>
      <ul className="rotator  ">
        <li>
          <span>fast and accessible.</span>
        </li>
        <li>
          <span>pixel-perfect and reliable.</span>
        </li>
        <li>
          <span>human-centered and intuitive.</span>
        </li>
        <li>
          <span>crafted with care and precision.</span>
        </li>
        <li>
          <span>alive with subtle motion.</span>
        </li>
        <li>
          <span>scalable and maintainable.</span>
        </li>
        <li>
          <span>shaped by logic and empathy.</span>
        </li>
      </ul>
      <div className="w-1/2  left-[20%] top-0 hidden  opacity-50 absolute" ref={morphRef}>
        <MorphDesign />
      </div>
    </div>
  );
};

export default RotatorSkills;
