import React from 'react';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import configureStore, {history} from './store/index';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'

export const { store, persistor } = configureStore();

const MainApp = () =>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ConnectedRouter store={store} history={history}>
                <Switch>
                    <Route path="/" component={App}/>
                </Switch>
            </ConnectedRouter>
        </PersistGate>
    </Provider>;


export default MainApp;