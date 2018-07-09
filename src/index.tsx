import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import RootRouter from './RootRouter';

ReactDOM.render(
  <BrowserRouter><RootRouter/></BrowserRouter>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();

