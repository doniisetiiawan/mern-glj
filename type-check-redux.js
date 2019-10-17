const { createStore, applyMiddleware } = require('redux');

const TYPE = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  SET_TIME: 'SET_TIME',
};
const reducer = (state = null) => state;
const typeCheckMiddleware = () => (next) => (action) => {
  if (Reflect.has(TYPE, action.type)) {
    next(action);
  } else {
    throw new Error(
      `Type "${action.type}" is not a valid`
        + 'action type. '
        + 'did you mean to use one of the following'
        + 'valid types? '
        + `"${Reflect.ownKeys(TYPE).join('"|"')}"\n`,
    );
  }
};
const store = createStore(
  reducer,
  applyMiddleware(typeCheckMiddleware),
);
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'MISTAKE' });
