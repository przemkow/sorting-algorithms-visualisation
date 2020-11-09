import { SpyOptions } from "../sorting-spies/spy.models";

class QuickSort {
  public static sort(A: number[], spyOptions: SpyOptions) {
    QuickSort.sortFn(A, 0, A.length - 1, spyOptions);
  }

  public static sortFn(
    A: number[],
    low: number,
    high: number,
    spyOptions: SpyOptions
  ) {
    if (high - low <= 0) return;

    const pivot = A[high];

    let left = low;
    for (let i = low; i <= high - 1; i++) {
      if (A[i] <= pivot) {
        if (left != i) {
          const temp = A[i];
          A[i] = A[left];
          A[left] = temp;
          spyOptions.swapValues(i, left, left, high);
        } else {
          spyOptions.setPointer(left, high);
        }
        left++;
      }
    }
    A[high] = A[left];
    A[left] = pivot;
    spyOptions.swapValues(left, high, left, high);

    QuickSort.sortFn(A, low, left - 1, spyOptions);
    QuickSort.sortFn(A, left, high, spyOptions);
  }
}

export { QuickSort };
