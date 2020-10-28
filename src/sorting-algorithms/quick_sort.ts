class QuickSort {
  public static sort$int_A(A: number[]) {
    QuickSort.sort$int_A$int$int(A, 0, A.length - 1);
  }

  public static sort$int_A$int$int(A: number[], low: number, high: number) {
    if (high - low <= 0) return;
    const pivot: number = A[high];
    let left: number = low;
    for (let i: number = low; i <= high - 1; i++) {
      {
        if (A[i] <= pivot) {
          if (left !== i) {
            const temp: number = A[i];
            A[i] = A[left];
            A[left] = temp;
          }
          left++;
        }
      }
    }
    A[high] = A[left];
    A[left] = pivot;
    QuickSort.sort$int_A$int$int(A, low, left - 1);
    QuickSort.sort$int_A$int$int(A, left, high);
  }

  public static sort(A?: any, low?: any, high?: any): any {
    if (
      ((A != null &&
        A instanceof <any>Array &&
        (A.length == 0 || A[0] == null || typeof A[0] === "number")) ||
        A === null) &&
      (typeof low === "number" || low === null) &&
      (typeof high === "number" || high === null)
    ) {
      return <any>QuickSort.sort$int_A$int$int(A, low, high);
    } else if (
      ((A != null &&
        A instanceof <any>Array &&
        (A.length == 0 || A[0] == null || typeof A[0] === "number")) ||
        A === null) &&
      low === undefined &&
      high === undefined
    ) {
      return <any>QuickSort.sort$int_A(A);
    } else throw new Error("invalid overload");
  }
}

export { QuickSort };
