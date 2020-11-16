import { chartMaxValue } from "./consts";

type ArrayGeneratorType = "random" | "ascend" | "descend";

function generateInputArray(length = 10, type?: ArrayGeneratorType) {
  return Array.from({ length }, (_, index) => {
    let returnValue;
    if (type === "ascend") {
      returnValue = index * (chartMaxValue / length);
    } else if (type === "descend") {
      returnValue = (length - 1 - index) * (chartMaxValue / length);
    } else {
      returnValue = Math.random() * chartMaxValue;
    }
    return Math.floor(returnValue);
  });
}

function getCustomArray() {
  const userInput = window.prompt(
    "Insert coma separated number from the range 1-1000 ex: 1,100, 200 "
  );

  try {
    const customArray = JSON.parse("[" + userInput + "]");
    customArray.forEach((value) => {
      if (typeof value !== "number" || value < 0 || value > 1000) {
        throw Error(`Incorrect value: ${value}`);
      }
    });
    return customArray;
  } catch (e) {
    alert(e);
    return [];
  }
}
export { generateInputArray, getCustomArray };
