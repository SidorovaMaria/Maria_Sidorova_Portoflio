"use client";

import SplitTextEffect from "@/components/ui/SplitTextEffect";
import { useGSAP } from "@gsap/react";
import { time } from "console";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

type ProfileCardProps = {
  timeline?: gsap.core.Timeline; // master timeline from parent
};
const ProfileCard = ({ timeline }: ProfileCardProps) => {
  const root = React.useRef<HTMLElement | null>(null);
  const tlRef = React.useRef<gsap.core.Timeline | null>(null);

  // Create master timeline once, pass to SplitTextEffect
  useGSAP(() => {
    const showtl = gsap
      .timeline()
      .fromTo(root.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 5 });
    timeline?.add(showtl, ">");
    tlRef.current = gsap.timeline({ defaults: { ease: "sine.out" } });
    return () => tlRef.current?.kill();
  }, []);

  useGSAP(
    () => {
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".profile-card-container",
          start: "top center",
          end: "80% 60%",
          scrub: true,
        },
      });
      gsap.fromTo(
        ".profile-card-container",
        { opacity: 0, y: -50 },
        {
          y: 0,
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: ".profile-card-container",
            start: "15% center",
            end: "50% center",
            scrub: true,
          },
        }
      );

      cardTl.fromTo(
        ".profile-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        0.3
      );
      cardTl.fromTo(
        ".profile-description",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        0.5
      );

      return () => cardTl.kill();
    },
    { scope: root, revertOnUpdate: true }
  );

  return (
    <section ref={root} className="mt-24 w-full  z-0">
      <div className="profile-card-container max-w-[1000px] mx-auto relative">
        <div className="h-[450px] w-[1000px] bg-transparent"></div>
        <p className="profile-title absolute bottom-4 left-4 max-w-md capitalize text-5xl font-clash text-bg dark:text-fg">
          Translating imagination into scalable systems
        </p>
        <p className="profile-description absolute bottom-4 text-right right-4 max-w-md  text-base leading-snug font-clash text-bg dark:text-fg">
          Genuine love for clean, well-structured code, intuitive design, and meaningful
          collaboration. I care deeply about building software that not only functions flawlessly
          but also feels effortless to use.
        </p>
      </div>
    </section>
  );
};

export default ProfileCard;
