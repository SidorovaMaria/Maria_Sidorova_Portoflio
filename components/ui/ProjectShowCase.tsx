import Image from "next/image";
import React from "react";
type ProjectShowCaseProps = {
  desktop?: {
    src: string;
    size?: number;
  };
  tablet?: {
    src: string;
    size?: number;
  };
  mobile?: {
    src: string;
    size?: number;
  };
  onlyDesktop?: boolean;
};

const ProjectShowCase = ({ desktop, tablet, mobile, onlyDesktop }: ProjectShowCaseProps) => {
  return (
    <div className="relative w-full">
      {desktop && desktop.src && (
        <Image
          src={desktop.src}
          alt="Project Desktop"
          width={desktop?.size}
          height={desktop?.size}
          className="z-40  object-cover rounded-b-lg desktop-image"
        />
      )}
      {tablet && tablet.src && !onlyDesktop && (
        <Image
          src={tablet.src}
          alt="Project Tablet"
          width={tablet.size}
          height={tablet.size}
          className="z-30  object-cover rounded-b-lg absolute bottom-0 right-2 tablet-image"
        />
      )}
      {mobile && mobile.src && !onlyDesktop && (
        <Image
          src={mobile.src}
          alt="Project Mobile"
          width={mobile.size}
          height={mobile.size}
          className="z-50 object-cover rounded-b-lg absolute left-4/7 bottom-0 mobile-image"
        />
      )}
    </div>
  );
};

export default ProjectShowCase;
