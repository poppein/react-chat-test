import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import styles from './index.scss';

const rootElement = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
        <Component />
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