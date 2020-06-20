export function updateStore(state: any, payload: any) {
  return {
    ...state,
    store: {
      ...state.store,
      ...payload,
    },
  };
};
