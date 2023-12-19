import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { isTouch } from "./utils";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { getScrollLookup } from "./getScrollup";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function smoothScrolling() {
  let lenis: Lenis | null = null;

  if (!isTouch()) {
    lenis = new Lenis({
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      if (lenis) {
        lenis.raf(time * 1000);
      }
    });

    gsap.ticker.lagSmoothing(0);
  }

  // const pageHeader = document.querySelector<HTMLElement>(".page-header");

  //@ts-ignore
  // let getPosition = getScrollLookup("section", {
  //   pinnedContainer: ".scroll-pin-wrapper",
  // });

  // document.addEventListener("click", (event) => {
  //   const target = event.target as HTMLElement;
  //   if (target.matches("a[href^='#']") || target.closest("a[href^='#']")) {
  //     const link = target.matches("a[href^='#']")
  //       ? (target as HTMLAnchorElement)
  //       : target.closest<HTMLAnchorElement>("a[href^='#']");
  //     if (!link) return;

  //     const hash = link.hash;

  //     const element = document.querySelector(hash);
  //     if (element) {
  //       event.preventDefault();
  //       document.body.classList.toggle("menu-open");

  //       gsap.to(window, {
  //         duration: 1.5,
  //         ease: "power2.out",
  //         scrollTo: {
  //           y: getPosition(element),
  //           autoKill: false,
  //           offsetY: pageHeader ? pageHeader.offsetHeight : 0,
  //         },
  //       });
  //     }
  //   }
  // });
}
