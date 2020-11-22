import { SpyOptions } from "../sorting-spies/spy.models";

/**
 * Sortowanie przez kopcowanie.
 *
 * Algorytm działa na bazie przechowywania Kopca (Heap) bedacego pełnym drzewem binarnym (Complete Binary Tree) w postaci tablicy.
 *
 * Wstepnie uzyskany kopiec sprowadzany jest do postaci Kopca Maksymalnego (Max Heap) w którym kady rodzic jest większy od swoich dzieci.
 * z Max Heap kolejno zamieniany jest pierwszy element z ostatnim (najwieksza wartość zapisana jest na koncu tablicy) po czym znów tworzony jest
 * kopiec maksymalny bez uwzgledniania ostatniego elementu tablicy. Kolejno najwiekszy element zamieniany jest z elementem przedostanim po czym
 * operacja jest powtarzana do momentu uzyskania posortowanej tablicy. (index ostatniego posortowanego element = 0 )
 *
 * Time: O(nlogn)
 * Space: O(1)
 */
class HeapSort {
  static sort(A: number[], spyOptions: SpyOptions) {
    let lastElementIdx = A.length - 1;
    while (lastElementIdx >= 0) {
      {
        HeapSort.createMaxHeap(A, lastElementIdx, spyOptions);

        const temp = A[0];
        spyOptions.swapValues(0, lastElementIdx);
        A[0] = A[lastElementIdx];
        A[lastElementIdx] = temp;
        lastElementIdx--;
      }
    }
  }
  private static createMaxHeap(
    A: number[],
    lastIdx: number,
    spyOptions: SpyOptions
  ) {
    const lastParentId = (lastIdx / 2) | 0;
    for (let i = lastParentId; i >= 0; i--) {
      {
        HeapSort.setMaxHeap(A, i, lastIdx, spyOptions);
      }
    }
  }
  private static setMaxHeap(
    A: number[],
    parentIdx: number,
    lastIdx: number,
    spyOptions: SpyOptions
  ) {
    const leftIdx = HeapSort.leftNode(parentIdx);
    const rightIdx = HeapSort.rightNode(parentIdx);
    if (leftIdx > lastIdx) {
      spyOptions.setPointer(lastIdx, parentIdx);
      return;
    }
    const compareToIdx =
      rightIdx > lastIdx || A[leftIdx] > A[rightIdx] ? leftIdx : rightIdx;
    if (A[parentIdx] < A[compareToIdx]) {
      const temp = A[compareToIdx];
      A[compareToIdx] = A[parentIdx];
      A[parentIdx] = temp;
      spyOptions.swapValues(compareToIdx, parentIdx, lastIdx, compareToIdx);
      HeapSort.setMaxHeap(A, compareToIdx, lastIdx, spyOptions);
    }
  }
  private static leftNode(index: number) {
    return index * 2 + 1;
  }
  private static rightNode(index: number) {
    return index * 2 + 2;
  }
}

export { HeapSort };
