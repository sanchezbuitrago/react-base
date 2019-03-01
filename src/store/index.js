//Redux
import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'react-router-redux';

//Redux-persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//Sagas
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';

//Reducers
import reducers from '..//reducers/index';
import createHistory from 'history/createHashHistory';

const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routeMiddleware];

const persistConfig = { key: 'root', storage }
const persistedReducer = persistReducer(persistConfig, reducers)

export default function configureStore(initialState) {
    const store = createStore(persistedReducer, initialState,
        compose(applyMiddleware(...middlewares)));
    
    let persistor = persistStore(store);
    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return { store, persistor };
}
export {history};