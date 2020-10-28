/* Generated from Java with JSweet 2.2.0-SNAPSHOT - http://www.jsweet.org */
class MergeSort {
  public static sort$int_A(A: number[]) {
    MergeSort.sort$int_A$int$int(A, 0, A.length - 1);
  }

  public static sort$int_A$int$int(A: number[], low: number, high: number) {
    if (high - low > 0) {
      const middle: number = ((high + low) / 2) | 0;
      MergeSort.sort$int_A$int$int(A, low, middle);
      MergeSort.sort$int_A$int$int(A, middle + 1, high);
      MergeSort.merge(A, low, middle, high);
    }
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
      return <any>MergeSort.sort$int_A$int$int(A, low, high);
    } else if (
      ((A != null &&
        A instanceof <any>Array &&
        (A.length == 0 || A[0] == null || typeof A[0] === "number")) ||
        A === null) &&
      low === undefined &&
      high === undefined
    ) {
      return <any>MergeSort.sort$int_A(A);
    } else throw new Error("invalid overload");
  }

  /*private*/ static merge(
    A: number[],
    low: number,
    mid: number,
    high: number
  ) {
    const sizeL: number = mid - low + 1;
    const sizeR: number = high - mid;
    const L: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(sizeL);
    const R: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(sizeR);
    for (let i = 0; i < sizeL; i++) {
      {
        L[i] = A[i + low];
      }
    }
    for (let i = 0; i < sizeR; i++) {
      {
        R[i] = A[i + mid + 1];
      }
    }
    let pointerL = 0;
    let pointerR = 0;
    for (let i: number = low; i <= high; i++) {
      {
        if (pointerL >= sizeL) {
          A[i] = R[pointerR];
          pointerR++;
        } else if (pointerR >= sizeR) {
          A[i] = L[pointerL];
          pointerL++;
        } else if (L[pointerL] < R[pointerR]) {
          A[i] = L[pointerL];
          pointerL++;
        } else {
          A[i] = R[pointerR];
          pointerR++;
        }
      }
    }
  }
}

export { MergeSort };
