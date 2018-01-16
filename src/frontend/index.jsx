import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import styles from './index.scss';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import chatReducer from './reducers';
import * as parsers from './services/parsers';
import {loadMessages, loadNicknames} from './services/db';

const rootElement = document.getElementById('root');
const messages = loadMessages() || [];
const nicknames = loadNicknames() || {me: 'Anonymous', them: 'Anonymous'};
let store = createStore(chatReducer, {messages, nicknames}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component parsers={parsers}/>
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