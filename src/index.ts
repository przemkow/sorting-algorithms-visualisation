import { bubbleSort } from "./sorting-algorithms/bubble_sort";
import { HeapSort } from "./sorting-algorithms/heap_sort";
import { MergeSort } from "./sorting-algorithms/merge_sort";
import { QuickSort } from "./sorting-algorithms/quick_sort";
import { SortingAlgorithmDetails } from "./shared.models";
import { getVisualiser } from "./visualiser/index";
import { createStore } from "./store/store";

function setRefreshRate(updateRate: number, options) {
  document.getElementById("update-rate-label")!.innerText = updateRate + "ms";

  options.mutations.setRefreshRate(updateRate);

  document.documentElement.style.setProperty(
    "--transition-time",
    options.state.refreshRate * 0.8 + "ms"
  );

  document.documentElement.style.setProperty(
    "--transition-time-b",
    options.state.refreshRate * 0.4 + "ms"
  );
}

function getInputArray() {
  const array = Array.from({ length: 30 }, () =>
    Math.floor(Math.random() * 1000)
  );
  return Object.freeze(array);
}

(function main() {
  const store = createStore();
  store.mutations.setRefreshRate(1000);

  const unsub = store.subscribe((newState) => {
    console.log(newState);
  });

  store.mutations.addAlgorithm({
    name: "Bubble Sort",
    sortingFn: bubbleSort,
  });
  store.mutations.setRefreshRate(3000);
  store.mutations.setRefreshRate(4000);

  // store.state.sortingAlgorithms = [];

  const options = {
    mutations: {
      setRefreshRate(refreshRate) {
        options.state.refreshRate = refreshRate;
      },
      addAlgorithm(sortingAlgDetails: SortingAlgorithmDetails) {
        options.state.sortingAlgorithms.push(sortingAlgDetails);
      },
    },
    state: {
      refreshRate: 1000,
      sortingAlgorithms: [],
    },
  };

  setRefreshRate(1000, options);

  document.getElementById("update-rate").addEventListener("input", (e: any) => {
    const updateRate = parseInt(e.target.value, 10);
    setRefreshRate(updateRate, options);
  });

  //Get array to sort
  const inputArray = getInputArray();

  //Get list of algorithms to compare
  // const sortingAlg = getSortingAlg();

  // Visualise sorting
  let visualiserCtrl = getVisualiser(
    inputArray,
    options.state.sortingAlgorithms,
    options.state
  );

  const btns = Array.from(
    document.querySelectorAll('[data-btnid="add-algorithm"]')
  );

  btns.forEach((btn) => {
    btn.addEventListener("click", (e: any) => {
      switch (e.target.getAttribute("data-value")) {
        case "bubble-sort": {
          options.mutations.addAlgorithm({
            name: "Bubble Sort",
            sortingFn: bubbleSort,
          });
          break;
        }
        case "heap-sort": {
          options.mutations.addAlgorithm({
            name: "HeapSort",
            sortingFn: HeapSort.sort,
          });
          break;
        }
        case "merge-sort": {
          options.mutations.addAlgorithm({
            name: "MergeSort",
            sortingFn: MergeSort.sort,
          });
          break;
        }
        case "quick-sort": {
          options.mutations.addAlgorithm({
            name: "QuickSort",
            sortingFn: QuickSort.sort,
          });
          break;
        }
      }
      visualiserCtrl = getVisualiser(
        inputArray,
        options.state.sortingAlgorithms,
        options.state
      );
    });
  });

  let isVisualisationRunning = false;
  document.getElementById("start").addEventListener("click", (e) => {
    if (!isVisualisationRunning) {
      visualiserCtrl.start();
    } else {
      visualiserCtrl.stop();
    }
    isVisualisationRunning = !isVisualisationRunning;
  });

  document.addEventListener("keypress", (e) => {
    if (e.code === "Space") {
      if (!isVisualisationRunning) {
        visualiserCtrl.start();
      } else {
        visualiserCtrl.stop();
      }
      isVisualisationRunning = !isVisualisationRunning;
    }
  });
})();
