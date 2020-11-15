export function getTranslateX(element: HTMLElement) {
  const match = element.style.transform.match(/\((.*)%/);
  if (match) {
    return parseFloat(match[1]);
  } else {
    return 0;
  }
}
