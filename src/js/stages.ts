export default function stages() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".stages")
  );

  elements.forEach((element) => {
    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(".stages__card")
    );
    const layers = Array.from(
      element.querySelectorAll<HTMLElement>(".stages__image-layer")
    );

    cards.forEach((card, cardIndex) => {
      card.addEventListener("mouseenter", () => {
        layers[cardIndex]?.classList.add("active");
        cards[cardIndex]?.classList.add("active");
      });

      card.addEventListener("mouseleave", () => {
        cards.forEach((card) => card.classList.remove("active"));
        layers.forEach((layer) => layer.classList.remove("active"));
      });
    });
  });
}
