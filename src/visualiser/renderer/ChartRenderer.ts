import {
  SetValueStep,
  SortingStep,
  SortingStepName,
  SwapValuesStep,
} from "../../shared.models";
import { getTranslateX } from "./utils";

class ChartRenderer {
  private readonly presenterNodes: HTMLElement[];
  private updatesIterator: IterableIterator<SortingStep>;

  constructor(
    private readonly initialState: number[],
    private readonly algName: string,
    private readonly sortingSteps: SortingStep[]
  ) {
    this.presenterNodes = this.bootstrapChart(this.initialState, this.algName);
    this.updatesIterator = this.sortingSteps[Symbol.iterator]();
  }

  public visualiseNextStep() {
    const nextStep = this.updatesIterator.next();
    if (!nextStep.done) {
      this.updateChart(nextStep.value);
    }
    return {
      done: nextStep.done,
    };
  }

  public resetIterator(): void {
    this.updatesIterator = this.sortingSteps[Symbol.iterator]();
  }

  private bootstrapChart(
    initialState: number[],
    algName: string
  ): HTMLElement[] {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    wrapper.appendChild(document.createTextNode(algName));
    const presenterNodes = [];
    initialState.forEach((value) => {
      const col = document.createElement("div");
      col.classList.add("col");
      col.style.height = `${value / 10}%`;
      // col.innerText = value;
      presenterNodes.push(col);
      wrapper.appendChild(col);
    });

    document.getElementById("visualiser").appendChild(wrapper);

    return presenterNodes;
  }

  private updateChart(sortingStep: SortingStep): void {
    switch (sortingStep.name) {
      case SortingStepName.SET_VALUE: {
        this.updaterSetValue(sortingStep);
        break;
      }
      case SortingStepName.SWAP_VALUES: {
        this.updaterSwapValues(sortingStep);
        break;
      }
    }
  }

  private updaterSwapValues(sortingStep: SwapValuesStep): void {
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
      sortingStep.value / 10
    }%`;
  }
}

export { ChartRenderer };
