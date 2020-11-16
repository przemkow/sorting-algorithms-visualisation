import { State } from "./app-state.model";
import { createStore } from "./lib/simple-store";

const store = createStore<State>({
  initialState() {
    return {
      refreshRate: 1000,
      sortingAlgorithms: [],
      arrayToSort: Object.freeze([]),
    };
  },
  reducers: {
    setRefreshRate(state, refreshRate) {
      return {
        ...state,
        refreshRate: refreshRate,
      };
    },
    addAlgorithm(state, sortingAlgDetails) {
      return {
        ...state,
        sortingAlgorithms: [...state.sortingAlgorithms, sortingAlgDetails],
      };
    },
    removeAlgorithm(state, index) {
      const sortingAlgorithms = [...state.sortingAlgorithms];
      sortingAlgorithms.splice(index, 1);
      return {
        ...state,
        sortingAlgorithms,
      };
    },
    setArrayToSort(state, arrayToSort) {
      return {
        ...state,
        arrayToSort: Object.freeze(arrayToSort),
      };
    },
  },
});

export { store };
