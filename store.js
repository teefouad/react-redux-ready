import { createStore, compose, applyMiddleware } from 'redux';
import { getRootReducer } from './reducer';

// enable Redux devTools
const enhancers = compose(window.devToolsExtension ? window.devToolsExtension() : foo => foo);

// list of middlewares
const middleWares = [enhancers];

// create the store
export const store = createStore(
  getRootReducer(),
  compose.apply(null, middleWares),
);

// update root reducer
export const updateRootReducer = () => {
  store.replaceReducer(
    getRootReducer(),
    compose.apply(null, middleWares),
  );
};

export const useMiddleware = middleWare => {
  middleWares.push(applyMiddleware(middleWare));
  updateRootReducer();
};

export default store;
