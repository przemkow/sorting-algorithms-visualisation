import { bubbleSort } from "./sorting-algorithms/bubble_sort";
import { store } from "./store/app-state";
import { QuickSort } from "./sorting-algorithms/quick_sort";
import { attachSettingsHandlers } from "./view/settings/index";
import { getVisualiser } from "./view/visualiser/index";
import { generateInputArray } from "./helprs/helpers";

function dispatchInitialValues() {
  store.dispatch("setRefreshRate", 1000);
  store.dispatch("addAlgorithm", {
    name: "Bubble Sort",
    sortingFn: bubbleSort,
  });
  store.dispatch("addAlgorithm", {
    name: "Quick Sort",
    sortingFn: QuickSort.sort,
  });
  store.dispatch("setArrayToSort", generateInputArray(50, "random"));
}

(function main() {
  let visualiserCtrl;
  let isVisualisationRunning = false;
  function resetVisualiser(state) {
    visualiserCtrl = getVisualiser(state.arrayToSort, state.sortingAlgorithms);
    isVisualisationRunning = false;
  }

  store.subscribe({
    sortingAlgorithms(newState) {
      resetVisualiser(newState);
    },
    arrayToSort(newState) {
      resetVisualiser(newState);
    },
  });

  attachSettingsHandlers();
  dispatchInitialValues();

  document.getElementById("start").addEventListener("click", (e) => {
    if (!isVisualisationRunning) {
      visualiserCtrl.start();
    } else {
      visualiserCtrl.stop();
    }
    isVisualisationRunning = !isVisualisationRunning;
  });
})();
