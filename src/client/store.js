import { createStore } from 'redux'
import reducer from './reducers';
import createState from './services/state_creator';


export default config => createStore(reducer, createState(config), connectWithDevTools());

function connectWithDevTools(){
    return window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}
