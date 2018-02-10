import React from 'react';
import ConnectedHall from './elements/hall';

import { Provider } from 'react-redux'

export default store => props => {
    return (
        <Provider store={store}>
            <ConnectedHall/>
        </Provider>
    );
}

