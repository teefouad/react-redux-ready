import { combineReducers } from 'redux';

/**
 * An object that is used as a map to store references to registered reducers.
 * This object is used by `getRootReducer` to create the root reducer.
 * @type {Object}
 */
export const registeredReducers = {
  _foo_: (foo = {}) => foo,
};

/**
 * Combines all registered reducers and returns a single reducer.
 * @type {Function}
 */
export const getRootReducer = () => combineReducers(registeredReducers);

/**
 * Registers a reducer function.
 * @param  {String}   key       Reducer key
 * @param  {Function} reducer   Reducer function
 * @return {Boolean}            Whether the reducer function was successfully registered or not.
 */
export const registerReducer = (key, reducer) => {
  if (key && reducer && !registeredReducers[key]) {
    registeredReducers[key] = reducer;
    return true;
  }

  return false;
};
