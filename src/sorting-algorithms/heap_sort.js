class HeapSort {
  static sort(A, spyOptions) {
    let lastElementIdx = A.length - 1;
    while (lastElementIdx >= 0) {
      {
        HeapSort.createMaxHeap(A, lastElementIdx, spyOptions);

        let temp = A[0];
        spyOptions.swapValues(0, lastElementIdx);
        A[0] = A[lastElementIdx];
        A[lastElementIdx] = temp;
        lastElementIdx--;
      }
    }
  }
  static createMaxHeap(A, lastIdx, spyOptions) {
    let lastParrentId = (lastIdx / 2) | 0;
    for (let i = lastParrentId; i >= 0; i--) {
      {
        HeapSort.setMaxHeap(A, i, lastIdx, spyOptions);
      }
    }
  }
  static setMaxHeap(A, parentIdx, lastIdx, spyOptions) {
    let leftIdx = HeapSort.leftNode(parentIdx);
    let rightIdx = HeapSort.rightNode(parentIdx);
    if (leftIdx > lastIdx) {
      spyOptions.setPointer(lastIdx, parentIdx);
      return;
    }
    let compareToIdx =
      rightIdx > lastIdx || A[leftIdx] > A[rightIdx] ? leftIdx : rightIdx;
    if (A[parentIdx] < A[compareToIdx]) {
      let temp = A[compareToIdx];
      A[compareToIdx] = A[parentIdx];
      A[parentIdx] = temp;
      spyOptions.swapValues(compareToIdx, parentIdx, lastIdx, compareToIdx);
      HeapSort.setMaxHeap(A, compareToIdx, lastIdx, spyOptions);
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
