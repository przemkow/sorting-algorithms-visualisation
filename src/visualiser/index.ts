import { SortingAlgorithmDetails } from "../shared.models";
import { ChartRenderer } from "./renderer/ChartRenderer";
// import { proxySpy } from "../sorting-spies/Proxy/proxy-spy";
import { manualSpy } from "../sorting-spies/Manual/manual-spy";

function visualiser(
  inputArray: readonly number[],
  algorithms: SortingAlgorithmDetails[]
): void {
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
    (spyRecord) =>
      new ChartRenderer(
        spyRecord.initialState,
        spyRecord.algorithmName,
        spyRecord.steps
      )
  );

  /**
   * visualiseChanges - function which iterates over all chartRenderers and updates rendered chart in period defined as
   * an argument.
   * @param updateInterval
   */
  function visualiseChanges(updateInterval: number) {
    let allDone = true;
    for (const chartRenderer of chartRenderers) {
      const temp = chartRenderer.visualiseNextStep();
      if (!temp.done) {
        allDone = false;
      }
    }
    if (allDone) {
      return;
    } else {
      setTimeout(() => {
        visualiseChanges(updateInterval);
      }, updateInterval);
    }
  }

  visualiseChanges(100);
}

export { visualiser };
