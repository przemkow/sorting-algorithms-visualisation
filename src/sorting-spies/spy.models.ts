interface SpyOptions {
  setValue: (changedIndex, value, pointerA?, pointerB?) => void;
  swapValues: (indexA, indexB, pointerA?, pointerB?) => void;
  setPointer: (pointerA?, pointerB?) => void;
}

export { SpyOptions };
