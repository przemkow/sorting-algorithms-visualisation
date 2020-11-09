import {
  SortingAlgorithmDetails,
  SortingSpyRecord,
  SortingStepName,
} from "../../shared.models";
import { SpyOptions } from "../spy.models";

function manualSpy(
  array: number[],
  sortingAlgDetails: SortingAlgorithmDetails
): SortingSpyRecord {
  const spyRecord: SortingSpyRecord = {
    algorithmName: sortingAlgDetails.name,
    initialState: [...array],
    steps: [],
  };

  const options: SpyOptions = {
    setValue(changedIndex, value, pointerA, pointerB) {
      spyRecord.steps.push({
        name: SortingStepName.SET_VALUE,
        index: changedIndex,
        value: value,
        pointerA,
        pointerB,
      });
    },
    swapValues(indexA, indexB, pointerA, pointerB) {
      spyRecord.steps.push({
        name: SortingStepName.SWAP_VALUES,
        indexA,
        indexB,
        pointerA,
        pointerB,
      });
    },
    setPointer(pointerA, pointerB) {
      spyRecord.steps.push({
        name: SortingStepName.SET_POINTER,
        pointerA,
        pointerB,
      });
    },
  };

  sortingAlgDetails.sortingFn([...array], options);
  return spyRecord;
}

export { manualSpy };
