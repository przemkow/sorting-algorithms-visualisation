import { SpyOptions } from "../sorting-spies/spy.models";

/**
 * Sortowanie Shell'a działa na podobnej zasadzie jak InsertionSort z tą rónicą iz zamiast iterować po tablicy od elementu 0 uzywana jest dodatkowo zamiena "dystanse" wyliczna ze wzoru  (length / Math.pow(2, k)).
 * W przeciwieństwie do algorytmu InsertionSort algorytm ShellSort porównuje ze sobą elementy oddalone o "dystans". Po czym dla kolejnej iteracji
 * oblicznay jest nowy dystans i cały proces zostaje powtórzony do momentu uzyskania posortowanej tablicy (Ostatnia iteracja działa jak zwykły InsertionSort)
 *
 * Time: O(n(logn)^2)
 * Memory: O(1)
 */
class ShellSort {
  static sort(A: number[], spyOptions: SpyOptions) {
    const length = A.length;

    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap / 2)) {
      // Do a gapped insertion sort for this gap size.
      // The first gap elements a[0..gap-1] are already
      // in gapped order keep adding one more element
      // until the entire array is gap sorted
      for (let i = gap; i < length; i += 1) {
        // add a[i] to the elements that have been gap
        // sorted save a[i] in temp and make a hole at
        // position i
        const temp = A[i];

        // shift earlier gap-sorted elements up until
        // the correct location for a[i] is found
        let j = i;
        while (j >= gap && A[j - gap] > temp) {
          A[j] = A[j - gap];
          spyOptions.setValue(j, A[j - gap], i, j);
          j = j - gap;
        }

        // put temp (the original a[i]) in its correct
        // location
        A[j] = temp;
        spyOptions.setValue(j, temp, i, j);
      }
    }
  }
}

export { ShellSort };
