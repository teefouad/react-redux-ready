import { bindActionCreators } from 'redux';
import { connect as reduxConnect } from 'react-redux';
import { registeredReducers } from './reducer';

export * from './store';
export * from './reducer';

/**
 * Transforms a string to camelCase format.
 * @param {String}  str   String to be transformed
 * @type {Function}
 */
const camelCase = str => `${str.charAt(0).toLowerCase()}${str.slice(1)}`;

/**
 * @param {*} component
 * @param {*} config
 */
export const connect = (component, config = {}) => {
  // if no reducer is provided, use a simple reducer that returns the state as it is.
  const reducer = config.reducer || ((state = {}) => state);

  // default value for the actions object is an empty object (no actions).
  const actions = config.actions || {};

  // default value for the stateKey component display name or function name (component is stateless)
  const stateKey = (
    config.stateKey ||
    (component.displayName && camelCase(component.displayName)) ||
    (component.name && camelCase(component.name)) ||
    null
  );

  // default value for the actionsKey is stateKey (more convenient).
  const actionsKey = config.actionsKey || stateKey;

  // register reducer
  if (reducer && stateKey !== null) {
    registeredReducers[stateKey] = reducer;
  }

  // maps component state to component props
  const mapStateToProps = (stateKey === null ? null : state => ({
    [stateKey]: state[stateKey],
  }));

  // maps component actions to dispatchProps
  const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

  // combines component props, mapped props from state and mapped props from dispatchProps
  const combineProps = (stateProps, dispatchProps, ownProps) => {
    let actions = Object.assign({}, dispatchProps);

    if (actionsKey !== null) {
      actions = Object.assign({}, Object.assign({}, ownProps.actions), { [actionsKey]: dispatchProps });
    }

    return Object.assign({}, ownProps, stateProps, { actions });
  };

  // return the connected component
  return reduxConnect(mapStateToProps, mapDispatchToProps, combineProps)(component);
};

export default connect;
