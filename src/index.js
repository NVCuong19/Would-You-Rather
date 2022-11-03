import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import applyMiddleware from './middleware/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import {handleInitialData} from './actions/shared';

sessionStorage.removeItem('userInfo')
sessionStorage.removeItem('id')
const store = createStore(rootReducer, applyMiddleware);
store.dispatch(handleInitialData())
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

