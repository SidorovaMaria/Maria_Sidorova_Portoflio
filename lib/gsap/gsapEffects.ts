import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
interface SplitHoverConfig {
  duration?: number;
  stagger?: number;
  ease?: string;
}
interface SplitHoverReturn {
  animation: gsap.core.Timeline;
  revert: () => void;
}
gsap.registerEffect({
  name: "splitHover",
  effect: (targets: HTMLElement[], config: SplitHoverConfig): SplitHoverReturn => {
    const [line1, line2, underline] = targets;
    const split1 = new SplitText(line1, { type: "chars" });
    const split2 = new SplitText(line2, { type: "chars" });
    const tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: config.duration ?? 0.55,
        stagger: config.stagger ?? 0.02,
        ease: config.ease ?? "sine.inOut",
      },
    });
    tl.to(split1.chars, { yPercent: -120 }, 0)
      .to(split2.chars, { yPercent: -100 }, 0)
      .to(underline, { scaleX: 1, transformOrigin: "left bottom" }, 0);
    return {
      animation: tl,
      revert: () => {
        tl.reverse();
      },
    };
  },
  defaults: { duration: 0.55, stagger: 0.02, ease: "sine.inOut" },
  extendTimeline: false,
});
export {};
