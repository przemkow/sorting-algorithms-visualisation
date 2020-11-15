import {
  CreateSimpleStoreArgs,
  ObserverConfig,
  SimpleStoreInstance,
} from "./simple-store.model";

function createStore<S>({
  initialState,
  reducers,
}: CreateSimpleStoreArgs<S>): SimpleStoreInstance<S> {
  const observers: ObserverConfig<S>[] = [];

  const state = initialState();

  function getProp(pathToProp, obj) {
    return pathToProp.reduce((prev, curr) => prev && prev[curr], obj);
  }

  function notifyObservers(oldState, newState) {
    for (const observer of observers) {
      if (typeof observer === "function") {
        observer(newState);
      } else if (typeof observer === "object") {
        Object.entries(observer).forEach(([pathToProp, callback]) => {
          const oldProp = getProp(pathToProp.split("."), oldState);
          const newProp = getProp(pathToProp.split("."), newState);
          if (oldProp !== newProp) {
            callback(newState);
          }
        });
      }
    }
  }

  return {
    dispatch(reducerName: string, ...args) {
      const reducer = reducers[reducerName];
      if (typeof reducer === "function") {
        const oldState = this.state;
        const newState = reducer(oldState, ...args);
        this.state = newState;
        notifyObservers(oldState, newState);
      }
    },
    state: state,
    subscribe(callbacks) {
      observers.push(callbacks);
      return function unsubscribe() {
        const index = observers.indexOf(callbacks);
        if (index > -1) {
          observers.splice(index, 1);
        }
      };
    },
  };
}

export { createStore };
