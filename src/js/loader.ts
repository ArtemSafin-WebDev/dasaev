import gsap from "gsap";
import { SplitText } from "./vendor/gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function loader() {
  setTimeout(() => {
    document.body.classList.remove("has-loader");

    const introHeading = document.querySelector<HTMLElement>(".intro__heading");

    const childLines = new SplitText(introHeading, {
      type: "lines",
      linesClass: "lineChild",
    }).lines;
    const parentLines = new SplitText(introHeading, {
      type: "lines",
      linesClass: "lineParent",
    }).lines;

    gsap.set(parentLines, {
      overflow: "hidden",
    });

    const tl = gsap.timeline();

    tl.from(".page-header", {
      y: 30,
      ease: "power3.out",
      duration: 1,
      autoAlpha: 0,
    });

    tl.fromTo(
      childLines,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
      },
      "<"
    );
    tl.fromTo(
      ".intro__bg, .intro__bottom-content",
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.4,
      },
      "<+=0.4"
    );
  }, 1100);
}
