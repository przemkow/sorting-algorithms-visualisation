class HeapSort {
  static sort(A) {
    let lastElementIdx = A.length - 1;
    while (lastElementIdx >= 0) {
      {
        HeapSort.createMaxHeap(A, lastElementIdx);
        let temp = A[0];
        A[0] = A[lastElementIdx];
        A[lastElementIdx] = temp;
        lastElementIdx--;
      }
    }
  }
  static createMaxHeap(A, lastIdx) {
    let lastParrentId = (lastIdx / 2) | 0;
    for (let i = lastParrentId; i >= 0; i--) {
      {
        HeapSort.setMaxHeap(A, i, lastIdx);
      }
    }
  }
  static setMaxHeap(A, parentIdx, lastIdx) {
    let leftIdx = HeapSort.leftNode(parentIdx);
    let rightIdx = HeapSort.rightNode(parentIdx);
    if (leftIdx > lastIdx) {
      return;
    }
    let compareToIdx =
      rightIdx > lastIdx || A[leftIdx] > A[rightIdx] ? leftIdx : rightIdx;
    if (A[parentIdx] < A[compareToIdx]) {
      let temp = A[compareToIdx];
      A[compareToIdx] = A[parentIdx];
      A[parentIdx] = temp;
      HeapSort.setMaxHeap(A, compareToIdx, lastIdx);
    }
  }
  static leftNode(index) {
    return index * 2 + 1;
  }
  static rightNode(index) {
    return index * 2 + 2;
  }
}

export { HeapSort };
