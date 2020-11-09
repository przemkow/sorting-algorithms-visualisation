/* eslint-disable @typescript-eslint/no-empty-function */
import {
  SortingAlgorithmDetails,
  SortingSpyRecord,
  SortingStepName,
} from "../../shared.models";
import { SpyOptions } from "../spy.models";

/**
 * Proxy Spy is able to detect only array mutations.
 * SortingSpyRecord provided by ProxySpy can give general overview on how algorithm works however for algorithms which
 * are using additional data structures provided SortingSpyRecord won't be 100% correct.
 *
 * Advantage of Proxy based spy is it's simplicity as it does not require any modification of sorting algorithm code.
 *
 * @param array
 * @param sortingAlgDetails
 */
function proxySpy(
  array: number[],
  sortingAlgDetails: SortingAlgorithmDetails
): SortingSpyRecord {
  const spyRecord: SortingSpyRecord = {
    algorithmName: sortingAlgDetails.name,
    initialState: [...array],
    steps: [],
  };

  const arrayProxy = new Proxy(array, {
    set(target, prop, value) {
      if (typeof prop === "symbol") {
        target[prop] = value;
        return true;
      }

      const changedIndex = typeof prop === "string" ? parseInt(prop, 10) : prop;
      target[prop] = value;
      spyRecord.steps.push({
        name: SortingStepName.SET_VALUE,
        index: changedIndex,
        value: value,
      });

      return true;
    },
  });

  const fakeSpyOptions: SpyOptions = {
    setValue() {},
    swapValues() {},
    setPointer() {},
  };

  sortingAlgDetails.sortingFn(arrayProxy, fakeSpyOptions);
  return spyRecord;
}

export { proxySpy };
