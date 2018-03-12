import React from 'react';
import ConnectedHall from './elements/hall';

import { Provider } from 'react-redux'

export default (store, mBus) => props => {
    return (
        <Provider store={store}>
            <ConnectedHall/>
        </Provider>
    );
}

