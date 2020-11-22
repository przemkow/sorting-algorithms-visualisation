import { SpyOptions } from "../sorting-spies/spy.models";

/**
 * Algorym dzieli zbiór na 2 części posortowaną i nie posortowaną.
 * Zaczynamy iteracje od 1 elementu jezeli kolejny element jest mniejszy przesuwamy wszystkie elementy wieksze od niego w prawo.
 * Algorytm działa bardzo szybko w przypadku wstepnie uporządkowanych zbiorów.
 * Size: O(1)
 * Time: O(n^2) | Pozytywny O(n)
 */
class InsertionSort {
  static sort(A: number[], spyOptions: SpyOptions) {
    const length = A.length;
    for (let i = 1; i < length; ++i) {
      const key = A[i];
      let j = i - 1;

      /* Move elements of arr[0..i-1], that are
         greater than key, to one position ahead
         of their current position */
      while (j >= 0 && A[j] > key) {
        A[j + 1] = A[j];
        spyOptions.setValue(j + 1, A[j], i, j + 1);
        j = j - 1;
      }
      A[j + 1] = key;
      spyOptions.setValue(j + 1, key, i, j + 1);
    }
  }
}

export { InsertionSort };
