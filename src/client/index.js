import 'file-loader?name=[name].[ext]!./index.html';
import './style.scss';


import React from 'react';
import {render} from 'react-dom';
import initApp from './app';
import initStore from './store';
import * as actions from './actions/competitors';
import Sound from './sound';
import SoundService from './services/sounds';
import config from './config';

const store = initStore(config);
const App = initApp(store);

window.store = store;
window.actions = actions;

const sounds = new Sound(config.sounds);
SoundService(store, sounds);



render(<App/>, document.getElementById('competitors'));


