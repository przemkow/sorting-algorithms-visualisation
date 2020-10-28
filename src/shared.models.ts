export interface SortingAlgorithmDetails {
  name: string;
  sortingFn: (...args: any) => void;
}

export interface SortingStep {
  changedIndex: number;
  newValue: number;
}

export interface SortingSpyRecord {
  algorithmName?: string;
  initialState: number[];
  steps: SortingStep[];
}
