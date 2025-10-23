import { useEffect, useState } from "react";

export default function useDevice() {
  const getVw = () => (typeof window !== "undefined" ? window.innerWidth : 1024);
  const [vw, setVw] = useState<number>(getVw());

  useEffect(() => {
    const handleResize = () => setVw(getVw());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = vw >= 1024;
  const isTablet = vw >= 768 && vw < 1024;
  const isMobile = vw < 768;

  return { vw, isDesktop, isTablet, isMobile };
}
