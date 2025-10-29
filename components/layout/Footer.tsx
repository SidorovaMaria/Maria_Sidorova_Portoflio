"use client";

import CornerLinks from "@/components/layout/CornerLinks";
import SplitTextEffect from "@/components/ui/SplitTextEffect";
import { connectLinksProfile, connectSocialLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className=" py-12 bg-gradient-to-br from-primary/50 via-transparent to-primary/50 rounded-t-3xl mt-24 connect-profile-section">
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
    </footer>
  );
};

export default Footer;
