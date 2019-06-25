import React from 'react'
import ReactDOM from 'react-dom';
import './index.scss';

import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {PersistGate} from 'redux-persist/integration/react';

import OrdersList from './components/ordersList/OrdersList';
import App from './App';
import {store, history, persistor} from './store/store';
//
// class MainGrid extends React.Component {
//     render() {
//         return (
//             <div className="grid">
//                 <OrdersList/>
//             </div>
//         )
//     }
// }

//
// ReactDOM.render(
//     <MainGrid/>,
//     document.getElementById('root')
// )

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
    , document.getElementById('root')
)

