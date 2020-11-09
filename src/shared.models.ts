export interface SortingAlgorithmDetails {
  name: string;
  sortingFn: (...args: any) => void;
}

export enum SortingStepName {
  SET_VALUE,
  SWAP_VALUES,
  SET_POINTER,
}

export interface SetValueStep {
  name: SortingStepName.SET_VALUE;
  index: number;
  value: number;
  pointerA?: number;
  pointerB?: number;
}

export interface SwapValuesStep {
  name: SortingStepName.SWAP_VALUES;
  indexA: number;
  indexB: number;
  pointerA?: number;
  pointerB?: number;
}

export interface TickStep {
  name: SortingStepName.SET_POINTER;
  pointerA?: number;
  pointerB?: number;
}

export type SortingStep = SetValueStep | SwapValuesStep | TickStep;

export interface SortingSpyRecord {
  algorithmName?: string;
  initialState: number[];
  steps: SortingStep[];
}
