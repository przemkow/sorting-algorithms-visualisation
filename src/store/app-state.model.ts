import { SortingAlgorithmDetails } from "../shared.models";

interface State {
  refreshRate: number;
  sortingAlgorithms: SortingAlgorithmDetails[];
  arrayToSort: Readonly<number[]>;
}

export { State };
