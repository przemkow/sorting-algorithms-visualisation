import { State } from "./app-state.model";
import { createStore } from "./lib/simple-store";

const store = createStore<State>({
  initialState() {
    return {
      refreshRate: 1000,
      sortingAlgorithms: [],
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
  },
});

export { store };
