import {
  SetValueStep,
  SortingStep,
  SortingStepName,
  SwapValuesStep,
} from "../../../shared.models";
import { getTranslateX } from "./utils";
import { chartMaxValue } from "../../../helprs/consts";
import { store } from "../../../store/app-state";

class ChartRenderer {
  private presenterNodes: HTMLElement[];
  private updatesIterator: IterableIterator<SortingStep>;
  private pointerA: HTMLElement;
  private pointerB: HTMLElement;
  private chartWrapper: HTMLElement;

  constructor(
    private readonly initialState: number[],
    private readonly algName: string,
    private readonly sortingSteps: SortingStep[],
    private readonly index: number
  ) {
    this.bootstrapChart(this.initialState, this.algName);
    this.updatesIterator = this.sortingSteps[Symbol.iterator]();
  }

  public visualiseNextStep() {
    const nextStep = this.updatesIterator.next();
    if (!nextStep.done) {
      this.updateChart(nextStep.value);
    } else {
      this.chartWrapper.classList.add("done");
    }
    return {
      done: nextStep.done,
    };
  }

  public resetIterator(): void {
    this.updatesIterator = this.sortingSteps[Symbol.iterator]();
  }

  private bootstrapChart(initialState: number[], algName: string): void {
    const chartWrapper = document.createElement("div");
    chartWrapper.classList.add("chart-wrapper");
    const chart = document.createElement("div");
    chart.classList.add("chart");
    chartWrapper.appendChild(chart);

    const title = document.createElement("div");
    title.addEventListener(
      "click",
      () => {
        store.dispatch("removeAlgorithm", this.index);
      },
      { once: true }
    );
    title.classList.add("chart-title");
    title.appendChild(document.createTextNode(algName));
    chartWrapper.appendChild(title);
    this.chartWrapper = chartWrapper;

    const pointerA = document.createElement("div");
    pointerA.classList.add("pointer");
    pointerA.classList.add("pointerA");
    pointerA.style.width = `calc(100% / ${initialState.length})`;
    pointerA.style.visibility = "hidden";
    chart.appendChild(pointerA);

    const pointerB = document.createElement("div");
    pointerB.classList.add("pointer");
    pointerB.classList.add("pointerB");
    pointerB.style.width = `calc(100% / ${initialState.length})`;
    pointerB.style.visibility = "hidden";
    chart.appendChild(pointerB);

    const presenterNodes = [];
    initialState.forEach((value) => {
      const col = document.createElement("div");
      col.classList.add("col");
      col.style.height = `${(value * 100) / chartMaxValue}%`;
      // col.innerText = value;
      presenterNodes.push(col);
      chart.appendChild(col);
    });

    document.getElementById("visualiser").appendChild(chartWrapper);

    this.pointerA = pointerA;
    this.pointerB = pointerB;

    this.presenterNodes = presenterNodes;
  }

  private updateChart(sortingStep: SortingStep): void {
    switch (sortingStep.name) {
      case SortingStepName.SET_VALUE: {
        this.updaterSetPointer(sortingStep);
        this.updaterSetValue(sortingStep);
        break;
      }
      case SortingStepName.SWAP_VALUES: {
        this.updaterSetPointer(sortingStep);
        this.updaterSwapValues(sortingStep);
        break;
      }
      case SortingStepName.SET_POINTER: {
        this.updaterSetPointer(sortingStep);
        break;
      }
    }
  }

  private updaterSwapValues(sortingStep: SwapValuesStep): void {
    this.updaterSetPointer(sortingStep);

    const translateA =
      getTranslateX(this.presenterNodes[sortingStep.indexA]) +
      (sortingStep.indexB - sortingStep.indexA) * 100;
    const translateB =
      getTranslateX(this.presenterNodes[sortingStep.indexB]) +
      (sortingStep.indexA - sortingStep.indexB) * 100;

    this.presenterNodes[
      sortingStep.indexA
    ].style.transform = `translate(${translateA}%)`;
    this.presenterNodes[
      sortingStep.indexB
    ].style.transform = `translate(${translateB}%)`;

    const temp = this.presenterNodes[sortingStep.indexA];
    this.presenterNodes[sortingStep.indexA] = this.presenterNodes[
      sortingStep.indexB
    ];
    this.presenterNodes[sortingStep.indexB] = temp;
  }

  private updaterSetValue(sortingStep: SetValueStep): void {
    this.presenterNodes[sortingStep.index].style.height = `${
      (sortingStep.value * 100) / chartMaxValue
    }%`;
  }

  private updaterSetPointer(sortingStep: SortingStep): void {
    if (sortingStep.pointerA != null) {
      this.pointerA.style.visibility = "visible";
      this.pointerA.style.transform = `translateX(${
        100 * sortingStep.pointerA
      }%)`;
    }

    if (sortingStep.pointerB != null) {
      this.pointerB.style.visibility = "visible";
      this.pointerB.style.transform = `translateX(${
        100 * sortingStep.pointerB
      }%)`;
    }
  }
}

export { ChartRenderer };
