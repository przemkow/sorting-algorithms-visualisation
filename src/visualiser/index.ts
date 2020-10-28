import { SortingAlgorithmDetails } from "../shared.models";
import { createChartRenderer } from "./renderer";
import { proxySpy } from "../sorting-spies/Proxy/proxy-spy";

function visualiser(
  inputArray: readonly number[],
  algorithms: SortingAlgorithmDetails[]
): void {
  const spyRecords = algorithms.map((algorithmDetails) =>
    proxySpy([...inputArray], algorithmDetails)
  );

  const chartRenderers = spyRecords.map((spyRecord) => ({
    chartRenderer: createChartRenderer(
      spyRecord.initialState,
      spyRecord.algorithmName
    ),
    iterator: spyRecord.steps[Symbol.iterator](),
  }));

  function render() {
    let allDone = true;
    for (const chartRenderer of chartRenderers) {
      const temp = chartRenderer.iterator.next();
      if (temp.done === false) {
        allDone = false;
        chartRenderer.chartRenderer(temp.value);
      }
    }
    if (allDone) {
      return;
    } else {
      setTimeout(() => {
        render();
      }, 20);
    }
  }

  render();
}

export { visualiser };
