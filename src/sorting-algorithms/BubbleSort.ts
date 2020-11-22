import { SpyOptions } from "../sorting-spies/spy.models";

/**
 * Every 2 non sorted elements are swapped with each other then it.
 * After single iteration the highest element will be always pushed to the last place in array.
 * Size: O(1)
 * Time: O(n^2)
 */

class BubbleSort {
  static sort(A: number[], spyOptions: SpyOptions) {
    for (let i = 0; i < A.length - 1; i++) {
      let sorted = true;
      for (let j = 0; j < A.length - i - 1; j++) {
        if (A[j] > A[j + 1]) {
          const temp = A[j];
          A[j] = A[j + 1];
          A[j + 1] = temp;
          if (spyOptions) {
            spyOptions.swapValues(j, j + 1, j + 1);
          }
          sorted = false;
        } else {
          spyOptions.setPointer(j + 1);
        }
      }
      if (sorted) {
        break;
      }
    }
  }
}
export { BubbleSort };
