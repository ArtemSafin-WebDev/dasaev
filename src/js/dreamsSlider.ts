import Swiper from "swiper";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";

export default function dreamsSlider() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-dreams-slider")
  );

  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;

    new Swiper(container, {
      modules: [Navigation, Pagination],
      slidesPerView: "auto",
      speed: 600,
      longSwipesRatio: 0.2,
      pagination: {
        el: element.querySelector<HTMLElement>(".dreams__slider-pagination"),
        clickable: true,
      },
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(
          ".dreams__arrow--prev"
        ),
        nextEl: element.querySelector<HTMLButtonElement>(
          ".dreams__arrow--next"
        ),
      },
    });
  });
}
