import { store } from "../../store/app-state";
import { bubbleSort } from "../../sorting-algorithms/bubble_sort";
import { HeapSort } from "../../sorting-algorithms/heap_sort";
import { MergeSort } from "../../sorting-algorithms/merge_sort";
import { QuickSort } from "../../sorting-algorithms/quick_sort";

function updateRefreshRate(refreshRate: number) {
  document.getElementById("refresh-rate-label")!.innerText = refreshRate + "ms";

  document.documentElement.style.setProperty(
    "--transition-time",
    refreshRate * 0.8 + "ms"
  );

  document.documentElement.style.setProperty(
    "--transition-time-b",
    refreshRate * 0.4 + "ms"
  );
}

function attachSettingsHandlers() {
  updateRefreshRate(store.state.refreshRate);
  // Update Rate:
  document
    .getElementById("refresh-rate")
    .addEventListener("input", (e: any) => {
      const newRefreshRate = parseInt(e.target.value, 10);
      store.dispatch("setRefreshRate", newRefreshRate);
      updateRefreshRate(newRefreshRate);
    });

  // Add algorithms:
  const buttons = Array.from(
    document.querySelectorAll('[data-btnid="add-algorithm"]')
  );
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e: any) => {
      const options = {
        "bubble-sort": {
          name: "Bubble Sort",
          sortingFn: bubbleSort,
        },
        "heap-sort": {
          name: "HeapSort",
          sortingFn: HeapSort.sort,
        },
        "merge-sort": {
          name: "MergeSort",
          sortingFn: MergeSort.sort,
        },
        "quick-sort": {
          name: "QuickSort",
          sortingFn: QuickSort.sort,
        },
      };
      const config = options[e.target.getAttribute("data-value")];
      if (config) {
        store.dispatch("addAlgorithm", config);
      }
    });
  });
}

export { attachSettingsHandlers };
