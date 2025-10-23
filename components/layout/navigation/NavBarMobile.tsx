"use client";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { NAVLINKS } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Github, Linkedin } from "lucide-react";
import { Link } from "next-transition-router";
import React, { useEffect } from "react";

const NavBarMobile = () => {
  const [open, setOpen] = React.useState(false);
  const menuBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const tlRef = React.useRef<gsap.core.Timeline | null>(null);
  useGSAP((_, safeContext) => {
    tlRef.current = gsap
      .timeline({ paused: true, defaults: { duration: 0.4, ease: "sine.inOut" } })
      .to("#menu", { rotation: 220, duration: 1 }, 0)
      .fromTo(
        "#nav",
        {
          display: "none",
          xPercent: 0,
        },
        { display: "flex", xPercent: -100 },
        "<"
      )
      .fromTo(
        ".menu-list li",
        {
          xPercent: 100,
          autoAlpha: 0,
        },
        {
          xPercent: 0,
          stagger: 0.1,
          autoAlpha: 1,
        },
        "<25%"
      )
      .to(
        ".menu-list",
        {
          pointerEvents: "auto",
          backdropFilter: "blur(8px)",
          webkitBackdropFilter: "blur(20px)",
          borderColor: "#67422f80",
        },
        ">-25%"
      );
  });
  const menuListItemsRef = React.useRef<HTMLElement[] | null>(null);

  React.useEffect(() => {
    if (!open) return;

    const menuListItems = gsap.utils.toArray<HTMLElement>(".menu-item");
    const menuBtnItems = gsap.utils.toArray<HTMLElement>(".menu-btn");
    menuListItemsRef.current = menuListItems;

    // store handlers so we can remove the exact same functions on cleanup
    const handlers: {
      el: HTMLElement;
      enter: EventListenerOrEventListenerObject;
      leave: EventListenerOrEventListenerObject;
    }[] = [];
    const menuBtnHandlers: {
      el: HTMLElement;
      enter: EventListenerOrEventListenerObject;
      leave: EventListenerOrEventListenerObject;
    }[] = [];

    if (menuListItems.length > 0) {
      menuListItems.forEach((item) => {
        // use mouseenter instead of the non-standard "hover" event and ensure item is an HTMLElement
        const onEnter = () => {
          gsap.to(item, { xPercent: -5, duration: 0.2, ease: "sine.out" });
        };
        const onLeave = () => {
          gsap.to(item, { xPercent: 0, duration: 0.2, ease: "sine.out" });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);

        handlers.push({ el: item, enter: onEnter, leave: onLeave });
      });
    }
    if (menuBtnItems.length > 0) {
      menuBtnItems.forEach((item) => {
        // use mouseenter instead of the non-standard "hover" event and ensure item is an HTMLElement
        const onEnter = () => {
          gsap.to(item, { scale: 1.1, duration: 0.2, ease: "sine.out" });
        };
        const onLeave = () => {
          gsap.to(item, { scale: 1, duration: 0.2, ease: "sine.out" });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);

        menuBtnHandlers.push({ el: item, enter: onEnter, leave: onLeave });
      });
    }

    return () => {
      handlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      tlRef.current!.play();
    } else {
      tlRef.current!.reverse();
    }
  }, [open]);
  return (
    <>
      <button
        ref={menuBtnRef}
        id="menu"
        onClick={() => setOpen(!open)}
        className="menu-button md:hidden"
        aria-label="Navigation menu"
        aria-expanded="false"
        aria-controls="nav"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="60 0 15 22"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className="w-6 h-6 rotate-45"
        >
          <g>
            <path
              d="M68.707 5.53711L66.2013 18.3499"
              stroke="var(--color-fg)"
              strokeWidth="2.5"
            ></path>
            <path d="M73 10.9365L62 12.9365" stroke="var(--color-fg)" strokeWidth="2.5"></path>
          </g>
        </svg>
      </button>
      <nav
        id="nav"
        className="fixed left-full top-0 m-0 p-2 -z-10 text-[var(--dark)] h-screen flex-col gap-[0.2rem] hidden md:hidden "
        data-open={open}
      >
        <ul className="list-none p-0 w-[50vw] max-w-[50vw] m-0 menu-list pt-[59px] cursor-pointer  rounded-xl border border-transparent z-50 relative">
          {NAVLINKS.map((link) => (
            <li
              className="p-3 border border-fg/50 font-medium lowercase  bg-gradient-to-r from-bg to-primary/20 bg-bg rounded-md  my-1 hover:underline transition-all menu-item"
              key={link.key}
            >
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
          <li className=" my-1 flex justify-center rounded-md gap-4">
            <div className="flex items-center justify-center w-10 h-10 border rounded-md bg-bg menu-btn">
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-center w-10 h-10 border rounded-md bg-bg menu-btn">
              <Link href="">
                <Github size={20} />
              </Link>
            </div>
            <div className="flex items-center justify-center w-10 h-10 border rounded-md bg-bg menu-btn">
              <Link href="">
                <Linkedin size={20} />
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBarMobile;
