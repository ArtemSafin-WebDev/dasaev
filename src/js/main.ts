import "virtual:svg-icons-register";
import "../scss/style.scss";
import accordions from "./accordions";
import selects from "./selects";
import modals from "./modals";
import forms from "./forms";
import menu from "./menu";
import clientsSlider from "./clientsSlider";
import dreamsSlider from "./dreamsSlider";
import creationSlider from "./creationSlider";
import implementSlider from "./implementSlider";
import storiesSlider from "./storiesSlider";
import indiv from "./indiv";
import specialistsSlider from "./specialistsSlider";
import smoothScrolling from "./smoothScrolling";
import animations from "./animations";
import fancybox from "./fancybox";
import stages from "./stages";
import loader from "./loader";

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  loader();
  accordions();
  selects();
  modals();
  forms();
  menu();
  stages();
  clientsSlider();
  dreamsSlider();
  creationSlider();
  implementSlider();
  storiesSlider();
  indiv();
  specialistsSlider();
  animations();
  fancybox();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
