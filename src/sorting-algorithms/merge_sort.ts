import { SpyOptions } from "../sorting-spies/spy.models";

class MergeSort {
  public static sort(A: number[], spyOptions: SpyOptions) {
    MergeSort.sortFn(A, 0, A.length - 1, spyOptions);
  }

  private static sortFn(
    A: number[],
    low: number,
    high: number,
    spyOptions: SpyOptions
  ) {
    if (high - low > 0) {
      const middle = Math.floor((high + low) / 2);
      MergeSort.sortFn(A, low, middle, spyOptions);
      MergeSort.sortFn(A, middle + 1, high, spyOptions);
      MergeSort.merge(A, low, middle, high, spyOptions);
    }
  }

  private static merge(
    A: number[],
    low: number,
    mid: number,
    high: number,
    spyOptions: SpyOptions
  ) {
    const sizeL = mid - low + 1;
    const sizeR = high - mid;
    const L = [];
    const R = [];

    for (let i = 0; i < sizeL; i++) {
      L[i] = A[i + low];
    }

    for (let i = 0; i < sizeR; i++) {
      R[i] = A[i + mid + 1];
    }

    let pointerL = 0;
    let pointerR = 0;
    for (let i = low; i <= high; i++) {
      if (pointerL >= sizeL) {
        A[i] = R[pointerR];
        spyOptions.setValue(i, R[pointerR], i, high);
        pointerR++;
      } else if (pointerR >= sizeR) {
        A[i] = L[pointerL];
        spyOptions.setValue(i, L[pointerL], i, high);
        pointerL++;
      } else if (L[pointerL] < R[pointerR]) {
        A[i] = L[pointerL];
        spyOptions.setValue(i, L[pointerL], i, high);
        pointerL++;
      } else {
        A[i] = R[pointerR];
        spyOptions.setValue(i, R[pointerR], i, high);
        pointerR++;
      }
    }
  }
}

export { MergeSort };
