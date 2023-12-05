import Swiper from "swiper";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";

export default function indiv() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".indiv"));

  elements.forEach((element) => {
    const tabBtns = Array.from(
      element.querySelectorAll<HTMLButtonElement>(".indiv__tabs-nav-btn")
    );
    const controlTabs = Array.from(
      element.querySelectorAll<HTMLElement>(".indiv__controls-tabs-item")
    );
    const tabItems = Array.from(
      element.querySelectorAll<HTMLElement>(".indiv__tabs-item")
    );

    const setActiveTab = (index: number) => {
      tabBtns.forEach((btn) => btn.classList.remove("active"));
      controlTabs.forEach((tab) => tab.classList.remove("active"));
      tabItems.forEach((tab) => tab.classList.remove("active"));
      tabBtns[index]?.classList.add("active");
      controlTabs[index]?.classList.add("active");
      tabItems[index]?.classList.add("active");
    };

    setActiveTab(0);

    tabBtns.forEach((btn, btnIndex) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        setActiveTab(btnIndex);
      });
    });

    tabItems.forEach((item, itemIndex) => {
      const controls = controlTabs[itemIndex];
      const container = item.querySelector<HTMLElement>(".swiper");
      if (!container) return;

      new Swiper(container, {
        modules: [Navigation, Pagination],
        speed: 600,
        slidesPerView: "auto",
        pagination: {
          el: item.querySelector<HTMLElement>(".indiv__tabs-slider-pagination"),
        },
        navigation: {
          prevEl: controls.querySelector<HTMLButtonElement>(
            ".indiv__arrow--prev"
          ),
          nextEl: controls.querySelector<HTMLButtonElement>(
            ".indiv__arrow--next"
          ),
        },
      });
    });
  });
}
