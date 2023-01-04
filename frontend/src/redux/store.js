import rootReducer from './reducers/rootReducer';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//     key: 'main-root',
//     storage,
// };

// const presistedReducer = persistReducer(persistConfig, rootReducer);

// includes: reducers, middleware..
// const store = createStore(presistedReducer, composeWithDevTools(applyMiddleware(thunk)));
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// const Persistor = persistStore(store);

// export { Persistor };

export default store;
