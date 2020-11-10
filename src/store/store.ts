import { SortingAlgorithmDetails, SortingStepName } from "../shared.models";

interface SimpleStore {
  mutations: Record<string, (...any) => void>;
  state: Record<string, any>;
  subscribe: (...any) => () => void;
}

function createStore(): SimpleStore {
  const observers: ((...args) => any)[] = [];

  const state = {
    refreshRate: 1000,
    sortingAlgorithms: [],
  };

  function notifyObservers() {
    for (const observer of observers) {
      observer(state);
    }
  }

  const validator = {
    get(target, key) {
      if (typeof target[key] === "object" && target[key] !== null) {
        return new Proxy(target[key], validator);
      } else {
        return target[key];
      }
    },
    set(target, key, value) {
      console.log(key);
      const result = Reflect.set(target, key, value);
      notifyObservers();
      return result;
    },
  };

  const stateProxy = new Proxy(state, validator);

  return {
    mutations: {
      setRefreshRate(refreshRate) {
        stateProxy.refreshRate = refreshRate;
      },
      addAlgorithm(sortingAlgDetails: SortingAlgorithmDetails) {
        stateProxy.sortingAlgorithms.push(sortingAlgDetails);
      },
    },
    state: stateProxy,
    subscribe(callback: () => any) {
      observers.push(callback);
      return function unsubscribe() {
        const index = observers.indexOf(callback);
        if (index > -1) {
          observers.splice(index, 1);
        }
      };
    },
  };
}

export { createStore };
