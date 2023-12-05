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

document.addEventListener("DOMContentLoaded", () => {
  accordions();
  selects();
  modals();
  forms();
  menu();
  clientsSlider();
  dreamsSlider();
  creationSlider();
  implementSlider();
  storiesSlider();
  indiv();
  specialistsSlider();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
