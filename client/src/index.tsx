import { createBrowserHistory } from "history";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { Router } from 'react-router-dom';
import App from './App/layout/App';
import './App/layout/styles.css';
import { store } from "./App/store/configureStore";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
export const history = createBrowserHistory();
//store.dispatch(fetchProductsAsync());
root.render(
    <Router history={history} >
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();