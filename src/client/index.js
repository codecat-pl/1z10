import "babel-core/register";
import "babel-polyfill";

import 'file-loader?name=[name].[ext]!./index.html';
import './style.scss';


import React from 'react';
import {render} from 'react-dom';
import initApp from './app';
import initStore from './store';
import * as actions from './actions/competitors';
import Sound from './sound';
import Connector from './services/remote';
import MessageBus from '../common/message_bus';
import CommandService from './services/commands';
import SoundService from './services/sounds';
import AutoSoundService from './services/auto_sounds';
import config from './config';
import IO from 'socket.io-client';

const transport = IO();
const mBus = new MessageBus();
const sounds = new Sound(config.sounds);
const store = initStore(config);
const App = initApp(store, mBus);

Connector(transport, mBus);
CommandService(mBus, store);
SoundService(mBus, sounds);
AutoSoundService(store, sounds);

window.store = store;
window.actions = actions;


render(<App/>, document.getElementById('competitors'));


