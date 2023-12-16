export const isTouch = () => !window.matchMedia("(hover: hover)").matches;

export async function supportsAvif() {
  if (!window.createImageBitmap) return false;
  const avifData =
    "data:image/avif;base64,AAAAFGZ0eXBhdmlmAAAAAG1pZjEAAACgbWV0YQAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAC8AAAAGwAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAARWlwcnAAAAAoaXBjbwAAABRpc3BlAAAAAAAAAAQAAAAEAAAADGF2MUOBAAAAAAAAFWlwbWEAAAAAAAAAAQABAgECAAAAI21kYXQSAAoIP8R8hAQ0BUAyDWeeUy0JG+QAACANEkA=";
  const blob = await fetch(avifData).then((r) => r.blob());
  return createImageBitmap(blob).then(
    () => true,
    () => false
  );
}
