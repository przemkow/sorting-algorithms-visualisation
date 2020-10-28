import { bubbleSort } from "./sorting-algorithms/bubble_sort";
import { HeapSort } from "./sorting-algorithms/heap_sort";
import { MergeSort } from "./sorting-algorithms/merge_sort";
import { QuickSort } from "./sorting-algorithms/quick_sort";
import { SortingAlgorithmDetails } from "./shared.models";
import { visualiser } from "./visualiser/index";

function getInputArray() {
  const array = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * 1000)
  );
  return Object.freeze(array);
}

function getSortingAlg(): SortingAlgorithmDetails[] {
  return [
    {
      name: "Bubble Sort",
      sortingFn: bubbleSort,
    },
    {
      name: "HeapSort",
      sortingFn: HeapSort.sort,
    },
    {
      name: "MergeSort",
      sortingFn: MergeSort.sort,
    },
    {
      name: "QuickSort",
      sortingFn: QuickSort.sort,
    },
  ];
}

(function main() {
  //Get array to sort
  const inputArray = getInputArray();

  //Get list of algorithms to compare
  const sortingAlg = getSortingAlg();

  // Visualise sorting
  visualiser(inputArray, sortingAlg);
})();
