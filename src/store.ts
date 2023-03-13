import { createStore, Action } from 'redux';

interface CountAction extends Action {
  type: string;
}

interface CountState {
  count: number;
}

const initialState: CountState = {
  count: 0,
};

function reducer(state: CountState = initialState, action: CountAction) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
