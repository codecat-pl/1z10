require('babel-register')();

const { JSDOM } = require('jsdom');

const exposedProperties = ['window', 'navigator', 'document'];

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');


Enzyme.configure({ adapter: new Adapter() });

global.dom = new JSDOM('<!DOCTYPE html><html><head></head><body><div id="main"></div></body></html>');
global.window = dom.window;
Object.keys(dom.window).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = dom.window[property];
    }
});


global.navigator = {
    userAgent: 'node.js'
};


documentRef = document;