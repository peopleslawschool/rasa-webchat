const init = (items) => {
  const currentState = {
    items
  };

  const reducer = (state = currentState) =>
    state;

  return reducer;
};

export default init;
