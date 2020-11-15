import { store } from "./store/app-state";
import { attachSettingsHandlers } from "./view/settings/index";
import { getVisualiser } from "./view/visualiser/index";

function getInputArray() {
  const array = Array.from({ length: 30 }, () =>
    Math.floor(Math.random() * 1000)
  );
  return Object.freeze(array);
}

(function main() {
  //Get array to sort
  const inputArray = getInputArray();
  attachSettingsHandlers();

  let visualiserCtrl;
  let isVisualisationRunning = false;

  store.subscribe({
    sortingAlgorithms(newState) {
      visualiserCtrl = getVisualiser(inputArray, newState.sortingAlgorithms);
      isVisualisationRunning = false;
    },
  });

  document.getElementById("start").addEventListener("click", (e) => {
    if (!isVisualisationRunning) {
      visualiserCtrl.start();
    } else {
      visualiserCtrl.stop();
    }
    isVisualisationRunning = !isVisualisationRunning;
  });
})();
