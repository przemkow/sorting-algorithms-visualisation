import { createRenderer } from "./visualiser/index";
import { bubbleSort } from "./sorting_algorithms/bubble_sort";
import {HeapSort} from "./sorting_algorithms/heap_sort";
import {MergeSort} from "./sorting_algorithms/merge_sort";

const array = Array.from({length: 100}, () => Math.floor(Math.random() * 1000))
const temp = [{
  changedIndex: null,
  newValue: null,
}]

const proxy = new Proxy(array, {
  set: function(target, prop, value) {
    target[prop] = value;
    temp.push(
      {
        list:[...target],
        changedIndex: prop,
        newValue: value
      });
    return true;

  }
});

const array2 = [...array];

const temp2 = [{
  changedIndex: null,
  newValue: null,
}]

const proxy2 = new Proxy(array2, {
  set: function(target, prop, value) {
    target[prop] = value;
    temp2.push(
      {
        list:[...target],
        changedIndex: prop,
        newValue: value
      });
    return true;

  }
});

const array3 = [...array];

const temp3 = [{
  changedIndex: null,
  newValue: null,
}]

const proxy3 = new Proxy(array3, {
  set: function(target, prop, value) {
    target[prop] = value;
    temp3.push(
      {
        list:[...target],
        changedIndex: prop,
        newValue: value
      });
    return true;

  }
});

const array4 = [...array];

const temp4 = [{
  changedIndex: null,
  newValue: null,
}]

const proxy4 = new Proxy(array4, {
  set: function(target, prop, value) {
    target[prop] = value;
    temp4.push(
      {
        list:[...target],
        changedIndex: prop,
        newValue: value
      });
    return true;

  }
});

const changesVisualiser = createRenderer(array, 'MergeSort')
MergeSort.sort(proxy)
const changesVisualiser2 = createRenderer(array2, 'HeapSort')
HeapSort.sort(proxy2)
const changesVisualiser3 = createRenderer(array3, 'bubbleSort')
bubbleSort(proxy3)
const changesVisualiser4 = createRenderer(array4, 'Array.prototype.sort')
proxy4.sort(function compareNumbers(a, b) {
  return a - b
});


function visualiseAlgorithm(temp) {
  temp.forEach((values, index) => {
    setTimeout(() => {
      changesVisualiser(values)
    }, 20 * index)
  })

  temp2.forEach((values, index) => {
    setTimeout(() => {
      changesVisualiser2(values)
    }, 20 * index)
  })

  temp3.forEach((values, index) => {
    setTimeout(() => {
      changesVisualiser3(values)
    }, 20 * index)
  })

  temp4.forEach((values, index) => {
    setTimeout(() => {
      changesVisualiser4(values)
    }, 20 * index)
  })
}

visualiseAlgorithm(temp)
