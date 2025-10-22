"use client";
import { useGSAP } from "@gsap/react";
import { Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <aside>
      <div className="flex flex-wrap gap-4 w-full justify-center my-4">
        {/* Example Link */}
        <Link
          href="https://www.linkedin.com/in/maria-sidorova-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg  hover:text-primary contact-link"
        >
          <Linkedin size={32} className="inline-block mr-2" />
        </Link>
        <Link
          href="https://github.com/SidorovaMaria"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg hover:text-primary contact-link"
        >
          <Github size={32} className="inline-block mr-2" />
        </Link>
        <Link
          href="https://www.instagram.com/maria_sidorova_"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg hover:text-primary contact-link"
        >
          <Instagram size={32} className="inline-block mr-2" />
        </Link>
      </div>
      {/* Email and Phone */}
      <div className="flex flex-col items-center space-y-2 mt-4">
        <Link
          href="mailto:yourname@example.com"
          className="text-fg hover:text-primary  contact-link"
        >
          <Mail size={20} className="inline-block mr-2" />
          sidmashav@icloud.com
        </Link>
        <Link href="tel:+1234567890" className="text-fg hover:text-primary contact-link">
          <Phone size={20} className="inline-block mr-2" />
          +44 7766 932 154
        </Link>
      </div>
    </aside>
  );
};

export default Links;
