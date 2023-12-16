import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";
import { supportsAvif } from "./utils";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default async function animations() {
  let mm = gsap.matchMedia();

  const stagesCardsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".stages__list",
      start: "top bottom",
    },
  });

  stagesCardsTimeline.from(".stages__card", {
    yPercent: 100,
    duration: 0.8,
    stagger: 0.2,
    autoAlpha: 0,
    ease: "power2.out",
  });

  mm.add("(min-width: 641px)", () => {
    ScrollTrigger.create({
      trigger: ".intro__top",
      start: "top top",
      end: 999999999,
      pin: true,
      pinSpacing: false,
      markers: false,
    });
  });

  const products = document.querySelector<HTMLElement>(".product");

  if (products) {
    const canvas = products.querySelector("canvas")!;

    const context = canvas.getContext("2d")!;

    canvas.width = 600;
    canvas.height = 600;

    const frameCount = 193;

    const format = await supportsAvif();

    // console.log("Format", format);

    const currentFrame = (index: number) => `/images/ring/${index}.${format}`;

    const items = Array.from(
      products.querySelectorAll<HTMLElement>(".product__item")
    );
    const listItems = Array.from(
      products.querySelectorAll<HTMLLIElement>(".product__list-item")
    );

    const imageLoaders: Promise<HTMLImageElement>[] = [];
    const ring = {
      frame: 6,
    };

    for (let i = 0; i < frameCount; i++) {
      imageLoaders.push(
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = currentFrame(i);

          if (img.complete) {
            resolve(img);
          }
        })
      );
    }

    const loadedImages = await Promise.allSettled(imageLoaders);

    // console.log("Promises", loadedImages);

    const images: (HTMLImageElement | null)[] = loadedImages.map((item) => {
      if (item.status === "fulfilled") {
        return item.value;
      } else {
        return null;
      }
    });

    // console.log("Settled images", images);

    mm.add("(min-width: 641px)", () => {
      gsap.to(ring, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: products,
          start: "bottom bottom",
          end: "+=2500",
          markers: false,
          pin: ".scroll-pin-wrapper",
          scrub: 0.5,
          pinSpacing: true,
          onUpdate: ({ progress }) => {
            const progressIndex = Math.ceil(progress * items.length) - 1;

            items.forEach((item) => item.classList.remove("active"));
            items[progressIndex]?.classList.add("active");
            listItems.forEach((item) => item.classList.remove("active"));
            listItems[progressIndex]?.classList.add("active");

            console.log("Progress index", progressIndex);
          },
        },
        onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
      });
    });

    function render() {
      const frameToDraw = images[ring.frame];
      if (frameToDraw !== null) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(frameToDraw, 0, 0, canvas.width, canvas.height);
      }
    }

    render();
  }

  const headings = Array.from(
    document.querySelectorAll<HTMLElement>(".js-reveal-heading")
  );

  headings.forEach((heading) => {
    const childLines = new SplitText(heading, {
      type: "lines",
      linesClass: "lineChild",
    }).lines;
    const parentLines = new SplitText(heading, {
      type: "lines",
      linesClass: "lineParent",
    }).lines;

    gsap.set(parentLines, {
      overflow: "hidden",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: "top bottom",
      },
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
      }
    );
  });
  const fadeReveal = Array.from(
    document.querySelectorAll<HTMLElement>(".js-fade-reveal")
  );

  fadeReveal.forEach((element) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top+=60 bottom",
      },
    });

    tl.fromTo(
      element,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 1.4,
        ease: "power2.out",
      }
    );
  });

  const specialistsSlides = Array.from(
    document.querySelectorAll<HTMLElement>(".specialists__slider .swiper-slide")
  );

  specialistsSlides.forEach((slide) => {
    const card = slide.querySelector<HTMLElement>(".specialists__slider-card");

    mm.add("(min-width: 641px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slide,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });

      tl.from(card, {
        y: 80,
        duration: 1,
        ease: "none",
      });
    });
  });
}
