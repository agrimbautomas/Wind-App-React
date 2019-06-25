/* eslint-disable */

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {middleware as reduxPackMiddleware} from 'redux-pack';
import {createBrowserHistory} from 'history';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable'

import loggerMiddleware from './middlewares/logger';
import createEntitesMapReducersTransform from './transforms/createEntitesMapReducersTransform';


import Api from '../services/Api';
import ApiAuthTokenUpdater from '../services/ApiAuthTokenUpdater';
import rootReducer from '../reducers/index';

import Project from '../entities/project';
import User from '../entities/user';

const api = new Api();

export const history = createBrowserHistory();

const middlewares = [
    routerMiddleware(history),
    thunk.withExtraArgument(api),
    reduxPackMiddleware
];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
}

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        createEntitesMapReducersTransform({
            //projects: Project,
            //users: User
        }),
        immutableTransform({
            whitelist: ['projectsViewOptions']
        })
    ],
    // whitelist: ['projects', 'users', 'currentUser']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    connectRouter(history)(persistedReducer),
    applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);
export const authTokenUpdater = new ApiAuthTokenUpdater(store, api).start();
