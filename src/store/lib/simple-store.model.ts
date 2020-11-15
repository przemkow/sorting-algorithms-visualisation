type ObserverConfig<S> =
  | Record<string, (state: S) => void>
  | ((state: S) => void);

interface CreateSimpleStoreArgs<T> {
  initialState: () => T;
  reducers: Record<string | number | symbol, (T, ...args) => T>;
}

interface SimpleStoreInstance<S> {
  dispatch: <T>(stateName: string, ...arg: T[]) => void;
  state: S;
  subscribe: (config: ObserverConfig<S>) => void;
}

export { ObserverConfig, CreateSimpleStoreArgs, SimpleStoreInstance };
