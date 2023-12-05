import Swiper from "swiper";
import "swiper/css";
import { Navigation } from "swiper/modules";

export default function clientsSlider() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-clients-slider")
  );

  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;

    new Swiper(container, {
      modules: [Navigation],
      slidesPerView: "auto",
      speed: 600,
      longSwipesRatio: 0.2,
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(
          ".clients__arrow--prev"
        ),
        nextEl: element.querySelector<HTMLButtonElement>(
          ".clients__arrow--next"
        ),
      },
    });
  });
}
