export interface SortingAlgorithmDetails {
  name: string;
  sortingFn: (...args: any) => void;
}

export enum SortingStepName {
  SET_VALUE,
  SWAP_VALUES,
}

export interface SetValueStep {
  name: SortingStepName.SET_VALUE;
  index: number;
  value: number;
}

export interface SwapValuesStep {
  name: SortingStepName.SWAP_VALUES;
  indexA: number;
  indexB: number;
}

export type SortingStep = SetValueStep | SwapValuesStep;

export interface SortingSpyRecord {
  algorithmName?: string;
  initialState: number[];
  steps: SortingStep[];
}
