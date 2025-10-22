"use client";
import ContactForm from "@/components/contact/ContactForm";
import Links from "@/components/ui/Links";
import SplitTextEffect from "@/components/ui/SplitTextEffect";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Brain, Lightbulb, Mail, NotebookIcon } from "lucide-react";
import React, { useRef } from "react";

const ContactPage = () => {
  const [tl, setTl] = React.useState<gsap.core.Timeline | null>(null);
  const container = useRef<HTMLElement | null>(null);
  useGSAP(
    (context) => {
      const master = gsap.timeline({ defaults: { ease: "sine.out" } });
      setTl(master);
      const links = gsap.utils.toArray(".contact-link");
      master.fromTo(
        ".get-in-touch",
        { xPercent: -20, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "linear",
        },
        0
      );
      master
        .fromTo(
          links,
          { yPercent: 20, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.3,
            ease: "linear",
          },
          ">2"
        )
        .fromTo(
          ".why-blocks",
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
          },
          ">"
        );
      master.fromTo(
        ".contact-form",
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "<"
      );
      const whyMeBlock = gsap.utils.toArray(".why-me-block");
      master.fromTo(
        whyMeBlock,
        { xPercent: -20, opacity: 0, zIndex: -10 },
        {
          xPercent: 0,
          zIndex: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power1.out",
        },
        "-=0.5"
      );
    },
    {
      scope: container,
    }
  );

  return (
    <section className="py-10 px-4 " ref={container}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block get-in-touch mb-4">
            <div className="flex items-center gap-2 ">
              <Mail size={24} className="text-primary" />
              <span className="text-sm font-medium tracking-wider uppercase">Get In Touch</span>
            </div>
          </div>
          <SplitTextEffect
            timeline={tl!}
            text="Lets Work Together"
            type="chars"
            duration={0.8}
            stagger={0.05}
            position={0}
            className="title text-center text-[72px] font-bold mx-auto leading-tight mb-1 cursor-default text-primary"
          />
          <SplitTextEffect
            text="I'm currently open to new opportunities and collaborations. Please feel free to reach out if you have any questions or just want to say hello!"
            type="lines"
            duration={0.8}
            stagger={0}
            timeline={tl!}
            position={">0.2"}
            className="text-center text-lg max-w-2xl mx-auto text-muted-foreground px-4 cursor-default leading-relaxed tracking-wide"
          />
          <div className="mx-auto w-full">
            <Links />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 why-blocks">
            <div className="rounded-2xl p-6 bg-gradient-to-b from-bg/30 to-primary/30 backdrop-blur-md">
              <h3 className="text-2xl font-bold">Why Choose Me? </h3>
              <aside className="space-y-6 mt-5 h-fit">
                <WhyMeBlock
                  icon={<Brain size={20} />}
                  title="Creative Problem Solver"
                  description="I thrive on tackling complex challenges with innovative solutions that drive results."
                />
                <WhyMeBlock
                  icon={<Mail size={20} />}
                  title="Excellent Communicator"
                  description="I prioritize clear and open communication to ensure successful collaboration and project outcomes."
                />
                <WhyMeBlock
                  icon={<Lightbulb size={20} />}
                  title="Innovative Thinker"
                  description="I bring fresh ideas and perspectives to every project, fostering creativity and innovation."
                />
                <WhyMeBlock
                  icon={<NotebookIcon size={20} />}
                  title="Constant Learner"
                  description="I am committed to continuous learning and self-improvement, always seeking new knowledge and skills."
                />
              </aside>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

export const WhyMeBlock = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex gap-4 items-center ">
      <div className="w-14 h-14 flex items-center justify-center bg-primary  rounded-lg flex-shrink-0 text-fg relative z-50">
        {icon}
      </div>
      <div className="why-me-block ">
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="italic text-sm font-medium opacity-80">{description}</p>
      </div>
    </div>
  );
};
