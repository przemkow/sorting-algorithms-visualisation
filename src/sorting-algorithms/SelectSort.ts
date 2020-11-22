import { SpyOptions } from "../sorting-spies/spy.models";

/**
 * For every index in the array it looks for the smallest element on next index
 * Size: O(1)
 * Time: O(n^2)
 */
class SelectSort {
  static sort(A: number[], spyOptions: SpyOptions) {
    for (let i = 0; i < A.length - 1; i++) {
      let min_index = i;
      for (let j = min_index + 1; j <= A.length - 1; j++) {
        if (A[j] < A[min_index]) {
          min_index = j;
        }
        spyOptions.setPointer(i, j);
      }

      const temp = A[i];
      A[i] = A[min_index];
      A[min_index] = temp;
      spyOptions.swapValues(i, min_index);
    }
  }
}

export { SelectSort };
