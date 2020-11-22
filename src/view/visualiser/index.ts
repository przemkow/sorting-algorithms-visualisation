import { ChartRenderer } from "./renderer/ChartRenderer";
import { manualSpy } from "../../sorting-spies/Manual/manual-spy";
import { proxySpy } from "../../sorting-spies/Proxy/proxy-spy";

import { store } from "../../store/app-state";
import { SortingAlgorithmDetails } from "../../shared.models";

function getVisualiser(
  inputArray: readonly number[],
  algorithms: SortingAlgorithmDetails[]
) {
  let refreshRate = store.state.refreshRate;
  store.subscribe({
    refreshRate(state) {
      refreshRate = state.refreshRate;
    },
  });

  /*
   * Reset content of visualiser div
   */
  document.getElementById("visualiser").innerHTML = "";

  /*
   * Generate an array os spy-records for every compared algorithm
   */
  const spyRecords = algorithms.map((algorithmDetails) =>
    manualSpy([...inputArray], algorithmDetails)
  );

  /*
   * Create list of chartRenderer objects
   */
  const chartRenderers = spyRecords.map(
    (spyRecord, index) =>
      new ChartRenderer(
        spyRecord.initialState,
        spyRecord.algorithmName,
        spyRecord.steps,
        index
      )
  );

  let timeoutId = 0;
  /**
   * visualiseChanges - function which iterates over all chartRenderers and updates rendered chart in period defined as
   * an argument.
   */
  function visualiseChanges() {
    let allDone = true;
    for (const chartRenderer of chartRenderers) {
      const temp = chartRenderer.visualiseNextStep();
      if (!temp.done) {
        allDone = false;
      }
    }
    if (allDone) {
      clearTimeout(timeoutId);
      return;
    } else {
      timeoutId = setTimeout(() => {
        visualiseChanges();
      }, refreshRate);
    }
  }

  return {
    start() {
      visualiseChanges();
    },
    stop() {
      clearTimeout(timeoutId);
    },
  };
}

export { getVisualiser };
