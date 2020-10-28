import { SortingStep } from "../shared.models";

function createChartRenderer(array: number[], algName: string) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  wrapper.appendChild(document.createTextNode(algName));
  const presenterNodes = [];
  array.forEach((value) => {
    const col = document.createElement("div");
    col.classList.add("col");
    col.style.height = `${value / 10}%`;
    // col.innerText = value;
    presenterNodes.push(col);
    wrapper.appendChild(col);
  });

  document.getElementById("visualiser").appendChild(wrapper);

  let temp = null;
  return function updateChart(sortingStep: SortingStep) {
    if (temp) {
      temp.style.backgroundColor = "";
    }
    presenterNodes[sortingStep.changedIndex].style.height = `${
      sortingStep.newValue / 10
    }%`;
    presenterNodes[sortingStep.changedIndex].style.backgroundColor = "green";
    temp = presenterNodes[sortingStep.changedIndex];
  };
}

export { createChartRenderer };
