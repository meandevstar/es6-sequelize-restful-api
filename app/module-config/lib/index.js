import config from './config';

const get = function (key) {
    if(!key) return new Error('Please provide a valid key');
    return config[key];
};

export { get };