"use client";

import ProfileCard from "@/components/layout/cards/ProfileCard";
import CornerLinks from "@/components/layout/CornerLinks";

import HorizontalFeatured from "@/components/layout/HorizontalFeatured";

import RotatorSkills from "@/components/layout/RotatorSkills";
import TechStackBanner from "@/components/TechStackBanner";

import SplitTextEffect from "@/components/ui/SplitTextEffect";
import { connectLinksProfile, connectSocialLinks } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import React from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
export default function Home() {
  const [tl, setTl] = React.useState<gsap.core.Timeline | null>(null);
  const root = React.useRef<HTMLElement | null>(null);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    const master = gsap.timeline({ defaults: { ease: "sine.out" } });
    master.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0);
    setTl(master);
    gsap.to(overlayRef.current, {
      y: "710px",
      width: 1000,
      borderRadius: "1.5rem",
      height: "450px",
      filter: "blur(0px)",
      scrollTrigger: {
        trigger: root.current, // Target the overlay element
        start: "-100 top", // Trigger when the top of the overlay hits the top of the viewport
        markers: false,
        endTrigger: ".profile-card-container",
        end: "top 30%", // End when the bottom of the
        scrub: 0.1, // Enable smooth scrolling for the animation
      },
    });
    //Featured only when in view
    const featuredSplit = SplitText.create(".featured", { type: "chars" });
    const featuredTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".featured",
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
        once: true,
      },
    });
    featuredTl.fromTo(
      featuredSplit.chars,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.015,
        duration: 0.35,
        ease: "power2.out",
        clearProps: "transform,opacity",
        yoyo: true,
        repeat: 0,
      }
    );
    const getToKnowSplit = SplitText.create(".get-to-know", { type: "chars" });
    const getToSocialSplit = SplitText.create(".get-to-social", { type: "chars" });
    const connectTimeline = gsap.timeline({
      ease: "sine.out",
      scrollTrigger: {
        trigger: ".connect-profile-section",
        start: "-100 50%",
      },
    });

    connectTimeline
      .fromTo(
        getToKnowSplit.chars,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.015,
          duration: 0.35,
          ease: "power2.out",
          clearProps: "transform,opacity",
          yoyo: true,
          repeat: 0,
        }
      )
      .fromTo(
        ".connect-links",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "transform,opacity",
          yoyo: true,
          repeat: 0,
        },
        ">0.1"
      )
      .fromTo(
        getToSocialSplit.chars,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.015,
          duration: 0.35,
          ease: "power2.out",
          clearProps: "transform,opacity",
          yoyo: true,
          repeat: 0,
        }
      )
      .fromTo(
        ".social-links",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "transform,opacity",
          yoyo: true,
          repeat: 0,
        },
        ">0.1"
      );

    return () => master.kill();
  }, []);
  return (
    <section ref={root} className="home-page relative ">
      <div
        ref={overlayRef}
        className="overlay absolute left-1/2 -translate-x-1/2 w-[300px] h-[300px] blur-md -z-10 -top-10"
      >
        <Image
          src="/images/me.jpg"
          alt="Maria Sidorova"
          width={300}
          height={300}
          className="w-full h-full object-cover object-[0%_80%] rounded-2xl"
        />
      </div>
      <SplitTextEffect
        timeline={tl!}
        text="Focused. Driven."
        type="chars"
        className="title text-center text-[80px] mt-12 max-w-3xl mx-auto leading-slug cursor-default text-overlayed"
        position={"0"}
      />
      <SplitTextEffect
        timeline={tl!}
        text="Constantly learning."
        type="chars"
        className="title leading-[80px] text-center text-[80px] max-w-3xl mx-auto cursor-default text-overlayed"
        position=">"
      />
      <SplitTextEffect
        timeline={tl!}
        type="lines"
        className="mt-18 text-center text-lg max-w-4xl mx-auto text-muted-foreground px-4 cursor-default leading-relaxed tracking-wide text-overlayed"
        position=">"
        duration={1.5}
        ease="power2.out"
        text="Maria Sidorova — a dedicated software engineer with a strong foundation in front-end development (React/Next.js, TypeScript) and a constant drive to learn, adapt, and evolve. I build reliable, accessible interfaces that load fast, read clearly, and scale well, pairing modern patterns with disciplined testing and version control. My approach blends data-informed decisions with empathy for users and teammates, keeping designs simple and codebases maintainable. I thrive in collaborative, feedback-rich teams and enjoy shipping features end-to-end—from UI to API integration."
      />
      <TechStackBanner />
      <ProfileCard timeline={tl!} />
      <SplitTextEffect
        type="words"
        duration={0.6}
        ease="power2.out"
        className="featured text-center text-6xl tracking-wide mt-12 -mb-12 max-w-3xl mx-auto leading-slug cursor-default"
        text="Featured Projects"
      />
      <HorizontalFeatured />
      <RotatorSkills />

      <div className=" py-12 bg-gradient-to-br from-primary/50 via-transparent to-primary/50 rounded-t-3xl mt-24 connect-profile-section">
        <SplitTextEffect
          type="words"
          duration={0.6}
          ease="power2.out"
          className="get-to-know text-center text-4xl tracking-wide my-12  max-w-3xl mx-auto leading-slug cursor-default"
          text="Open to graduate/junior SWE roles"
        />
        <section className="my-4 connect-links">
          <CornerLinks connectLinks={connectLinksProfile} />
        </section>
        <SplitTextEffect
          type="words"
          duration={0.6}
          ease="power2.out"
          className="get-to-social text-center text-4xl tracking-wide my-12  max-w-3xl mx-auto leading-slug cursor-default"
          text="Or connect professionally"
        />
        <section className="my-4 social-links">
          <CornerLinks connectLinks={connectSocialLinks} />
        </section>
      </div>
    </section>
  );
}
