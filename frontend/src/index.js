import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import GlobalStyles from './components/GlobalStyles';
import { Provider } from 'react-redux';
import store, { Persistor } from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </Provider>,
    // </React.StrictMode>
);
reportWebVitals();
