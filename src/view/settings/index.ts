import { store } from "../../store/app-state";
import { BubbleSort } from "../../sorting-algorithms/BubbleSort";
import { HeapSort } from "../../sorting-algorithms/HeapSort";
import { MergeSort } from "../../sorting-algorithms/MergeSort";
import { QuickSort } from "../../sorting-algorithms/QuickSort";
import { generateInputArray, getCustomArray } from "../../helprs/helpers";
import { InsertionSort } from "../../sorting-algorithms/InsertionSort";
import { SelectSort } from "../../sorting-algorithms/SelectSort";
import { ShellSort } from "../../sorting-algorithms/ShellSort";

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
          sortingFn: BubbleSort.sort,
        },
        "heap-sort": {
          name: "HeapSort",
          sortingFn: HeapSort.sort,
        },
        "select-sort": {
          name: "SelectSort Sort",
          sortingFn: SelectSort.sort,
        },
        "merge-sort": {
          name: "MergeSort",
          sortingFn: MergeSort.sort,
        },
        "quick-sort": {
          name: "QuickSort",
          sortingFn: QuickSort.sort,
        },
        "insertion-sort": {
          name: "InsertionSort",
          sortingFn: InsertionSort.sort,
        },
        "shell-sort": {
          name: "ShellSort",
          sortingFn: ShellSort.sort,
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
