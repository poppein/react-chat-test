import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import styles from './index.scss';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import chatReducer from './reducers';

const rootElement = document.getElementById('root');
let store = createStore(chatReducer, undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    rootElement
  );
};

render(Root);

if (module.hot) {
 module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default; // eslint-disable-line global-require
    render(NextRoot);
  }
 );
}