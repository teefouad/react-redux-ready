# React Redux Ready

React-Redux-Ready provides a simpler way to use Redux in React powered apps.

### Installation

```
npm install --save react-redux-ready
```

------

### How to Use 

#### Application entry file

You need to do two things here:

1. Import the _store_ from 'react-redux-ready' then pass it to the _Provider_ component
2. Call _updateRootReducer_ right before calling the _render_ method

```javascript
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store, updateRootReducer } from './react-redux-ready';
import Main from './Main';

const App = (
  <Provider store={store}>
    <Main />
  </Provider>
);

// you must call updateRootReducer before rendering your app
updateRootReducer();

// render your app
render(App, document.getElementById('app'));
```

#### Component file

Here is what you need to do in a component file:

1. Import the _connect_ function from 'react-redux-ready'
2. Import the reducer and all action creators related to this component
3. Pass them all to the _connect_ function and export the returned component

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from './react-redux-ready';
import reducer from './component-reducer';
import * as actions from './component-actions';

const MainPage = props => (
  <div>
    <button onClick={() => console.log(props.myStateKey)}>
      I will console.log the props object when I am clicked
    </button>
    
    <button onClick={() => console.log(props.actions.myActionsKey)}>
      I will console.log the actions object when I am clicked
    </button>
  </div>
);

MainPage.propTypes = {
  myStateKey: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default connect(MainPage, { reducer, actions, stateKey: 'myStateKey', actionsKey: 'myActionsKey' });
```

Component state can then be accessed via `this.props.myStateKey` and component actions can be accessed via `this.props.actions.myActionsKey`, this is to avoid naming conflicts between different state keys, actions and component defined properties. 

#### Object destructuring

You can use object destructuring to extract state and actions and avoid writing long lines of code.

For a component with the following configuration:

```javascript
export default connect(SignupPage, { reducer, actions, stateKey: 'signup', actionsKey: 'signup' });
```

You would do the following:

```javascript
render() {
  const { username, email } = this.props.signup;
  const { login, resetPassword } = this.props.actions.signup;
    
  return (
    <div>
      <h1>
      	Your username: {username}
        Your e-mail: {email}
      </h1>
      
      <button onClick={login}>
        Login
      </button>

      <button onClick={resetPassword}>
        Forgot your password?
      </button>
    </div>
  );
}
```

------

### The _connect_ method parameters

**_component_** (required)

React component reference

**_configObject_** (optional)

Configuration object that contains the following keys:

* _reducer_:         Reference to the component reducer.
* _actions_:         Reference to the actions object.
* _stateKey_:        Namespace that will be used to pass component state as props.
* _actionsKey_:      Namespace that will be used to pass component actions as props.

------

### Middlewares

To use a middleware, import _useMiddleware_ method and pass it the middleware, here is an example using React Router (v3.0.5):

```javascript
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store, updateRootReducer, registerReducer, useMiddleware } from 'react-redux-ready';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import Main from './Main';

// register router reducer
registerReducer('routing', routerReducer);

// create the routing middleware
useMiddleware(routerMiddleware(browserHistory));

// create history
const history = syncHistoryWithStore(browserHistory, store);

const MainApp = (
  <Provider store={store}>
    <Router history={history} key={Math.random()}>
      <Route path="/" component={Main}>
        ...
      </Route>
    </Router>
  </Provider>
);

updateRootReducer();

// render everything
render(MainApp, document.getElementById('app'));
```