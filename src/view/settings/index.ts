import { store } from "../../store/app-state";
import { bubbleSort } from "../../sorting-algorithms/bubble_sort";
import { HeapSort } from "../../sorting-algorithms/heap_sort";
import { MergeSort } from "../../sorting-algorithms/merge_sort";
import { QuickSort } from "../../sorting-algorithms/quick_sort";
import { generateInputArray, getCustomArray } from "../../helprs/helpers";

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
  store.subscribe({
    refreshRate(newState) {
      updateRefreshRate(newState.refreshRate);
    },
  });

  // Update Rate:
  document
    .getElementById("refresh-rate")
    .addEventListener("input", (e: any) => {
      const newRefreshRate = parseInt(e.target.value, 10);
      store.dispatch("setRefreshRate", newRefreshRate);
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

  // Array to sort:
  document
    .getElementById("array-values-confirm")
    .addEventListener("click", () => {
      const selectedOption = document.querySelector<HTMLInputElement>(
        'input[name="array-values"]:checked'
      ).value;
      const arrayLengthElValue = document.querySelector<HTMLInputElement>(
        "#array-length"
      ).value;

      const arrayLength = arrayLengthElValue
        ? parseInt(arrayLengthElValue, 10)
        : 10;

      let arrayToSort = [];
      switch (selectedOption) {
        case "array-random": {
          arrayToSort = generateInputArray(arrayLength);
          break;
        }
        case "array-descent": {
          arrayToSort = generateInputArray(arrayLength, "descend");
          break;
        }
        case "array-ascend": {
          arrayToSort = generateInputArray(arrayLength, "ascend");
          break;
        }
        case "array-custom": {
          arrayToSort = getCustomArray();
          break;
        }
      }

      store.dispatch("setArrayToSort", arrayToSort);
    });
}

export { attachSettingsHandlers };
