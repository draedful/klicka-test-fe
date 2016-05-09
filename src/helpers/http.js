import isObject from 'lodash/isObject';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function parseJSON(response) {
    return response.json()
}


export default function(url, data, config) {

    var params = {};
    if(data) {
        params.body = isObject(data) ? JSON.stringify(data) : data
    }
    if(config) {
        if(config.method != 'GET') {
            params.method = config.method
        }
    }
    return fetch(API_HOST + url, params)
        .then(checkStatus)
        .then(parseJSON)
        .catch(function(error) {
            console.log('request failed', error)
        })
}